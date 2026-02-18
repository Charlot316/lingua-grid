export type Language = 'zh' | 'en' | 'jp' | 'kr' | 'fr' | 'th';

export interface Word {
  id: string;
  text: string;
  pronunciation: string;
  difficulty: number;
  hanja?: string;
  root?: string;
}

export interface Alignment {
  sourceId: string;
  targetId: string;
  type: 'EXACT' | 'COGNATE' | 'APPROXIMATE';
}

export interface Sense {
  id: string;
  word: Word;
  nuance?: string;
  isPrimary: boolean;
}

export interface ConceptRow {
  id: string;
  gloss: string; // "Happy"
  category: string;
  senses: Record<Language, Sense[]>; // Map language to list of words (for synonyms)
}
