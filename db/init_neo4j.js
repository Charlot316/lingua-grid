import neo4j from 'neo4j-driver';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 默认配置，可通过环境变量覆盖
const NEO4J_URI = process.env.NEO4J_URI || 'bolt://localhost:7687';
const NEO4J_USER = process.env.NEO4J_USER || 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD || 'password';

const driver = neo4j.driver(NEO4J_URI, neo4j.auth.basic(NEO4J_USER, NEO4J_PASSWORD));

async function init() {
    const session = driver.session();
    try {
        console.log('🚀 正在连接 Neo4j...');
        const seedCypher = fs.readFileSync(path.join(__dirname, 'seed.cypher'), 'utf8');
        
        // 按分号拆分 Cypher 语句并依次执行
        const statements = seedCypher.split(';').map(s => s.trim()).filter(s => s.length > 0);
        
        console.log('🧹 清理并填充图数据...');
        for (const statement of statements) {
            await session.run(statement);
        }
        
        console.log('✅ Neo4j 数据库已成功初始化：概念、词汇与语义关联已就绪。');

        // 同步导出数据给前端，确保 UI 能够即时反映图数据库的结构
        console.log('📦 从 Neo4j 导出数据到 src/data.json...');
        
        // 1. 获取概念及其义项
        const conceptResult = await session.run(`
            MATCH (c:Concept)
            OPTIONAL MATCH (w:Word)-[s:HAS_SENSE]->(c)
            RETURN c, collect({
                id: s.id,
                word: properties(w),
                nuance: s.nuance,
                isPrimary: s.is_primary,
                lang: w.language
            }) as wordSenses
        `);

        const frontendConcepts = conceptResult.records.map(record => {
            const conceptNode = record.get('c');
            const concept = conceptNode.properties;
            const wordSenses = record.get('wordSenses');
            
            const sensesMap = { zh: [], en: [], jp: [], kr: [], fr: [], th: [] };
            wordSenses.forEach(ws => {
                if (ws.lang && sensesMap[ws.lang]) {
                    sensesMap[ws.lang].push({
                        id: ws.id,
                        word: ws.word,
                        nuance: ws.nuance,
                        isPrimary: !!ws.isPrimary
                    });
                }
            });

            return {
                id: concept.id,
                gloss: concept.gloss,
                category: concept.category,
                senses: sensesMap
            };
        });

        // 2. 获取词汇对齐关系
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
        console.log('✅ 前端缓存数据已根据图数据库同步更新。');

    } catch (error) {
        console.error('❌ Neo4j 错误:', error);
        console.log('\n💡 提示: 请确保您的 Neo4j 服务已启动 (默认 localhost:7687)。');
    } finally {
        await session.close();
        await driver.close();
    }
}

init();
