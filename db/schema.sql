-- 1. Concepts (概念核心)
-- 这是最抽象的层级，比如 "A bright celestial body" 或 "A period of 24 hours"
-- 不依赖于任何具体语言，通常用你的母语（中文）做一个锚点描述
CREATE TABLE concepts (
    id TEXT PRIMARY KEY,
    -- UUID
    gloss_zh TEXT NOT NULL,
    -- 中文简述，如 "太阳 (天体)", "天/日 (时间)"
    category TEXT,
    -- 分类: Nature, Time, Emotion
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- 2. Words (词汇表)
-- 具体的语言符号。注意：同一个拼写的词只存一次 (Unique by text + language)
CREATE TABLE words (
    id TEXT PRIMARY KEY,
    -- UUID
    language TEXT NOT NULL,
    -- 'en', 'jp', 'kr', 'th', 'fr'
    text TEXT NOT NULL,
    -- 单词拼写: "Sun", "日", "Excited"
    pronunciation TEXT,
    -- 音标/罗马音: "/sʌn/", "Nichi", "Tawan"
    audio_url TEXT,
    -- 发音文件路径
    difficulty_level INTEGER,
    -- 1 (基础) - 5 (高阶/GRE) - 10 (母语级罕见)
    -- 词源/汉字辅助字段 (这是你的强项区)
    hanja_script TEXT,
    -- 仅用于韩/日: 对应的汉字，如 "太阳", "気持"
    etymology_root TEXT,
    -- 词根: "sol-", "helio-"
    UNIQUE(language, text, pronunciation)
);
-- 3. Senses (义项关联表 - 核心逻辑)
-- 连接 Word 和 Concept 的桥梁。
-- 这里解决了 "一词多义" 和 "近义词辨析"
CREATE TABLE senses (
    id TEXT PRIMARY KEY,
    word_id TEXT NOT NULL,
    concept_id TEXT NOT NULL,
    -- 微差描述：在这个概念下，这个词的独特味道
    -- Concept: "Happy"
    -- Word: "Delighted" -> nuance: "Showing great pleasure"
    -- Word: "Ecstatic" -> nuance: "Overwhelming excitement"
    nuance_note TEXT,
    is_primary BOOLEAN DEFAULT FALSE,
    -- 在这个概念下，这是不是最常用的那个词？
    FOREIGN KEY (word_id) REFERENCES words(id),
    FOREIGN KEY (concept_id) REFERENCES concepts(id)
);
-- 4. Word Alignments (跨语言对齐 - 强关联)
-- 解决 "精准对齐" vs "部分对齐" 的问题
-- 这是一个自关联的多对多表，用于直接链接不同语言的单词
CREATE TABLE word_alignments (
    id TEXT PRIMARY KEY,
    word_source_id TEXT NOT NULL,
    word_target_id TEXT NOT NULL,
    -- 对齐类型:
    -- 'EXACT': 精准对齐 (如: 中 "电话" <-> 日 "電話")
    -- 'COGNATE': 同源词 (如: 英 "Liberty" <-> 法 "Liberté")
    -- 'APPROXIMATE': 近义 (如: 中 "开心" <-> 英 "Happy")
    alignment_type TEXT CHECK(
        alignment_type IN ('EXACT', 'COGNATE', 'APPROXIMATE')
    ),
    note TEXT,
    -- 备注差异，如 "Tone rule differs"
    FOREIGN KEY (word_source_id) REFERENCES words(id),
    FOREIGN KEY (word_target_id) REFERENCES words(id),
    -- 避免重复 (始终保持 source < target 的 ID 顺序来去重，或者允许双向但应用层控制)
    UNIQUE(word_source_id, word_target_id)
);
-- 5. Sentences (例句)
-- 例句是绑定在 "Sense" 上的，而不是 Word 上，这样能确保例句语境准确
CREATE TABLE sentences (
    id TEXT PRIMARY KEY,
    sense_id TEXT NOT NULL,
    original_text TEXT NOT NULL,
    translation_zh TEXT,
    highlight_indices JSON,
    -- 存储高亮位置，例如 [0, 3]
    FOREIGN KEY (sense_id) REFERENCES senses(id)
);
-- 示例查询：
-- 查找所有表示 "Happy (Category: Emotion)" 的英语单词，并按难度排序
-- SELECT w.text, w.difficulty_level, s.nuance_note 
-- FROM words w 
-- JOIN senses s ON w.id = s.word_id 
-- JOIN concepts c ON s.concept_id = c.id 
-- WHERE c.gloss_zh = '高兴' AND w.language = 'en' 
-- ORDER BY w.difficulty_level ASC;