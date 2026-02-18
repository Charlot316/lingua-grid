import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'lingua.db');
const SCHEMA_PATH = path.join(__dirname, 'schema.sql');
const SEED_PATH = path.join(__dirname, 'seed.sql');
const FRONTEND_DATA_PATH = path.join(__dirname, '..', 'src', 'data.json');

// 1. Initialize DB
console.log('🚀 Initializing SQLite database...');
if (fs.existsSync(DB_PATH)) {
    fs.unlinkSync(DB_PATH);
}

const db = new Database(DB_PATH);

const schema = fs.readFileSync(SCHEMA_PATH, 'utf8');
const seed = fs.readFileSync(SEED_PATH, 'utf8');

db.exec(schema);
db.exec(seed);

console.log('✅ Database created at db/lingua.db');

// 2. Export to JSON for Frontend (since browser can't query SQLite directly without backend)
console.log('📦 Exporting data for frontend...');

const concepts = db.prepare('SELECT * FROM concepts').all();
const words = db.prepare('SELECT * FROM words').all();
const senses = db.prepare('SELECT * FROM senses').all();
const alignments = db.prepare('SELECT * FROM word_alignments').all();

// Construct a structured object similar to what App.tsx expects
const wordsMap = {};
words.forEach(w => {
    wordsMap[w.id] = {
        id: w.id,
        language: w.language,
        text: w.text,
        pronunciation: w.pronunciation,
        difficulty: w.difficulty_level,
        hanja: w.hanja_script || undefined,
        root: w.etymology_root || undefined
    };
});

const structuredConcepts = concepts.map(c => {
    const conceptSenses = {};
    const languages = ['zh', 'en', 'jp', 'kr', 'fr', 'th'];
    languages.forEach(lang => conceptSenses[lang] = []);

    const relevantSenses = senses.filter(s => s.concept_id === c.id);
    relevantSenses.forEach(s => {
        const word = wordsMap[s.word_id];
        if (word) {
            conceptSenses[word.language].push({
                id: s.id,
                word: word,
                nuance: s.nuance_note,
                isPrimary: !!s.is_primary
            });
        }
    });

    return {
        id: c.id,
        gloss: c.gloss_zh,
        category: c.category,
        senses: conceptSenses
    };
});

const formattedAlignments = alignments.map(a => ({
    sourceId: a.word_source_id,
    targetId: a.word_target_id,
    type: a.alignment_type
}));

const frontendData = {
    concepts: structuredConcepts,
    alignments: formattedAlignments
};

fs.writeFileSync(FRONTEND_DATA_PATH, JSON.stringify(frontendData, null, 2));
console.log('✅ Frontend data exported to src/data.json');
