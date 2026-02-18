import type { ConceptRow, Alignment } from './types';

/**
 * MOCK DATA
 * Represents what the SQL query would return after joining Tables 1-4
 */

export const mockAlignments: Alignment[] = [
  // Happy
  { sourceId: 'W_EN_HAPPY', targetId: 'W_FR_HEUREUX', type: 'APPROXIMATE' },
  { sourceId: 'W_JP_NICHI', targetId: 'W_KR_IL', type: 'EXACT' }, // They are literally the same '日'
  { sourceId: 'W_JP_TAIYOU', targetId: 'W_KR_TAEYANG', type: 'EXACT' }, // '太陽' -> '태양'
  { sourceId: 'W_EN_SUN', targetId: 'W_FR_SOLEIL', type: 'COGNATE' }, // Same roots
];

export const mockConcepts: ConceptRow[] = [
  {
    id: 'C_SUN_BODY',
    gloss: 'Sun (Celestial Body)',
    category: 'Nature',
    senses: {
      zh: [{ id: 'S_ZH_TAIYANG', word: { id: 'W_ZH_TAIYANG', text: '太阳', pronunciation: 'Tai Yang', difficulty: 1 }, isPrimary: true }],
      en: [{ id: 'S_EN_SUN', word: { id: 'W_EN_SUN', text: 'Sun', pronunciation: '/sʌn/', difficulty: 1, root: 'PIE: *sóh₂wl̥' }, isPrimary: true }],
      jp: [
        { id: 'S_JP_HI', word: { id: 'W_JP_HI', text: '日', pronunciation: 'Hi', difficulty: 1, root: 'Native' }, isPrimary: true, nuance: 'Casual/Native' },
        { id: 'S_JP_TAIYOU', word: { id: 'W_JP_TAIYOU', text: '太陽', pronunciation: 'Taiyou', difficulty: 2, hanja: '太陽' }, isPrimary: false, nuance: 'Scientific/Formal' }
      ],
      kr: [
        { id: 'S_KR_IL', word: { id: 'W_KR_IL', text: '일', pronunciation: 'Il', difficulty: 2, hanja: '日' }, isPrimary: true },
        { id: 'S_KR_HAE', word: { id: 'W_KR_HAE', text: '해', pronunciation: 'Hae', difficulty: 1, root: 'Native' }, isPrimary: true },
        { id: 'S_KR_TAEYANG', word: { id: 'W_KR_TAEYANG', text: '태양', pronunciation: 'Taeyang', difficulty: 2, hanja: '太陽' }, isPrimary: false }
      ],
      fr: [{ id: 'S_FR_SOLEIL', word: { id: 'W_FR_SOLEIL', text: 'Soleil', pronunciation: '/sɔ.lɛj/', difficulty: 1, root: 'Lat: sol' }, isPrimary: true }],
      th: [
        { id: 'S_TH_TAWAN', word: { id: 'W_TH_TAWAN', text: 'ตะวัน', pronunciation: 'Tawan', difficulty: 2 }, isPrimary: true },
        { id: 'S_TH_ATHIT', word: { id: 'W_TH_ATHIT', text: 'อาทิตย์', pronunciation: 'Athit', difficulty: 3, root: 'Skt: aditya' }, isPrimary: false }
      ]
    }
  },
  {
    id: 'C_HAPPY',
    gloss: 'Happy / Joyful',
    category: 'Emotion',
    senses: {
      zh: [{ id: 'S_ZH_KAIXIN', word: { id: 'W_ZH_KAIXIN', text: '开心', pronunciation: 'Kai Xin', difficulty: 1 }, isPrimary: true }],
      en: [
        { id: 'S_EN_HAPPY', word: { id: 'W_EN_HAPPY', text: 'Happy', pronunciation: '/ˈhæpi/', difficulty: 1 }, isPrimary: true },
        { id: 'S_EN_DELIGHTED', word: { id: 'W_EN_DELIGHTED', text: 'Delighted', pronunciation: '/dɪˈlaɪtɪd/', difficulty: 2 }, isPrimary: false, nuance: 'Great pleasure' },
        { id: 'S_EN_ECSTATIC', word: { id: 'W_EN_ECSTATIC', text: 'Ecstatic', pronunciation: '/ekˈstætɪk/', difficulty: 4 }, isPrimary: false, nuance: 'Overwhelming' }
      ],
      jp: [
        { id: 'S_JP_URESHII', word: { id: 'W_JP_URESHII', text: '嬉しい', pronunciation: 'Ureshii', difficulty: 1 }, isPrimary: true },
        { id: 'S_JP_KANGI', word: { id: 'W_JP_KANGI', text: '歓喜', pronunciation: 'Kanki', difficulty: 4, hanja: '歓喜' }, isPrimary: false, nuance: 'Deep joy' }
      ],
      kr: [{ id: 'S_KR_GIPPEUDA', word: { id: 'W_KR_GIPPEUDA', text: '기쁘다', pronunciation: 'Gippeuda', difficulty: 1 }, isPrimary: true }],
      fr: [{ id: 'S_FR_HEUREUX', word: { id: 'W_FR_HEUREUX', text: 'Heureux', pronunciation: '/œ.ʁø/', difficulty: 1 }, isPrimary: true }],
      th: [
          { id: 'S_TH_DEEJAI', word: { id: 'W_TH_DEEJAI', text: 'ดีใจ', pronunciation: 'Dee-jai', difficulty: 1 }, isPrimary: true }
      ]
    }
  }
];
