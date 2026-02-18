// ==========================================
// LinguaNode Master Seed (Final Corrected & Audited Version)
// Fixes: 
// 1. Added EN-FR alignment for HAPPY concept (Heureux-Happy).
// 2. Verified and re-added all ZH-JP-KR Sinitic triads.
// 3. Added NEW CONCEPTS: HEART (C_HEART) and WAY/PATH (C_WAY_PATH) with all 6 languages.
// ==========================================

MATCH (n) DETACH DELETE n;

// 1. Concepts
CREATE (:Concept {id: 'C_SUN_BODY', gloss: '太阳 (天体)', category: 'Nature'});
CREATE (:Concept {id: 'C_SUN_TIME', gloss: '日子 (时间)', category: 'Time'});
CREATE (:Concept {id: 'C_HAPPY', gloss: '快乐 (情绪)', category: 'Emotion'});
CREATE (:Concept {id: 'C_WATER_H2O', gloss: '水 (物质)', category: 'Nature'});
CREATE (:Concept {id: 'C_HEART', gloss: '心 (核心/情感)', category: 'Abstract'});
CREATE (:Concept {id: 'C_WAY_PATH', gloss: '道/路 (路径/法则)', category: 'Abstract'});

// 2. Word Nodes
// ZH
CREATE (:Word {id: 'W_ZH_TY', text: '太阳', language: 'zh', pronunciation: 'tài yáng', difficulty: 1, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_RI', text: '日', language: 'zh', pronunciation: 'rì', difficulty: 2, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_KX', text: '开心', language: 'zh', pronunciation: 'kāi xīn', difficulty: 1, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_LE', text: '乐', language: 'zh', pronunciation: 'lè', difficulty: 2, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_SH', text: '水', language: 'zh', pronunciation: 'shuǐ', difficulty: 1, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_XI', text: '心', language: 'zh', pronunciation: 'xīn', difficulty: 1, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_DA', text: '道', language: 'zh', pronunciation: 'dào', difficulty: 2, root: 'Sinitic'});
CREATE (:Word {id: 'W_ZH_LU', text: '路', language: 'zh', pronunciation: 'lù', difficulty: 1, root: 'Sinitic'});

// EN
CREATE (:Word {id: 'W_EN_SU', text: 'Sun', language: 'en', pronunciation: '/sʌn/', difficulty: 1, root: 'Germanic'});
CREATE (:Word {id: 'W_EN_DA', text: 'Day', language: 'en', pronunciation: '/deɪ/', difficulty: 1, root: 'Germanic'});
CREATE (:Word {id: 'W_EN_HA', text: 'Happy', language: 'en', pronunciation: '/ˈhæpi/', difficulty: 1, root: 'Norse'});
CREATE (:Word {id: 'W_EN_WA', text: 'Water', language: 'en', pronunciation: 'ˈwɔːtər', difficulty: 1, root: 'Germanic'});
CREATE (:Word {id: 'W_EN_HE', text: 'Heart', language: 'en', pronunciation: '/hɑːrt/', difficulty: 1, root: 'Germanic'});
CREATE (:Word {id: 'W_EN_WAY', text: 'Way', language: 'en', pronunciation: '/weɪ/', difficulty: 1, root: 'Germanic'});
CREATE (:Word {id: 'W_EN_RO', text: 'Road', language: 'en', pronunciation: '/roʊd/', difficulty: 1, root: 'Germanic'});

// JP
CREATE (:Word {id: 'W_JP_TY', text: '太陽', language: 'jp', pronunciation: 'たいよう', difficulty: 2, hanja: '太陽', root: 'Sinitic'});
CREATE (:Word {id: 'W_JP_HI', text: '日', language: 'jp', pronunciation: 'ひ', difficulty: 1, hanja: '日', root: 'Native'});
CREATE (:Word {id: 'W_JP_NI', text: '日', language: 'jp', pronunciation: 'にち', difficulty: 3, hanja: '日', root: 'Sinitic'});
CREATE (:Word {id: 'W_JP_UR', text: '嬉しい', language: 'jp', pronunciation: 'うれしい', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_JP_RK', text: '楽', language: 'jp', pronunciation: 'らく', difficulty: 2, hanja: '楽', root: 'Sinitic'});
CREATE (:Word {id: 'W_JP_MZ', text: '水', language: 'jp', pronunciation: 'みず', difficulty: 1, hanja: '水', root: 'Native'});
CREATE (:Word {id: 'W_JP_KO', text: '心', language: 'jp', pronunciation: 'こころ', difficulty: 1, hanja: '心', root: 'Native'});
CREATE (:Word {id: 'W_JP_SZ', text: '心臓', language: 'jp', pronunciation: 'しんぞう', difficulty: 2, hanja: '心臓', root: 'Sinitic'});
CREATE (:Word {id: 'W_JP_MI', text: '道', language: 'jp', pronunciation: 'みち', difficulty: 1, hanja: '道', root: 'Native'});
CREATE (:Word {id: 'W_JP_DO', text: '道', language: 'jp', pronunciation: 'どう', difficulty: 3, hanja: '道', root: 'Sinitic'});

// KR
CREATE (:Word {id: 'W_KR_TY', text: '태양', language: 'kr', pronunciation: 'taeyang', difficulty: 2, hanja: '太陽', root: 'Sinitic'});
CREATE (:Word {id: 'W_KR_HE', text: '해', language: 'kr', pronunciation: 'hae', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_KR_IL', text: '일', language: 'kr', pronunciation: 'il', difficulty: 2, hanja: '日', root: 'Sinitic'});
CREATE (:Word {id: 'W_KR_GP', text: '기쁘다', language: 'kr', pronunciation: 'gippeuda', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_KR_RK', text: '락', language: 'kr', pronunciation: 'rak', difficulty: 3, hanja: '樂', root: 'Sinitic'});
CREATE (:Word {id: 'W_KR_MU', text: '물', language: 'kr', pronunciation: 'mul', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_KR_MA', text: '마음', language: 'kr', pronunciation: 'ma-eum', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_KR_SJ', text: '심장', language: 'kr', pronunciation: 'sim-jang', difficulty: 2, hanja: '心臓', root: 'Sinitic'});
CREATE (:Word {id: 'W_KR_GI', text: '길', language: 'kr', pronunciation: 'gil', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_KR_DO', text: '도', language: 'kr', pronunciation: 'do', difficulty: 3, hanja: '道', root: 'Sinitic'});

// FR
CREATE (:Word {id: 'W_FR_SO', text: 'Soleil', language: 'fr', pronunciation: '/sɔ.lɛj/', difficulty: 1, root: 'Latin'});
CREATE (:Word {id: 'W_FR_JO', text: 'Jour', language: 'fr', pronunciation: '/ʒuʁ/', difficulty: 1, root: 'Latin'});
CREATE (:Word {id: 'W_FR_HE', text: 'Heureux', language: 'fr', pronunciation: '/œ.ʁø/', difficulty: 1, root: 'Latin'});
CREATE (:Word {id: 'W_FR_EA', text: 'Eau', language: 'fr', pronunciation: 'o', difficulty: 1, root: 'Latin'});
CREATE (:Word {id: 'W_FR_CO', text: 'Cœur', language: 'fr', pronunciation: '/kœʁ/', difficulty: 1, root: 'Latin'});
CREATE (:Word {id: 'W_FR_VO', text: 'Voie', language: 'fr', pronunciation: '/vwa/', difficulty: 1, root: 'Latin'});
CREATE (:Word {id: 'W_FR_RO', text: 'Route', language: 'fr', pronunciation: '/ʁut/', difficulty: 1, root: 'Latin'});

// TH
CREATE (:Word {id: 'W_TH_AT', text: 'อาทิตย์', language: 'th', pronunciation: 'aa-thit', difficulty: 2, root: 'Sanskrit'});
CREATE (:Word {id: 'W_TH_TW', text: 'ตะวัน', language: 'th', pronunciation: 'ta-wan', difficulty: 2, root: 'Native'});
CREATE (:Word {id: 'W_TH_WA', text: 'วัน', language: 'th', pronunciation: 'wan', difficulty: 1, root: 'Unknown'});
CREATE (:Word {id: 'W_TH_DJ', text: 'ดีใจ', language: 'th', pronunciation: 'dee-jai', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_TH_NA', text: 'น้ำ', language: 'th', pronunciation: 'nám', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_TH_HJ', text: 'หัวใจ', language: 'th', pronunciation: 'hua-jai', difficulty: 1, root: 'Native'});
CREATE (:Word {id: 'W_TH_TA', text: 'ทาง', language: 'th', pronunciation: 'thaang', difficulty: 1, root: 'Native'});

// 3. Sense Mappings
MATCH (w:Word {id: 'W_ZH_TY'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_TY', nuance: '核心天体', example: '太阳在东方升起。', example_translation: 'The sun rises in the east.'}]->(c);
MATCH (w:Word {id: 'W_EN_SU'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_SU', nuance: 'The Star', example: 'The sun is scorching today.', example_translation: '今天太阳很毒。'}]->(c);
MATCH (w:Word {id: 'W_JP_TY'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_TY', nuance: '惑星系の恒星', example: '太陽系には八つの惑星がある。', example_translation: '太阳系有八大行星。'}]->(c);
MATCH (w:Word {id: 'W_KR_TY'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_TY', nuance: '빛과 열의 근원', example: '태양은 지구를 비춘다.', example_translation: '太阳照耀着地球。'}]->(c);
MATCH (w:Word {id: 'W_FR_SO'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_SO', nuance: 'L\'astre solaire', example: 'Le soleil brille très fort.', example_translation: '太阳照得很灿烂。'}]->(c);
MATCH (w:Word {id: 'W_TH_AT'}), (c:Concept {id: 'C_SUN_BODY'}) CREATE (w)-[:HAS_SENSE {id: 'S_TH_AT', nuance: 'ดวงอาทิตย์', example: 'พระอาทิตย์ขึ้นตอนเช้า', example_translation: '太阳从清晨升起。'}]->(c);

MATCH (w:Word {id: 'W_ZH_RI'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_RI', nuance: '一日的时间', example: '往后的日子还长。', example_translation: 'The days ahead are still long.'}]->(c);
MATCH (w:Word {id: 'W_EN_DA'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_DA', nuance: '24-hour period', example: 'Have a nice day!', example_translation: '过个快活的一天！'}]->(c);
MATCH (w:Word {id: 'W_JP_NI'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_NI', nuance: '日付の単位', example: '誕生日は三月十日です。', example_translation: '我的生日是三月十日。'}]->(c);
MATCH (w:Word {id: 'W_KR_IL'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_IL', nuance: '하루 또는 날짜', example: '오늘은 무슨 일이에요?', example_translation: '今天是什么日子？'}]->(c);
MATCH (w:Word {id: 'W_FR_JO'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_JO', nuance: 'Durée de 24h', example: 'Quel jour sommes-nous ?', example_translation: '今天是星期几/什么时候？'}]->(c);
MATCH (w:Word {id: 'W_TH_WA'}), (c:Concept {id: 'C_SUN_TIME'}) CREATE (w)-[:HAS_SENSE {id: 'S_TH_WA', nuance: 'เวลาหนื่งว้น', example: 'วันนี้เป็นวันเกิดของฉัน', example_translation: '今天是我的生日。'}]->(c);

MATCH (w:Word {id: 'W_ZH_KX'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_KX', nuance: '直观的喜悦', example: '见到你我真开心。', example_translation: 'I am so happy to see you.'}]->(c);
MATCH (w:Word {id: 'W_EN_HA'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_HA', nuance: 'General joy', example: 'Happy people live longer.', example_translation: '快乐的人长寿。'}]->(c);
MATCH (w:Word {id: 'W_JP_UR'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_UR', nuance: '主観的な喜び', example: 'プレゼントをもらって嬉しい。', example_translation: '收到礼物我很开心。'}]->(c);
MATCH (w:Word {id: 'W_KR_GP'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_GP', nuance: '벅찬 즐거움', example: '합격 소식에 정말 기쁘다.', example_translation: '听到合格的消息真开心。'}]->(c);
MATCH (w:Word {id: 'W_FR_HE'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_HE', nuance: 'État de bonheur', example: 'Je suis heureux de te voir.', example_translation: '看到你我很幸福。'}]->(c);
MATCH (w:Word {id: 'W_TH_DJ'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_TH_DJ', nuance: 'ความรู้สึกยินดี', example: 'ฉันดีใจที่ได้พบคุณ', example_translation: '见到你我很开心。'}]->(c);
MATCH (w:Word {id: 'W_ZH_LE'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_LE', nuance: '情感愉悦', example: '助人为乐。', example_translation: 'Joy in helping others.'}]->(c);
MATCH (w:Word {id: 'W_JP_RK'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_RK', nuance: '乐 (Sinitic)', example: '音乐を楽しむ。', example_translation: 'Enjoy music.'}]->(c);
MATCH (w:Word {id: 'W_KR_RK'}), (c:Concept {id: 'C_HAPPY'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_RK', nuance: '락 (Sinitic)', example: '희로애락.', example_translation: 'Joy, anger, sorrow, pleasure.'}]->(c);

MATCH (w:Word {id: 'W_ZH_SH'}), (c:Concept {id: 'C_WATER_H2O'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_SH', nuance: '基本液体', example: '人离不开水。', example_translation: 'Humans cannot live without water.'}]->(c);
MATCH (w:Word {id: 'W_EN_WA'}), (c:Concept {id: 'C_WATER_H2O'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_WA', nuance: 'H2O liquid', example: 'Please give me a glass of water.', example_translation: '请给我杯水。'}]->(c);
MATCH (w:Word {id: 'W_JP_MZ'}), (c:Concept {id: 'C_WATER_H2O'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_MZ', nuance: '冷たい水', example: '水を一杯ください。', example_translation: '请给我一杯水。'}]->(c);
MATCH (w:Word {id: 'W_KR_MU'}), (c:Concept {id: 'C_WATER_H2O'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_MU', nuance: '마시는 물', example: '물이 맑고 깨끗하다.', example_translation: '水很清澈干净。'}]->(c);
MATCH (w:Word {id: 'W_FR_EA'}), (c:Concept {id: 'C_WATER_H2O'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_EA', nuance: 'Liquide vital', example: 'L\'eau est incolore.', example_translation: '水是无色的。'}]->(c);
MATCH (w:Word {id: 'W_TH_NA'}), (c:Concept {id: 'C_WATER_H2O'}) CREATE (w)-[:HAS_SENSE {id: 'S_TH_NA', nuance: 'ของเหลวที่ใช้ดื่ม', example: 'ฉันขอน้ำหน่อยเถอะ', example_translation: '给我点水吧。'}]->(c);

MATCH (w:Word {id: 'W_ZH_XI'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_XI', nuance: '情感与思维的中心', example: '这首歌深深地触动了我的心。', example_translation: 'This song deeply touched my heart.'}]->(c);
MATCH (w:Word {id: 'W_EN_HE'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_HE', nuance: 'The emotional center', example: 'Follow your heart when making decisions.', example_translation: '做决定时请追随你的内心。'}]->(c);
MATCH (w:Word {id: 'W_JP_KO'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_KO', nuance: '精神的、抽象的な心', example: '彼はとても心が温かい人です。', example_translation: '他是一个心肠非常温暖的人。'}]->(c);
MATCH (w:Word {id: 'W_JP_SZ'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_SZ', nuance: '解剖学的な臓器', example: '心臓がドキドキしている。', example_translation: '心脏正在扑通扑通地跳。'}]->(c);
MATCH (w:Word {id: 'W_KR_MA'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_MA', nuance: '추상적인 정신적 중심', example: '그녀의 마음이 정말 예뻐요.', example_translation: '她的心肠真的很美。'}]->(c);
MATCH (w:Word {id: 'W_KR_SJ'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_SJ', nuance: '해부학적 장기', example: '규칙적인 운동은 심장 건강에 좋다.', example_translation: '规律运动对心脏心脏健康有好处。'}]->(c);
MATCH (w:Word {id: 'W_FR_CO'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_CO', nuance: 'Le centre des émotions', example: 'Elle a un cœur d\'or.', example_translation: '她有一颗金子般的心。'}]->(c);
MATCH (w:Word {id: 'W_TH_HJ'}), (c:Concept {id: 'C_HEART'}) CREATE (w)-[:HAS_SENSE {id: 'S_TH_HJ', nuance: 'ศูนย์กลางของความรู้สึก', example: 'เขาเป็นคนที่มีหัวใจดีมาก', example_translation: '他是一个心肠非常好的人。'}]->(c);

MATCH (w:Word {id: 'W_ZH_DA'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_DA', nuance: '抽象的法则与道路', example: '他找到了自己的人生长道。', example_translation: 'He found his life\'s great path.'}]->(c);
MATCH (w:Word {id: 'W_ZH_LU'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_ZH_LU', nuance: '具体的通行路径', example: '这条路直通火车站。', example_translation: 'This road leads directly to the station.'}]->(c);
MATCH (w:Word {id: 'W_EN_WAY'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_WAY', nuance: 'Method or route', example: 'Is this the right way to the beach?', example_translation: '这是去海滩的路吗？'}]->(c);
MATCH (w:Word {id: 'W_EN_RO'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_EN_RO', nuance: 'A paved path for travel', example: 'The road is under construction.', example_translation: '路面正在施工。'}]->(c);
MATCH (w:Word {id: 'W_JP_MI'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_MI', nuance: '物理的な通り路', example: '通りをまっすぐ歩く。', example_translation: '径直走在街上。'}]->(c);
MATCH (w:Word {id: 'W_JP_DO'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_JP_DO', nuance: '道の概念、術', example: '茶の道（茶道）。', example_translation: 'The way of tea (Tea Ceremony).'}]->(c);
MATCH (w:Word {id: 'W_KR_GI'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_GI', nuance: '사람이나 차가 다니는 길', example: '길이 너무 막힌다.', example_translation: '路太堵了。'}]->(c);
MATCH (w:Word {id: 'W_KR_DO'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_KR_DO', nuance: '정신적 가치나 가르침', example: '정의로운 길을 가다.', example_translation: '走正义之路 (道)。'}]->(c);
MATCH (w:Word {id: 'W_FR_VO'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_VO', nuance: 'Moyen ou passsage', example: 'Prendre la voie lactée.', example_translation: '踏入银河 (道)。'}]->(c);
MATCH (w:Word {id: 'W_FR_RO'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_FR_RO', nuance: 'Grande voie asphaltée', example: 'La route est longue.', example_translation: '路途遥远。'}]->(c);
MATCH (w:Word {id: 'W_TH_TA'}), (c:Concept {id: 'C_WAY_PATH'}) CREATE (w)-[:HAS_SENSE {id: 'S_TH_TA', nuance: 'เส้นทางที่เดินไปได้', example: 'ทางข้างล่างเป็นทางเปลี่ยว', example_translation: '下面的路是一条偏僻的路。'}]->(c);

// 4. Alignments (The Bridges)
// -- TIME (EXACT) --
MATCH (z:Word {id: 'W_ZH_RI'}), (j:Word {id: 'W_JP_NI'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (z:Word {id: 'W_ZH_RI'}), (k:Word {id: 'W_KR_IL'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (j:Word {id: 'W_JP_NI'}), (k:Word {id: 'W_KR_IL'}) CREATE (j)-[:ALIGNS {type: 'EXACT'}]->(k);
// -- SUN (EXACT & COGNATE) --
MATCH (z:Word {id: 'W_ZH_TY'}), (j:Word {id: 'W_JP_TY'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (k:Word {id: 'W_KR_TY'}), (j:Word {id: 'W_JP_TY'}) CREATE (k)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (z:Word {id: 'W_ZH_TY'}), (k:Word {id: 'W_KR_TY'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (e:Word {id: 'W_EN_SU'}), (f:Word {id: 'W_FR_SO'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(f);
// -- HAPPY (EXACT & COGNATE) --
MATCH (z:Word {id: 'W_ZH_LE'}), (k:Word {id: 'W_KR_RK'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (z:Word {id: 'W_ZH_LE'}), (j:Word {id: 'W_JP_RK'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (j:Word {id: 'W_JP_RK'}), (k:Word {id: 'W_KR_RK'}) CREATE (j)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (e:Word {id: 'W_EN_HA'}), (f:Word {id: 'W_FR_HE'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(f);
// -- WATER (EXACT & COGNATE) --
MATCH (z:Word {id: 'W_ZH_SH'}), (j:Word {id: 'W_JP_MZ'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (z:Word {id: 'W_ZH_SH'}), (k:Word {id: 'W_KR_MU'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (j:Word {id: 'W_JP_MZ'}), (k:Word {id: 'W_KR_MU'}) CREATE (j)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (e:Word {id: 'W_EN_WA'}), (f:Word {id: 'W_FR_EA'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(f);
// -- HEART (EXACT & COGNATE) --
MATCH (z:Word {id: 'W_ZH_XI'}), (j:Word {id: 'W_JP_KO'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (z:Word {id: 'W_ZH_XI'}), (j:Word {id: 'W_JP_SZ'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (z:Word {id: 'W_ZH_XI'}), (k:Word {id: 'W_KR_SJ'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (j:Word {id: 'W_JP_SZ'}), (k:Word {id: 'W_KR_SJ'}) CREATE (j)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (e:Word {id: 'W_EN_HE'}), (f:Word {id: 'W_FR_CO'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(f);
MATCH (e:Word {id: 'W_EN_HE'}), (z:Word {id: 'W_ZH_XI'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(z);
// -- WAY/PATH (EXACT & COGNATE) --
MATCH (z:Word {id: 'W_ZH_DA'}), (j:Word {id: 'W_JP_DO'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(j);
MATCH (z:Word {id: 'W_ZH_DA'}), (k:Word {id: 'W_KR_DO'}) CREATE (z)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (j:Word {id: 'W_JP_DO'}), (k:Word {id: 'W_KR_DO'}) CREATE (j)-[:ALIGNS {type: 'EXACT'}]->(k);
MATCH (e:Word {id: 'W_EN_WAY'}), (f:Word {id: 'W_FR_VO'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(f);
MATCH (e:Word {id: 'W_EN_RO'}), (f:Word {id: 'W_FR_RO'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(f);
MATCH (e:Word {id: 'W_EN_WAY'}), (z:Word {id: 'W_ZH_DA'}) CREATE (e)-[:ALIGNS {type: 'COGNATE'}]->(z);
