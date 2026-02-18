import data from './data.json';
import type { ConceptRow, Alignment } from './types';

export const mockAlignments: Alignment[] = data.alignments as Alignment[];
export const mockConcepts: ConceptRow[] = data.concepts as ConceptRow[];
