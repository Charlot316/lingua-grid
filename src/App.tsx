import { useState, useMemo } from 'react';
import { mockConcepts, mockAlignments } from './mockData';
import type { ConceptRow, Language, Sense } from './types';
import { Share2, Globe, Layers, Search, Sparkles, Database, ArrowRightLeft } from 'lucide-react';

/* 
  Lingua Grid - Semantic Ladder Visualization 
  Premium Edition
*/

const LANGUAGES: { code: Language; label: string; flag: string; accent: string }[] = [
  { code: 'zh', label: '中文', flag: '🇨🇳', accent: 'from-red-400 to-orange-500' },
  { code: 'en', label: 'English', flag: '🇺🇸', accent: 'from-blue-400 to-indigo-500' },
  { code: 'jp', label: '日本語', flag: '🇯🇵', accent: 'from-rose-400 to-pink-500' },
  { code: 'kr', label: '한국어', flag: '🇰🇷', accent: 'from-cyan-400 to-blue-500' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', accent: 'from-purple-400 to-indigo-500' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭', accent: 'from-amber-400 to-orange-500' },
];

export default function App() {
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Helper to find related words based on our alignment table
  const relatedIds = useMemo(() => {
    if (!hoveredWordId) return [];
    const directMatches = mockAlignments
      .filter(a => a.sourceId === hoveredWordId || a.targetId === hoveredWordId)
      .map(a => (a.sourceId === hoveredWordId ? a.targetId : a.sourceId));
    return directMatches;
  }, [hoveredWordId]);

  const filteredConcepts = mockConcepts.filter(c => 
    c.gloss.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 blur-[120px] rounded-full"></div>
      </div>
      
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/5 px-8 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white font-outfit">
                Lingua<span className="text-indigo-400">Grid</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium tracking-wide uppercase opacity-70">Semantic Mapping System</p>
            </div>
          </div>

          <div className="flex flex-1 max-w-xl w-full relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition-colors group-focus-within:text-indigo-400" size={20} />
            <input 
              type="text" 
              placeholder="Search concepts or categories..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/10 transition-all font-medium"
            />
          </div>

          <div className="flex gap-3">
             <button className="p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-slate-300">
                <Database size={20}/>
             </button>
             <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-500/30 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold flex items-center gap-2">
                <Share2 size={18}/> <span>Export</span>
             </button>
          </div>
        </div>
      </header>

      {/* Hero Stats */}
      <section className="max-w-7xl mx-auto px-8 mb-12 flex flex-wrap gap-8">
         <StatCard icon={<Sparkles className="text-amber-400"/>} label="Concepts" value={mockConcepts.length.toString()} />
         <StatCard icon={<Layers className="text-indigo-400"/>} label="Total Senses" value={(mockConcepts.reduce((acc, c) => acc + Object.values(c.senses).flat().length, 0)).toString()} />
         <StatCard icon={<ArrowRightLeft className="text-emerald-400"/>} label="Alignments" value={mockAlignments.length.toString()} />
      </section>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-8 pb-20 space-y-12">
        {filteredConcepts.length > 0 ? (
          filteredConcepts.map((concept) => (
            <ConceptCard 
              key={concept.id} 
              concept={concept} 
              hoveredWordId={hoveredWordId}
              setHoveredWordId={setHoveredWordId}
              relatedIds={relatedIds}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
            <Search size={48} className="mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400 text-lg">No concepts found matching "{searchQuery}"</p>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex-1 min-w-[200px] glass p-4 rounded-2xl border border-white/5 flex items-center gap-4 group hover:border-white/20 transition-all">
      <div className="p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-all">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-white font-outfit">{value}</div>
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{label}</div>
      </div>
    </div>
  )
}

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
    <div className="group relative">
      {/* Decorative Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <div className="relative glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl transition-all duration-500 group-hover:border-white/20">
        {/* Concept Header */}
        <div className="bg-white/[0.02] p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-3 h-12 rounded-full bg-gradient-to-b from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20`}></div>
            <div>
               <div className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-3">
                  {concept.category}
               </div>
               <h3 className="text-3xl font-bold text-white font-outfit leading-none">{concept.gloss}</h3>
            </div>
          </div>
          <div className="text-slate-600 flex items-center gap-3">
             <span className="text-xs font-mono uppercase tracking-tighter opacity-50">{concept.id}</span>
             <Layers className="w-8 h-8 opacity-20" />
          </div>
        </div>

        {/* Semantic Rows */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 divide-x divide-y xl:divide-y-0 divide-white/5">
            
          {LANGUAGES.map((lang) => {
              const senses = concept.senses[lang.code] || [];
              
              return (
                <div key={lang.code} className="flex flex-col min-h-[300px]">
                   {/* Lang Header */}
                   <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{lang.flag}</span>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{lang.label}</span>
                      </div>
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${lang.accent}`}></div>
                   </div>
                   
                   {/* Words Area */}
                   <div className="flex-1 p-4 flex flex-col gap-4 bg-[#ffffff01] relative">
                       {senses.map((sense) => {
                           const isHovered = hoveredWordId === sense.word.id;
                           const isRelated = relatedIds.includes(sense.word.id);
                           const isDimmed = hoveredWordId && !isHovered && !isRelated;

                           return (
                              <WordChip 
                                  key={sense.id}
                                  sense={sense}
                                  accent={lang.accent}
                                  isHovered={isHovered}
                                  isRelated={isRelated}
                                  isDimmed={!!isDimmed}
                                  onEnter={() => setHoveredWordId(sense.word.id)}
                                  onLeave={() => setHoveredWordId(null)}
                              />
                           );
                       })}
                       
                       {senses.length === 0 && (
                          <div className="flex-1 flex flex-col items-center justify-center opacity-20 italic text-xs text-slate-600">
                              <span className="mb-1 italic opacity-30">No translation</span>
                              <div className="w-1 h-8 bg-slate-800 rounded-full"></div>
                          </div>
                       )}
                   </div>
                </div>
              );
          })}
        </div>
      </div>
    </div>
  );
}

function WordChip({ 
    sense, 
    accent,
    isHovered, 
    isRelated, 
    isDimmed,
    onEnter, 
    onLeave 
}: { 
    sense: Sense; 
    accent: string;
    isHovered: boolean;
    isRelated: boolean; 
    isDimmed: boolean;
    onEnter: () => void; 
    onLeave: () => void;
}) {
    const baseStyle = "relative overflow-hidden cursor-pointer rounded-2xl p-5 transition-all duration-500 border group/chip";
    
    let stateStyle = "bg-white/[0.02] border-white/5 hover:border-white/20 hover:bg-white/[0.04] shadow-sm";

    if (isHovered) {
        stateStyle = "scale-[1.05] border-transparent shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-10 translate-y-[-4px]";
    } else if (isRelated) {
        stateStyle = "scale-[1.05] border-transparent bg-emerald-500/10 shadow-lg ring-1 ring-emerald-500/20";
    } else if (isDimmed) {
        stateStyle = "opacity-20 blur-[2px] grayscale translate-y-[4px]";
    }

    return (
        <div 
            className={`${baseStyle} ${stateStyle}`}
            onMouseEnter={onEnter}
            onMouseLeave={onLeave}
        >
            {/* Accent Border on Hover */}
            {isHovered && (
              <div className={`absolute inset-0 bg-gradient-to-br ${accent} -z-10 opacity-20`}></div>
            )}

            {/* Main Word Text */}
            <div className="flex justify-between items-start mb-2 group-hover/chip:mb-3 transition-all">
                <span className={`font-bold text-xl tracking-wide font-outfit ${isHovered ? 'text-white' : 'text-slate-100'}`}>
                    {sense.word.text}
                </span>
                {sense.word.hanja && (
                     <span className="text-[10px] font-bold bg-white/5 text-slate-400 px-2 py-0.5 rounded-lg border border-white/10 group-hover/chip:border-white/20 transition-colors">
                        {sense.word.hanja}
                     </span>
                )}
            </div>

            {/* Pronunciation */}
            <div className={`text-[11px] font-mono mb-4 flex items-center gap-2 ${isHovered ? 'text-slate-100' : 'text-slate-500'}`}>
                <span className="opacity-50">/</span>
                {sense.word.pronunciation}
                <span className="opacity-50">/</span>
            </div>

            {/* Nuance / Definition Note */}
            {sense.nuance && (
                <div className={`text-[11px] leading-relaxed p-3 rounded-xl bg-black/20 border border-white/5 transition-all ${isHovered ? 'text-slate-100 border-white/10' : 'text-slate-400'}`}>
                    {sense.nuance}
                </div>
            )}
            
            {/* Logic for Cognate Connector (Visual Only for now) */}
            {(isHovered || isRelated) && (
                <div className="absolute bottom-2 right-2 flex gap-2">
                   {sense.word.difficulty && (
                      <div className="text-[8px] font-black tracking-widest uppercase text-white/40">
                         LVL {sense.word.difficulty}
                      </div>
                   )}
                </div>
            )}

            {isRelated && (
                <div className="absolute top-0 right-0 p-1.5">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_10px_#34d399]"></div>
                </div>
            )}
        </div>
    )
}
