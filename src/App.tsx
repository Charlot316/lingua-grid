import { useState, useMemo, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import frontendData from './data.json';
import { 
  Search, Maximize2, 
  Layers, LayoutGrid, Network, Info, Languages, Sparkles
} from 'lucide-react';
import type { Language } from './types';

// Constants
const LANG_COLORS: any = {
  zh: '#f87171', en: '#60a5fa', jp: '#fb7185', 
  kr: '#22d3ee', fr: '#a78bfa', th: '#fbbf24',
};

const LANGUAGES: { code: Language; label: string; flag: string; accent: string }[] = [
  { code: 'zh', label: '中文', flag: '🇨🇳', accent: 'from-red-400 to-orange-500' },
  { code: 'en', label: 'English', flag: '🇺🇸', accent: 'from-blue-400 to-indigo-500' },
  { code: 'jp', label: '日本語', flag: '🇯🇵', accent: 'from-rose-400 to-pink-500' },
  { code: 'kr', label: '한국어', flag: '🇰🇷', accent: 'from-cyan-400 to-blue-500' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', accent: 'from-purple-400 to-indigo-500' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭', accent: 'from-amber-400 to-orange-500' },
];

type ViewType = 'graph' | 'table';
type MappingMode = 'concept-centric' | 'word-centric';

export default function App() {
  const [viewType, setViewType] = useState<ViewType>('table');
  const [mappingMode, setMappingMode] = useState<MappingMode>('concept-centric');
  const [baseLanguage, setBaseLanguage] = useState<Language>('zh');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoverNode, setHoverNode] = useState<any>(null);
  const [hoveredWordId, setHoveredWordId] = useState<string | null>(null);
  const graphRef = useRef<any>(null);

  // Filter Concepts (Concept-Centric)
  const filteredConcepts = useMemo(() => {
    return frontendData.concepts.filter(c => 
      c.gloss.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // Pivot Data for Word-Centric Mapping
  const wordCentricData = useMemo(() => {
    if (mappingMode !== 'word-centric') return [];

    const baseWordsMap: Record<string, any> = {};
    
    frontendData.concepts.forEach(concept => {
      const senses = concept.senses[baseLanguage] || [];
      senses.forEach((sense: any) => {
        if (!baseWordsMap[sense.word.id]) {
          baseWordsMap[sense.word.id] = {
            id: sense.word.id,
            text: sense.word.text,
            pronunciation: sense.word.pronunciation,
            senses: []
          };
        }
        
        const alignments = frontendData.alignments.filter(a => 
          a.sourceId === sense.word.id || a.targetId === sense.word.id
        );

        const translatedWords: Record<string, any[]> = {};
        LANGUAGES.forEach(l => {
          if (l.code === baseLanguage) return;
          translatedWords[l.code] = [];
          
          alignments.forEach(align => {
            const targetId = align.sourceId === sense.word.id ? align.targetId : align.sourceId;
            frontendData.concepts.forEach(c => {
               const targetSenses = c.senses[l.code as Language] || [];
               targetSenses.forEach((ts: any) => {
                  if (ts.word.id === targetId) {
                     if (!translatedWords[l.code].find(as => as.id === ts.id)) {
                        translatedWords[l.code].push(ts);
                     }
                  }
               });
            });
          });
        });

        baseWordsMap[sense.word.id].senses.push({
          conceptId: concept.id,
          conceptGloss: concept.gloss,
          category: concept.category,
          nuance: sense.nuance,
          example: sense.example,
          example_translation: sense.example_translation,
          translations: translatedWords
        });
      });
    });

    return Object.values(baseWordsMap).filter(w => 
      w.text.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [mappingMode, baseLanguage, searchQuery]);

  // Construct Graph Data
  const graphData = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];

    if (mappingMode === 'concept-centric') {
      filteredConcepts.forEach(concept => {
        nodes.push({
          id: concept.id,
          name: concept.gloss,
          type: 'concept',
          category: concept.category,
          val: 20,
          color: '#6366f1'
        });

        Object.values(concept.senses).flat().forEach((sense: any) => {
          const wordId = `word-${sense.word.id}`;
          if (!nodes.find(n => n.id === wordId)) {
            nodes.push({
              id: wordId,
              name: sense.word.text,
              lang: sense.word.language,
              type: 'word',
              pronunciation: sense.word.pronunciation,
              nuance: sense.nuance,
              example: sense.example,
              example_translation: sense.example_translation,
              val: 10,
              color: LANG_COLORS[sense.word.language]
            });
          }
          links.push({
            source: concept.id,
            target: wordId,
            type: 'sense',
            isPrimary: sense.isPrimary
          });
        });
      });
    } else {
      // Word-Centric Graph
      wordCentricData.forEach(word => {
        const wordNodeId = `word-${word.id}`;
        if (!nodes.find(n => n.id === wordNodeId)) {
          nodes.push({
            id: wordNodeId,
            name: word.text,
            lang: baseLanguage,
            type: 'word',
            pronunciation: word.pronunciation,
            val: 18,
            color: LANG_COLORS[baseLanguage]
          });
        }

        word.senses.forEach((s: any) => {
          Object.values(s.translations).flat().forEach((ts: any) => {
            const targetId = `word-${ts.word.id}`;
            if (!nodes.find(n => n.id === targetId)) {
               nodes.push({
                 id: targetId,
                 name: ts.word.text,
                 lang: ts.word.language,
                 type: 'word',
                 pronunciation: ts.word.pronunciation,
                 nuance: ts.nuance,
                 example: ts.example,
                 example_translation: ts.example_translation,
                 val: 14,
                 color: LANG_COLORS[ts.word.language]
               });
            }
            links.push({
              source: wordNodeId,
              target: targetId,
              type: 'alignment',
              alignmentType: 'EXACT'
            });
          });
        });
      });
    }

    // Direct Alignment Overlays
    frontendData.alignments.forEach(align => {
      const sId = `word-${align.sourceId}`;
      const tId = `word-${align.targetId}`;
      if (nodes.find(n => n.id === sId) && nodes.find(n => n.id === tId)) {
        if (!links.find(l => (l.source === sId && l.target === tId) || (l.source === tId && l.target === sId))) {
          links.push({
            source: sId,
            target: tId,
            type: 'alignment',
            alignmentType: align.type
          });
        }
      }
    });

    return { nodes, links };
  }, [mappingMode, filteredConcepts, wordCentricData, baseLanguage]);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-500);
      graphRef.current.d3Force('link').distance(mappingMode === 'concept-centric' ? 80 : 120);
    }
  }, [graphData, mappingMode]);

  const relatedWordIds = useMemo(() => {
    if (!hoveredWordId) return [];
    return frontendData.alignments
      .filter(a => a.sourceId === hoveredWordId || a.targetId === hoveredWordId)
      .map(a => a.sourceId === hoveredWordId ? a.targetId : a.sourceId);
  }, [hoveredWordId]);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      {/* Navigation Header */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/5 px-8 py-4 backdrop-blur-3xl">
        <div className="max-w-[1920px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
                <Layers className="text-white" size={20} />
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter text-white font-outfit">LINGUA<span className="text-indigo-500">NODE</span></h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Semantic Knowledge Graph</p>
              </div>
            </div>

            <div className="hidden md:flex relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={16} />
              <input 
                type="text" 
                placeholder="Search concepts or words..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-2xl pl-12 pr-6 py-2.5 w-80 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/10 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-white/5 p-1 rounded-xl flex border border-white/5 shadow-inner">
               <button 
                 onClick={() => setMappingMode('concept-centric')}
                 className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mappingMode === 'concept-centric' ? 'bg-purple-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Concept Center
               </button>
               <button 
                 onClick={() => setMappingMode('word-centric')}
                 className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${mappingMode === 'word-centric' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Word Center
               </button>
            </div>

            {mappingMode === 'word-centric' && (
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                {LANGUAGES.map(l => (
                  <button
                    key={l.code}
                    onClick={() => setBaseLanguage(l.code)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-all ${baseLanguage === l.code ? 'bg-white/10 scale-110 shadow-lg' : 'opacity-40 hover:opacity-100'}`}
                    title={l.label}
                  >
                    <span className="text-sm">{l.flag}</span>
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white/5 p-1 rounded-xl flex border border-white/5 shadow-inner">
               <button 
                 onClick={() => setViewType('graph')}
                 className={`p-2 rounded-lg transition-all ${viewType === 'graph' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                 title="Graph View"
               >
                 <Network size={18}/>
               </button>
               <button 
                 onClick={() => setViewType('table')}
                 className={`p-2 rounded-lg transition-all ${viewType === 'table' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
                 title="Table View"
               >
                 <LayoutGrid size={18}/>
               </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 min-h-screen">
        {viewType === 'graph' ? (
          <div className="h-[calc(100vh-6rem)] relative">
            <ForceGraph2D
              ref={graphRef}
              graphData={graphData}
              nodeLabel={n => n.name}
              nodeRelSize={6}
              linkColor={l => {
                if (l.type === 'alignment') {
                  return l.alignmentType === 'EXACT' ? '#34d399' : '#10b98166';
                }
                return l.type === 'sense' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255,255,255,0.06)';
              }}
              linkWidth={l => l.type === 'alignment' ? (l.alignmentType === 'EXACT' ? 4 : 2) : 1}
              linkDirectionalParticles={l => l.alignmentType === 'EXACT' ? 4 : 0}
              onNodeHover={setHoverNode}
              nodeCanvasObject={(node: any, ctx, globalScale) => {
                const label = node.name;
                const fontSize = (node.type === 'concept' ? 6 : 4) / globalScale;
                ctx.font = `${fontSize}px Outfit, sans-serif`;
                
                ctx.beginPath();
                ctx.arc(node.x, node.y, node.val / 3, 0, 2 * Math.PI);
                ctx.fillStyle = node.color;
                ctx.fill();
                
                if (node.type === 'concept') {
                  ctx.strokeStyle = '#fff';
                  ctx.lineWidth = 1/globalScale;
                  ctx.stroke();
                }

                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillStyle = '#fff';
                ctx.fillText(label, node.x, node.y + (node.val / 2) + 2);
              }}
              backgroundColor="rgba(0,0,0,0)"
            />

            {hoverNode && (
              <div className="absolute top-6 left-6 glass p-6 rounded-2xl w-80 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-left-4 duration-300">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md border border-indigo-500/20">{hoverNode.type}</span>
                     {hoverNode.lang && <span className="text-xl">{LANGUAGES.find(l => l.code === hoverNode.lang)?.flag}</span>}
                  </div>
                  <h2 className="text-3xl font-bold mb-1 font-outfit text-white">{hoverNode.name}</h2>
                  {hoverNode.pronunciation && <p className="text-indigo-300 font-mono text-xs mb-4 italic">/ {hoverNode.pronunciation} /</p>}
                  {hoverNode.nuance && (
                    <div className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-4 space-y-3">
                      <p className="flex items-start gap-2 relative">
                         <Info size={12} className="shrink-0 mt-0.5 text-indigo-400" /> 
                         <span>{hoverNode.nuance}</span>
                      </p>
                      {hoverNode.example && (
                         <div className="bg-white/5 p-3 rounded-xl border border-white/5 group/ex">
                            <p className="text-white font-medium mb-1 line-clamp-3 group-hover/ex:line-clamp-none transition-all">{hoverNode.example}</p>
                            <p className="text-[10px] text-slate-500 italic">{hoverNode.example_translation}</p>
                         </div>
                      )}
                    </div>
                  )}
              </div>
            )}
            
            <div className="absolute bottom-8 left-8 glass p-4 rounded-2xl border border-white/10 invisible lg:visible text-[10px]">
               <h3 className="font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                 <Sparkles size={10}/> Visual Archetypes
               </h3>
               <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  <LegendItem color="#6366f1" label="Concept Hub" />
                  <LegendItem color="#34d399" label="Exact Alignment" />
                  {LANGUAGES.map(l => <LegendItem key={l.code} color={LANG_COLORS[l.code]} label={l.label} />)}
               </div>
            </div>

            <button 
               onClick={() => graphRef.current.zoomToFit(400)}
               className="absolute bottom-8 right-8 p-4 bg-indigo-600 text-white rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <Maximize2 size={24}/>
            </button>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto px-8 py-12 space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {mappingMode === 'concept-centric' ? (
              filteredConcepts.map(concept => (
                 <div key={concept.id} className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-[2.5rem] blur opacity-0 group-hover:opacity-100 transition duration-700"></div>
                    <div className="relative glass rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
                      <div className="p-8 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                         <div className="flex items-center gap-6">
                            <div className="w-4 h-14 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full shadow-lg"></div>
                            <div>
                               <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-1 rounded-md border border-indigo-500/10 mb-2 inline-block">
                                 {concept.category}
                               </span>
                               <h3 className="text-4xl font-black font-outfit text-white tracking-tight">{concept.gloss}</h3>
                            </div>
                         </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 divide-x divide-white/5">
                         {LANGUAGES.map(lang => (
                           <div key={lang.code} className="flex flex-col min-h-[320px]">
                              <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.02]">
                                <div className="flex items-center gap-2">
                                  <span className="text-xl">{lang.flag}</span>
                                  <span className="text-xs font-black text-slate-500 uppercase tracking-widest leading-none mt-1">{lang.label}</span>
                                </div>
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${lang.accent}`}></div>
                              </div>
                              <div className="p-4 flex flex-col gap-4 flex-1">
                                {concept.senses[lang.code]?.map((sense: any) => {
                                  const isHovered = hoveredWordId === sense.word.id;
                                  const isRelated = relatedWordIds.includes(sense.word.id);
                                  return (
                                    <div 
                                      key={sense.id}
                                      onMouseEnter={() => setHoveredWordId(sense.word.id)}
                                      onMouseLeave={() => setHoveredWordId(null)}
                                      className={`relative p-5 rounded-2xl border transition-all duration-300 cursor-help ${
                                        isHovered ? 'bg-indigo-500/10 border-indigo-500/30 scale-105 shadow-xl -translate-y-1' :
                                        isRelated ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20' :
                                        'bg-white/[0.02] border-white/5 hover:border-white/20'
                                      }`}
                                    >
                                      <div className="flex justify-between items-start mb-2">
                                        <span className="text-2xl font-black font-outfit tracking-tight">{sense.word.text}</span>
                                        {sense.word.hanja && <span className="text-[9px] font-bold bg-white/10 px-1.5 py-0.5 rounded border border-white/10 opacity-70">{sense.word.hanja}</span>}
                                      </div>
                                      <p className="text-[10px] font-mono text-slate-500 mb-4 italic">/ {sense.word.pronunciation} /</p>
                                      <div className="bg-black/20 p-3 rounded-xl border border-white/5 mb-4">
                                        <p className="text-[10px] text-slate-400 leading-relaxed italic line-clamp-2">{sense.nuance}</p>
                                      </div>
                                      {isRelated && (
                                        <div className="absolute inset-0 rounded-2xl border-2 border-emerald-500/50 pointer-events-none z-10 shadow-[0_0_20px_rgba(16,185,129,0.2)]"></div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                           </div>
                         ))}
                      </div>
                    </div>
                 </div>
              ))
            ) : (
              /* Word-Centric Mapping */
              wordCentricData.map(word => (
                <div key={word.id} className="relative glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                  <div className="p-10 bg-emerald-500/5 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                       <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                          <span className="text-3xl">{LANGUAGES.find(l => l.code === baseLanguage)?.flag}</span>
                       </div>
                       <div>
                          <div className="flex items-center gap-3 mb-2">
                             <h3 className="text-5xl font-black font-outfit text-white tracking-tighter">{word.text}</h3>
                             <span className="bg-white/5 px-3 py-1 rounded-full text-xs font-mono text-emerald-400">/ {word.pronunciation} /</span>
                          </div>
                       </div>
                    </div>
                    <Languages className="w-12 h-12 opacity-10" />
                  </div>

                  <div className="divide-y divide-white/5">
                    {word.senses.map((s: any, idx: number) => (
                      <div key={idx} className="p-8 grid grid-cols-1 xl:grid-cols-12 gap-8 hover:bg-white/[0.01] transition-colors group">
                        <div className="xl:col-span-3 space-y-4">
                           <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black uppercase text-indigo-400 bg-indigo-500/10 px-2 py-1 rounded-md border border-indigo-500/20">
                                 Sense {idx+1}: {s.conceptGloss}
                              </span>
                           </div>
                           <div className="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                              <p className="text-sm text-white font-medium mb-3 italic">"{s.nuance}"</p>
                              <p className="text-[11px] text-slate-400 leading-relaxed italic">{s.example}</p>
                           </div>
                        </div>

                        <div className="xl:col-span-9 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                           {LANGUAGES.filter(l => l.code !== baseLanguage).map(lang => (
                             <div key={lang.code} className="space-y-3">
                                <div className="flex items-center gap-2 px-2 opacity-50">
                                   <span className="text-sm">{lang.flag}</span>
                                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{lang.label}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                   {s.translations[lang.code].length > 0 ? (
                                      s.translations[lang.code].map((ts: any) => (
                                         <div key={ts.id} className="p-4 bg-white/[0.05] border border-white/10 rounded-2xl hover:border-emerald-500/40 hover:bg-emerald-500/5 transition-all">
                                            <p className="text-xl font-black text-white mb-1">{ts.word.text}</p>
                                            <p className="text-[10px] font-mono text-slate-500 italic mb-2">/ {ts.word.pronunciation} /</p>
                                            <p className="text-[10px] text-slate-400 line-clamp-3 leading-snug">{ts.nuance}</p>
                                         </div>
                                      ))
                                   ) : (
                                      <div className="h-20 border border-white/5 border-dashed rounded-2xl flex items-center justify-center opacity-20">
                                         <span className="text-[8px] font-bold uppercase tracking-widest">Unmapped</span>
                                      </div>
                                   )}
                                </div>
                             </div>
                           ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-3">
       <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: color }}></div>
       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  )
}
