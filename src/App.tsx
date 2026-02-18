import { useState } from 'react';
import { mockConcepts, mockAlignments } from './mockData';
import type { ConceptRow, Language, Sense } from './types';
import { Share2, BookOpen, Globe, Layers } from 'lucide-react';

/* 
  Lingua Grid - Semantic Ladder Visualization 
*/

export default function App() {

  
  // State for hover-based alignment highlighting
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);

  // Helper to find related words based on our alignment table
  const getRelatedWordIds = (sourceId: string): string[] => {
    const directMatches = mockAlignments
      .filter(a => a.sourceId === sourceId || a.targetId === sourceId)
      .map(a => (a.sourceId === sourceId ? a.targetId : a.sourceId));
    return directMatches;
  };

  const relatedIds = hoveredWordId ? getRelatedWordIds(hoveredWordId) : [];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-8 font-sans selection:bg-purple-100 selection:text-purple-900">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto mb-12 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2 flex items-center gap-3">
            <Globe className="w-10 h-10 text-indigo-600" />
            Lingua<span className="text-indigo-600">Grid</span>
          </h1>
          <p className="text-slate-500 text-lg">Cross-linguistic Semantic Mapping System</p>
        </div>
        <div className="flex gap-4">
             <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition font-medium text-slate-600 flex items-center gap-2">
                <BookOpen size={18}/> Documentation
             </button>
             <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition font-medium flex items-center gap-2">
                <Share2 size={18}/> Export Deck
             </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto space-y-8">
      
        {mockConcepts.map((concept) => (
          <ConceptCard 
            key={concept.id} 
            concept={concept} 
            hoveredWordId={hoveredWordId}
            setHoveredWordId={setHoveredWordId}
            relatedIds={relatedIds}
          />
        ))}

      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

const LANGUAGES: { code: Language; label: string; color: string }[] = [
  { code: 'zh', label: '中文 (CN)', color: 'bg-red-50 text-red-900 border-red-100' },
  { code: 'en', label: 'English', color: 'bg-blue-50 text-blue-900 border-blue-100' },
  { code: 'jp', label: '日本語', color: 'bg-emerald-50 text-emerald-900 border-emerald-100' },
  { code: 'kr', label: '한국어', color: 'bg-teal-50 text-teal-900 border-teal-100' },
  { code: 'fr', label: 'Français', color: 'bg-purple-50 text-purple-900 border-purple-100' },
  { code: 'th', label: 'ไทย', color: 'bg-orange-50 text-orange-900 border-orange-100' },
];

function ConceptCard({ 
  concept, 
  hoveredWordId, 
  setHoveredWordId,
  relatedIds
}: { 
  concept: ConceptRow; 
  hoveredWordId: string | null;
  setHoveredWordId: (id: string | null) => void;
  relatedIds: string[];
}) {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden transition hover:shadow-2xl">
      {/* Concept Header */}
      <div className="bg-slate-50/50 p-6 border-b border-slate-100 flex items-center justify-between">
        <div>
           <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 mb-2">
              {concept.category}
           </div>
           <h3 className="text-2xl font-bold text-slate-800">{concept.gloss}</h3>
        </div>
        <div className="text-slate-400">
           <Layers className="w-6 h-6" />
        </div>
      </div>

      {/* Semantic Rows */}
      <div className="grid grid-cols-6 divide-x divide-slate-100">
          
        {/* Render each language column */}
        {LANGUAGES.map((lang) => {
            const senses = concept.senses[lang.code] || [];
            
            return (
              <div key={lang.code} className="flex flex-col min-h-[160px]">
                 {/* Lang Header */}
                 <div className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50/30 text-center">
                    {lang.label}
                 </div>
                 
                 {/* Words Area */}
                 <div className="flex-1 p-3 flex flex-col gap-2 bg-white relative">
                     {/* 
                        Semantic Ladder Logic:
                        Sort words by difficulty/intensity (mocked by array order here)
                     */}
                     {senses.map((sense) => {
                         const isHovered = hoveredWordId === sense.word.id;
                         const isRelated = relatedIds.includes(sense.word.id);
                         const isDimmed = hoveredWordId && !isHovered && !isRelated; // Focus mode logic

                         return (
                            <WordChip 
                                key={sense.id}
                                sense={sense}

                                isHovered={isHovered}
                                isRelated={isRelated}
                                isDimmed={!!isDimmed}
                                onEnter={() => setHoveredWordId(sense.word.id)}
                                onLeave={() => setHoveredWordId(null)}
                            />
                         );
                     })}
                     
                     {senses.length === 0 && (
                        <div className="flex-1 flex items-center justify-center">
                            <span className="w-2 h-2 rounded-full bg-slate-200"></span>
                        </div>
                     )}
                 </div>
              </div>
            );
        })}
      </div>
    </div>
  );
}

function WordChip({ 
    sense, 
 
    isHovered, 
    isRelated, 
    isDimmed,
    onEnter, 
    onLeave 
}: { 
    sense: Sense; 

    isHovered: boolean;
    isRelated: boolean; 
    isDimmed: boolean;
    onEnter: () => void; 
    onLeave: () => void;
}) {
    // Dynamic styles based on interaction state
    const baseStyle = "relative group cursor-pointer rounded-lg p-3 transition-all duration-300 border";
    
    let stateStyle = "border-transparent hover:border-indigo-200 hover:bg-slate-50 shadow-sm hover:shadow-md";

    if (isHovered) {
        stateStyle = "scale-105 border-indigo-500 shadow-lg ring-2 ring-indigo-500/20 bg-white z-10";
    } else if (isRelated) {
        // Highlight related words (Exact matches or Cognates)
        stateStyle = "scale-105 border-emerald-400 bg-emerald-50/50 shadow-md ring-2 ring-emerald-400/20";
    } else if (isDimmed) {
        stateStyle = "opacity-30 blur-[1px] grayscale";
    }

    return (
        <div 
            className={`${baseStyle} ${stateStyle}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Main Word Text */}
            <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-lg leading-tight text-slate-800">
                    {sense.word.text}
                </span>
                {/* Nuance Badge or Hanja */}
                {sense.word.hanja && (
                     <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded border border-slate-200">
                        {sense.word.hanja}
                     </span>
                )}
            </div>

            {/* Pronunciation */}
            <div className="text-xs text-slate-500 font-mono mb-2">
                {sense.word.pronunciation}
            </div>

            {/* Nuance / Definition Note */}
            {sense.nuance && (
                <div className="text-[10px] leading-relaxed text-slate-600 border-t border-slate-100 pt-1 mt-1">
                    {sense.nuance}
                </div>
            )}
            
            {/* Logic for Cognate Connector (Visual Only for now) */}
            {isRelated && (
                <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[9px] px-1.5 py-0.5 rounded-full shadow-sm animate-bounce">
                    Linked
                </div>
            )}
        </div>
    )
}
