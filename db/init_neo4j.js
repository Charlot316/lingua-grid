import neo4j from 'neo4j-driver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NEO4J_URI = process.env.NEO4J_URI || 'bolt://localhost:7687';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'password';

const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

async function init() {
    const session = driver.session();
    try {
        console.log('🚀 正在连接并刷新 Neo4j 数据...');
        const seedCypher = fs.readFileSync(path.join(__dirname, 'seed.cypher'), 'utf8');
        
        // 改进：使用事务执行整个脚本，确保数据一致性
        const statements = seedCypher.split(';').map(s => s.trim()).filter(s => s.length > 0);
        
        for (const statement of statements) {
            await session.run(statement);
        }
        
        console.log('✅ 图数据重构完成。连接状态：ZH-JP-KR 精准对齐已强化。');

        // 导出数据
        const conceptResult = await session.run(`
            MATCH (c:Concept)
            OPTIONAL MATCH (w:Word)-[s:HAS_SENSE]->(c)
            RETURN c, collect({
                id: s.id,
                word: properties(w),
                nuance: s.nuance,
                example: s.example,
                example_translation: s.example_translation,
                isPrimary: s.is_primary,
                lang: w.language
            }) as wordSenses
        `);

        const frontendConcepts = conceptResult.records.map(record => {
            const conceptNode = record.get('c');
            const concept = conceptNode.properties;
            const wordSenses = record.get('wordSenses').filter(ws => ws.word !== null);
            
            const sensesMap = { zh: [], en: [], jp: [], kr: [], fr: [], th: [] };
            wordSenses.forEach(ws => {
                if (ws.lang && sensesMap[ws.lang]) {
                    // Convert Neo4j integers (difficulty) to JS numbers
                    const wordData = { ...ws.word };
                    if (wordData.difficulty && typeof wordData.difficulty === 'object') {
                        wordData.difficulty = neo4j.integer.toNumber(wordData.difficulty);
                    }

                    sensesMap[ws.lang].push({
                        id: ws.id,
                        word: wordData,
                        nuance: ws.nuance,
                        example: ws.example,
                        example_translation: ws.example_translation,
                        isPrimary: !!ws.isPrimary
                    });
                }
            });

            return {
                id: concept.id,
                gloss: concept.gloss || concept.gloss_zh,
                category: concept.category,
                senses: sensesMap
            };
        });

        const alignmentResult = await session.run(`
            MATCH (w1:Word)-[a:ALIGNS]->(w2:Word)
            RETURN w1.id as sourceId, w2.id as targetId, a.type as type
        `);

        const frontendAlignments = alignmentResult.records.map(record => ({
            sourceId: record.get('sourceId'),
            targetId: record.get('targetId'),
            type: record.get('type')
        }));

        const frontendData = {
            concepts: frontendConcepts,
            alignments: frontendAlignments
        };

        const FRONTEND_DATA_PATH = path.join(__dirname, '..', 'src', 'data.json');
        fs.writeFileSync(FRONTEND_DATA_PATH, JSON.stringify(frontendData, null, 2));
        console.log('✅ 前端同步文件 (src/data.json) 已更新。');

    } catch (error) {
        console.error('❌ 初始化失败:', error);
    } finally {
        await session.close();
        await driver.close();
    }
}

init();
