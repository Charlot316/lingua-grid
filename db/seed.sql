-- 清空旧数据 (开发环境专用)
DELETE FROM word_alignments;
DELETE FROM sentences;
DELETE FROM senses;
DELETE FROM words;
DELETE FROM concepts;
-- ==========================================
-- 1. Concepts (概念)
-- ==========================================
INSERT INTO concepts (id, gloss_zh, category)
VALUES ('C_SUN_BODY', '太阳 (天体)', 'Nature'),
    ('C_SUN_TIME', '日子/天 (时间)', 'Time'),
    ('C_HAPPY', '快乐/高兴 (情绪)', 'Emotion');
-- ==========================================
-- 2. Words (词汇 - 跨5种语言)
-- ==========================================
INSERT INTO words (
        id,
        language,
        text,
        pronunciation,
        difficulty_level,
        hanja_script,
        etymology_root
    )
VALUES -- Chinese
    (
        'W_ZH_TAIYANG',
        'zh',
        '太阳',
        'tài yáng',
        1,
        NULL,
        'Sinitic'
    ),
    ('W_ZH_RI', 'zh', '日', 'rì', 2, NULL, 'Sinitic'),
    (
        'W_ZH_KAIXIN',
        'zh',
        '开心',
        'kāi xīn',
        1,
        NULL,
        'Sinitic'
    ),
    (
        'W_ZH_YUANMAN',
        'zh',
        '圆满',
        'yuán mǎn',
        3,
        NULL,
        'Sinitic'
    ),
    -- English
    (
        'W_EN_SUN',
        'en',
        'Sun',
        '/sʌn/',
        1,
        NULL,
        'Germanic: sunnǭ'
    ),
    (
        'W_EN_DAY',
        'en',
        'Day',
        '/deɪ/',
        1,
        NULL,
        'Germanic: dagaz'
    ),
    (
        'W_EN_HAPPY',
        'en',
        'Happy',
        '/ˈhæpi/',
        1,
        NULL,
        'Norse: happ'
    ),
    (
        'W_EN_DELIGHTED',
        'en',
        'Delighted',
        '/dɪˈlaɪtɪd/',
        2,
        NULL,
        'Latin: delectare'
    ),
    (
        'W_EN_ECSTATIC',
        'en',
        'Ecstatic',
        '/ekˈstætɪk/',
        4,
        NULL,
        'Greek: ekstasis'
    ),
    -- Japanese
    (
        'W_JP_NICHI',
        'jp',
        '日',
        'nichi',
        3,
        '日',
        'Sinitic'
    ),
    -- 音读
    ('W_JP_HI', 'jp', '日', 'hi', 1, '日', 'Native'),
    -- 训读 (太阳/日子)
    (
        'W_JP_TAIYOU',
        'jp',
        '太陽',
        'taiyō',
        2,
        '太陽',
        'Sinitic'
    ),
    (
        'W_JP_URESHII',
        'jp',
        '嬉しい',
        'ureshii',
        1,
        NULL,
        'Native'
    ),
    (
        'W_JP_KANGI',
        'jp',
        '歓喜',
        'kanki',
        4,
        '歓喜',
        'Sinitic'
    ),
    -- Korean
    ('W_KR_IL', 'kr', '일', 'il', 2, '日', 'Sinitic'),
    -- 对应汉字"日"
    ('W_KR_HAE', 'kr', '해', 'hae', 1, NULL, 'Native'),
    -- 对应"太阳"
    (
        'W_KR_TAEYANG',
        'kr',
        '태양',
        'taeyang',
        2,
        '太陽',
        'Sinitic'
    ),
    (
        'W_KR_GIPPEUDA',
        'kr',
        '기쁘다',
        'gippeuda',
        1,
        NULL,
        'Native'
    ),
    -- French
    (
        'W_FR_SOLEIL',
        'fr',
        'Soleil',
        '/sɔ.lɛj/',
        1,
        NULL,
        'Latin: sol'
    ),
    (
        'W_FR_JOUR',
        'fr',
        'Jour',
        '/ʒuʁ/',
        1,
        NULL,
        'Latin: diurnum'
    ),
    (
        'W_FR_HEUREUX',
        'fr',
        'Heureux',
        '/œ.ʁø/',
        1,
        NULL,
        'Latin: augurium'
    ),
    (
        'W_FR_RAVI',
        'fr',
        'Ravi',
        '/ʁa.vi/',
        2,
        NULL,
        'Latin: rapere'
    ),
    -- Thai
    (
        'W_TH_TAWAN',
        'th',
        'ตะวัน',
        'ta-wan',
        2,
        NULL,
        'Native'
    ),
    -- 太阳 (诗意/通俗)
    (
        'W_TH_ATHIT',
        'th',
        'อาทิตย์',
        'aa-thit',
        3,
        NULL,
        'Sanskrit: aditya'
    ),
    -- 太阳/周日
    (
        'W_TH_WAN',
        'th',
        'วัน',
        'wan',
        1,
        NULL,
        'Unknown'
    );
-- 日子/天
-- ==========================================
-- 3. Senses (义项 - 链接 Word 和 Concept)
-- ==========================================
-- Concept: 太阳 (天体)
INSERT INTO senses (id, word_id, concept_id, nuance_note, is_primary)
VALUES (
        'S_EN_SUN',
        'W_EN_SUN',
        'C_SUN_BODY',
        'The star around which the earth orbits.',
        TRUE
    ),
    (
        'S_ZH_TAIYANG',
        'W_ZH_TAIYANG',
        'C_SUN_BODY',
        '太阳本身。',
        TRUE
    ),
    (
        'S_JP_HI',
        'W_JP_HI',
        'C_SUN_BODY',
        'Refers to the sun itself (native Japanese).',
        TRUE
    ),
    (
        'S_JP_TAIYOU',
        'W_JP_TAIYOU',
        'C_SUN_BODY',
        'Scientific/Formal term for the Sun.',
        FALSE
    ),
    (
        'S_KR_HAE',
        'W_KR_HAE',
        'C_SUN_BODY',
        'Native Korean word for Sun.',
        TRUE
    ),
    (
        'S_KR_TAEYANG',
        'W_KR_TAEYANG',
        'C_SUN_BODY',
        'Sino-Korean term for Sun.',
        FALSE
    ),
    (
        'S_FR_SOLEIL',
        'W_FR_SOLEIL',
        'C_SUN_BODY',
        'The star.',
        TRUE
    ),
    (
        'S_TH_TAWAN',
        'W_TH_TAWAN',
        'C_SUN_BODY',
        'Common word for Sun.',
        TRUE
    ),
    (
        'S_TH_ATHIT',
        'W_TH_ATHIT',
        'C_SUN_BODY',
        'Formal/Sanskrit origin.',
        FALSE
    );
-- Concept: 日子 (时间)
INSERT INTO senses (id, word_id, concept_id, nuance_note, is_primary)
VALUES (
        'S_EN_DAY',
        'W_EN_DAY',
        'C_SUN_TIME',
        'A period of 24 hours.',
        TRUE
    ),
    (
        'S_ZH_RI',
        'W_ZH_RI',
        'C_SUN_TIME',
        '泛指一天，或在合成词中使用。',
        TRUE
    ),
    (
        'S_JP_NICHI',
        'W_JP_NICHI',
        'C_SUN_TIME',
        'Counter for days, or "Sun" in compounds.',
        TRUE
    ),
    (
        'S_KR_IL',
        'W_KR_IL',
        'C_SUN_TIME',
        'Sino-Korean word for day/date.',
        TRUE
    ),
    (
        'S_FR_JOUR',
        'W_FR_JOUR',
        'C_SUN_TIME',
        'Daytime or 24h period.',
        TRUE
    ),
    (
        'S_TH_WAN',
        'W_TH_WAN',
        'C_SUN_TIME',
        'Day.',
        TRUE
    );
-- Concept: 快乐 (情绪)
INSERT INTO senses (id, word_id, concept_id, nuance_note, is_primary)
VALUES (
        'S_EN_HAPPY',
        'W_EN_HAPPY',
        'C_HAPPY',
        'General feeling of pleasure.',
        TRUE
    ),
    (
        'S_ZH_KAIXIN',
        'W_ZH_KAIXIN',
        'C_HAPPY',
        '内心感到愉悦。',
        TRUE
    ),
    (
        'S_EN_DELIGHTED',
        'W_EN_DELIGHTED',
        'C_HAPPY',
        'Higher intensity, typically about a specific event.',
        FALSE
    ),
    (
        'S_EN_ECSTATIC',
        'W_EN_ECSTATIC',
        'C_HAPPY',
        'Overwhelming happiness.',
        FALSE
    ),
    (
        'S_JP_URESHII',
        'W_JP_URESHII',
        'C_HAPPY',
        'Subjective feeling of happiness.',
        TRUE
    ),
    (
        'S_JP_KANGI',
        'W_JP_KANGI',
        'C_HAPPY',
        'Deep joy/Delight (Formal).',
        FALSE
    ),
    (
        'S_KR_GIPPEUDA',
        'W_KR_GIPPEUDA',
        'C_HAPPY',
        'To be glad/happy.',
        TRUE
    ),
    (
        'S_FR_HEUREUX',
        'W_FR_HEUREUX',
        'C_HAPPY',
        'State of well-being.',
        TRUE
    ),
    (
        'S_FR_RAVI',
        'W_FR_RAVI',
        'C_HAPPY',
        'Delighted/Enchanted.',
        FALSE
    );
-- ==========================================
-- 4. Alignments (强关联 - 你的核心需求)
-- ==========================================
-- [EXACT] 中日韩 汉字词对齐 (Sinitic Roots)
-- 日(Nichi) <-> 日/Il (KR)
INSERT INTO word_alignments (
        id,
        word_source_id,
        word_target_id,
        alignment_type,
        note
    )
VALUES (
        'WA_JP_KR_NICHI_IL',
        'W_JP_NICHI',
        'W_KR_IL',
        'EXACT',
        'Both derive from Chinese character 日'
    ),
    (
        'WA_JP_KR_TAIYOU_TAEYANG',
        'W_JP_TAIYOU',
        'W_KR_TAEYANG',
        'EXACT',
        'Both derive from Chinese character 太陽'
    );
-- [COGNATE] 印欧语系同源词
-- Sun <-> Soleil (Proto-Indo-European *sóh₂wl̥)
INSERT INTO word_alignments (
        id,
        word_source_id,
        word_target_id,
        alignment_type,
        note
    )
VALUES (
        'WA_EN_FR_SUN_SOLEIL',
        'W_EN_SUN',
        'W_FR_SOLEIL',
        'COGNATE',
        'Shared PIE root *sóh₂wl̥'
    ),
    (
        'WA_EN_FR_HAPPY_HEUREUX',
        'W_EN_HAPPY',
        'W_FR_HEUREUX',
        'APPROXIMATE',
        'Different roots but functional equivalents'
    );
-- [APPROXIMATE] 跨语系近义
INSERT INTO word_alignments (
        id,
        word_source_id,
        word_target_id,
        alignment_type,
        note
    )
VALUES (
        'WA_EN_JP_HAPPY_URESHII',
        'W_EN_HAPPY',
        'W_JP_URESHII',
        'APPROXIMATE',
        'General equivalence'
    );