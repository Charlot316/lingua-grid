// Clear Database
MATCH (n) DETACH DELETE n;

// 1. Create Concepts
CREATE (c1:Concept {id: 'C_SUN_BODY', gloss: '太阳 (天体)', category: 'Nature'})
CREATE (c2:Concept {id: 'C_SUN_TIME', gloss: '日子 (时间)', category: 'Time'})
CREATE (c3:Concept {id: 'C_HAPPY', gloss: '快乐 (情绪)', category: 'Emotion'});

// 2. Create Words
CREATE (w_zh1:Word {id: 'W_ZH_TAIYANG', text: '太阳', language: 'zh', pronunciation: 'tài yáng', difficulty: 1, root: 'Sinitic'})
CREATE (w_zh2:Word {id: 'W_ZH_RI', text: '日', language: 'zh', pronunciation: 'rì', difficulty: 2, root: 'Sinitic'})
CREATE (w_zh3:Word {id: 'W_ZH_KAIXIN', text: '开心', language: 'zh', pronunciation: 'kāi xīn', difficulty: 1, root: 'Sinitic'})

CREATE (w_en1:Word {id: 'W_EN_SUN', text: 'Sun', language: 'en', pronunciation: '/sʌn/', difficulty: 1, root: 'Germanic'})
CREATE (w_en2:Word {id: 'W_EN_DAY', text: 'Day', language: 'en', pronunciation: '/deɪ/', difficulty: 1, root: 'Germanic'})
CREATE (w_en3:Word {id: 'W_EN_HAPPY', text: 'Happy', language: 'en', pronunciation: '/ˈhæpi/', difficulty: 1, root: 'Norse'})

CREATE (w_jp1:Word {id: 'W_JP_NICHI', text: '日', language: 'jp', pronunciation: 'にち', difficulty: 3, hanja: '日', root: 'Sinitic'})
CREATE (w_jp2:Word {id: 'W_JP_HI', text: '日', language: 'jp', pronunciation: 'ひ', difficulty: 1, hanja: '日', root: 'Native'})
CREATE (w_jp3:Word {id: 'W_JP_TAIYOU', text: '太陽', language: 'jp', pronunciation: 'たいよう', difficulty: 2, hanja: '太陽', root: 'Sinitic'})
CREATE (w_jp4:Word {id: 'W_JP_URESHII', text: '嬉しい', language: 'jp', pronunciation: 'うれしい', difficulty: 1, root: 'Native'})

CREATE (w_kr1:Word {id: 'W_KR_IL', text: '일', language: 'kr', pronunciation: 'il', difficulty: 2, hanja: '日', root: 'Sinitic'})
CREATE (w_kr2:Word {id: 'W_KR_HAE', text: '해', language: 'kr', pronunciation: 'hae', difficulty: 1, root: 'Native'})
CREATE (w_kr3:Word {id: 'W_KR_TAEYANG', text: '태양', language: 'kr', pronunciation: 'taeyang', difficulty: 2, hanja: '太陽', root: 'Sinitic'})
CREATE (w_kr4:Word {id: 'W_KR_GIPPEUDA', text: '기쁘다', language: 'kr', pronunciation: 'gippeuda', difficulty: 1, root: 'Native'})

CREATE (w_fr1:Word {id: 'W_FR_SOLEIL', text: 'Soleil', language: 'fr', pronunciation: '/sɔ.lɛj/', difficulty: 1, root: 'Latin'})
CREATE (w_fr2:Word {id: 'W_FR_JOUR', text: 'Jour', language: 'fr', pronunciation: '/ʒuʁ/', difficulty: 1, root: 'Latin'})
CREATE (w_fr3:Word {id: 'W_FR_HEUREUX', text: 'Heureux', language: 'fr', pronunciation: '/œ.ʁø/', difficulty: 1, root: 'Latin'})

CREATE (w_th1:Word {id: 'W_TH_TAWAN', text: 'ตะวัน', language: 'th', pronunciation: 'ta-wan', difficulty: 2, root: 'Native'})
CREATE (w_th2:Word {id: 'W_TH_ATHIT', text: 'อาทิตย์', language: 'th', pronunciation: 'aa-thit', difficulty: 3, root: 'Sanskrit'})
CREATE (w_th3:Word {id: 'W_TH_WAN', text: 'วัน', language: 'th', pronunciation: 'wan', difficulty: 1, root: 'Unknown'})
CREATE (w_th4:Word {id: 'W_TH_DEEJAI', text: 'ดีใจ', language: 'th', pronunciation: 'dee-jai', difficulty: 1, root: 'Native'});

// 3. Create Senses (Relationships)
// Sun Body
MATCH (w:Word {id: 'W_ZH_TAIYANG'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: '太阳系的中心天体', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_EN_SUN'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: 'The star at the center of the Solar System.', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_JP_HI'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: '空に輝き、光と热を放つ天体。', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_JP_TAIYOU'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: '惑星の中心としての恒星を指す科学的な名称。', is_primary: false}]->(c);
MATCH (w:Word {id: 'W_KR_HAE'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: '하늘에 떠서 세상을 밝게 비추는 불덩이 모양의 천체。', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_KR_TAEYANG'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: '지구에 빛과 열을 주는 항성。', is_primary: false}]->(c);
MATCH (w:Word {id: 'W_FR_SOLEIL'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: "L'astre qui éclaire la Terre pendant le jour.", is_primary: true}]->(c);
MATCH (w:Word {id: 'W_TH_TAWAN'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: 'ดวงอาทิตย์ (คำไวพจน์หรือคำทั่วไป)', is_primary: true}]->(c);

// Time
MATCH (w:Word {id: 'W_ZH_RI'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {nuance: '地球自转一周的时间单位。', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_ZH_RI'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {nuance: '在书面或科学语境中指代太阳。', is_primary: false}]->(c);
MATCH (w:Word {id: 'W_EN_DAY'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {nuance: 'The time required for a full rotation of Earth.', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_JP_NICHI'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {nuance: 'カレンダー上の一日、または日付。', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_JP_HI'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {nuance: '特定の出来事があった日、または时间。', is_primary: false}]->(c);
MATCH (w:Word {id: 'W_KR_IL'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {nuance: '날짜나 하루를 나타내는 한자어。', is_primary: true}]->(c);

// Happy
MATCH (w:Word {id: 'W_ZH_KAIXIN'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {nuance: '心情舒畅、愉悦。', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_EN_HAPPY'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {nuance: 'Feeling or showing pleasure or contentment.', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_JP_URESHII'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {nuance: '望ましいことが起きて、心がはずむ感覚。', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_KR_GIPPEUDA'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {nuance: '좋은 일이 생겨서 마음이 즐겁다.', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_FR_HEUREUX'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {nuance: 'Qui ressent du bonheur, une joie profonde.', is_primary: true}]->(c);
MATCH (w:Word {id: 'W_TH_DEEJAI'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {nuance: 'รู้สึกยินดีหรือมีสุข', is_primary: true}]->(c);

// 4. Alignments
MATCH (w1:Word {id: 'W_ZH_TAIYANG'}), (w2:Word {id: 'W_JP_TAIYOU'}) CREATE (w1)-[:ALIGNS {type: 'EXACT', note: 'Shared Sinitic root 太陽'}]->(w2);
MATCH (w1:Word {id: 'W_ZH_TAIYANG'}), (w2:Word {id: 'W_KR_TAEYANG'}) CREATE (w1)-[:ALIGNS {type: 'EXACT', note: 'Shared Sinitic root 太陽'}]->(w2);
MATCH (w1:Word {id: 'W_JP_TAIYOU'}), (w2:Word {id: 'W_KR_TAEYANG'}) CREATE (w1)-[:ALIGNS {type: 'EXACT', note: 'Shared Sinitic root 太陽'}]->(w2);
MATCH (w1:Word {id: 'W_ZH_RI'}), (w2:Word {id: 'W_JP_NICHI'}) CREATE (w1)-[:ALIGNS {type: 'EXACT', note: 'Shared Sinitic root 日'}]->(w2);
MATCH (w1:Word {id: 'W_ZH_RI'}), (w2:Word {id: 'W_KR_IL'}) CREATE (w1)-[:ALIGNS {type: 'EXACT', note: 'Shared Sinitic root 日'}]->(w2);
MATCH (w1:Word {id: 'W_JP_NICHI'}), (w2:Word {id: 'W_KR_IL'}) CREATE (w1)-[:ALIGNS {type: 'EXACT', note: 'Shared Sinitic root 日'}]->(w2);
MATCH (w1:Word {id: 'W_EN_SUN'}), (w2:Word {id: 'W_FR_SOLEIL'}) CREATE (w1)-[:ALIGNS {type: 'COGNATE', note: 'PIE root *sóh₂wl̥'}]->(w2);
MATCH (w1:Word {id: 'W_EN_HAPPY'}), (w2:Word {id: 'W_FR_HEUREUX'}) CREATE (w1)-[:ALIGNS {type: 'APPROXIMATE'}]->(w2);
MATCH (w1:Word {id: 'W_ZH_KAIXIN'}), (w2:Word {id: 'W_EN_HAPPY'}) CREATE (w1)-[:ALIGNS {type: 'APPROXIMATE'}]->(w2);
