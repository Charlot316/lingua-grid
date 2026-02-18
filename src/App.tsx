import { useState, useMemo, useEffect, useRef } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import frontendData from './data.json';
import { Share2, Globe, Search, Maximize2, ArrowRightLeft, Layers } from 'lucide-react';

/* 
  Lingua Node - Graph Edition (Neo4j Inspired)
*/

const LANG_COLORS: any = {
  zh: '#f87171', // Red
  en: '#60a5fa', // Blue
  jp: '#fb7185', // Rose
  kr: '#22d3ee', // Cyan
  fr: '#a78bfa', // Purple
  th: '#fbbf24', // Amber
};

type GraphMode = 'semantic' | 'lexical';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoverNode, setHoverNode] = useState<any>(null);
  const [mode, setMode] = useState<GraphMode>('semantic');
  const graphRef = useRef<any>(null);

  // Transform Data for Graph
  const graphData = useMemo(() => {
    const nodes: any[] = [];
    const links: any[] = [];

    // 1. Filtered Concepts
    const filteredConcepts = frontendData.concepts.filter(c => 
      c.gloss.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (mode === 'semantic') {
      // Semantic Mode: Concept -> Word connections
      filteredConcepts.forEach(concept => {
        nodes.push({
          id: concept.id,
          name: concept.gloss,
          type: 'concept',
          category: concept.category,
          val: 18,
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
       // Lexical Mode: Words only, linked by Alignments
       filteredConcepts.forEach(concept => {
         Object.values(concept.senses).flat().forEach((sense: any) => {
           const wordId = `word-${sense.word.id}`;
           if (!nodes.find(n => n.id === wordId)) {
             nodes.push({
               id: wordId,
               name: sense.word.text,
               lang: sense.word.language,
               type: 'word',
               pronunciation: sense.word.pronunciation,
               val: 12,
               color: LANG_COLORS[sense.word.language]
             });
           }
         });
       });
    }

    // Always add Alignments
    frontendData.alignments.forEach(align => {
      const sId = `word-${align.sourceId}`;
      const tId = `word-${align.targetId}`;
      if (nodes.find(n => n.id === sId) && nodes.find(n => n.id === tId)) {
        links.push({
          source: sId,
          target: tId,
          type: 'alignment',
          alignmentType: align.type
        });
      }
    });

    return { nodes, links };
  }, [searchQuery, mode]);

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force('charge').strength(-400);
      graphRef.current.d3Force('link').distance((l: any) => l.type === 'sense' ? 100 : 150);
    }
  }, [graphData]);

  return (
    <div className="h-screen w-screen bg-[#020617] text-white flex flex-col overflow-hidden font-sans">
      <header className="glass border-b border-white/5 px-8 py-4 z-50 flex items-center justify-between gap-8">
        <div className="flex items-center gap-4">
           <div className="p-2 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
             <Globe className="w-6 h-6 text-white" />
           </div>
           <div>
             <h1 className="text-xl font-bold font-outfit leading-tight">Lingua<span className="text-indigo-400">Node</span></h1>
             <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Neo4j Powered Semantic Graph</p>
           </div>
        </div>

        <div className="flex-1 max-w-xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text" 
            placeholder="Search concepts..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/5 px-1 py-1 rounded-xl flex gap-1 border border-white/5">
             <button 
               onClick={() => setMode('semantic')}
               className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${mode === 'semantic' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <Layers size={12}/> Semantic
             </button>
             <button 
               onClick={() => setMode('lexical')}
               className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${mode === 'lexical' ? 'bg-emerald-600 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
             >
               <ArrowRightLeft size={12}/> Lexical
             </button>
          </div>
          <button className="px-4 py-2 bg-indigo-600/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-sm font-bold hover:bg-indigo-500/20 transition-all flex items-center gap-2">
             <Share2 size={14}/> Export
          </button>
        </div>
      </header>

      <main className="flex-1 relative">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeColor={n => n.color}
          nodeVal={n => n.val}
          linkColor={l => l.type === 'alignment' ? '#34d399' : 'rgba(255,255,255,0.05)'}
          linkWidth={l => l.type === 'alignment' ? 3 : 1}
          linkLineDash={l => l.type === 'sense' && !l.isPrimary ? [2, 4] : []}
          onNodeHover={setHoverNode}
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.name;
            const fontSize = (node.type === 'concept' ? 14 : 10) / globalScale;
            ctx.font = `${fontSize}px Outfit`;
            
            // Glow
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.val/globalScale + 2, 0, 2 * Math.PI, false);
            ctx.fillStyle = node.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = node.color;
            ctx.fill();

            // Label
            ctx.shadowBlur = 0;
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(label, node.x, node.y + (node.val/globalScale + 6));

            if (node === hoverNode) {
               ctx.beginPath();
               ctx.arc(node.x, node.y, (node.val/globalScale + 4), 0, 2 * Math.PI, false);
               ctx.strokeStyle = '#fff';
               ctx.lineWidth = 1/globalScale;
               ctx.stroke();
            }
          }}
          backgroundColor="rgba(0,0,0,0)"
        />

        {/* Info Overlay */}
        {hoverNode && (
          <div className="absolute top-4 left-4 glass p-6 rounded-2xl w-80 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
             <div className="flex justify-between mb-4">
                <span className="text-[9px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-md border border-indigo-400/20">{hoverNode.type}</span>
                {hoverNode.lang && <span className="text-xl grayscale opacity-50">{hoverNode.lang === 'zh' ? '🇨🇳' : hoverNode.lang === 'en' ? '🇺🇸' : hoverNode.lang === 'jp' ? '🇯🇵' : hoverNode.lang === 'kr' ? '🇰🇷' : hoverNode.lang === 'fr' ? '🇫🇷' : '🇹🇭'}</span>}
             </div>
             <h2 className="text-2xl font-bold mb-1 font-outfit">{hoverNode.name}</h2>
             {hoverNode.pronunciation && <p className="text-indigo-300 font-mono text-xs mb-4">/ {hoverNode.pronunciation} /</p>}
             {hoverNode.nuance && (
               <div className="text-xs text-slate-400 leading-relaxed border-t border-white/5 pt-4 italic">
                 "{hoverNode.nuance}"
               </div>
             )}
          </div>
        )}

        <div className="absolute bottom-6 left-6 glass p-4 rounded-xl border border-white/5">
           <h3 className="text-[9px] font-black text-slate-500 uppercase mb-3">Legend</h3>
           <div className="space-y-2">
              <LegendItem color="#6366f1" label="Concept" />
              <LegendItem color="#f87171" label="ZH" />
              <LegendItem color="#60a5fa" label="EN" />
              <LegendItem color="#fb7185" label="JP (かな)" />
              <LegendItem color="#22d3ee" label="KR" />
              <LegendItem color="#a78bfa" label="FR" />
              <LegendItem color="#fbbf24" label="TH" />
           </div>
        </div>

        <button 
           onClick={() => graphRef.current.zoomToFit(400)}
           className="absolute bottom-6 right-6 p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all text-slate-400"
        >
          <Maximize2 size={24}/>
        </button>
      </main>
    </div>
  );
}

function LegendItem({ color, label }: { color: string, label: string }) {
  return (
    <div className="flex items-center gap-2">
       <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }}></div>
       <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
    </div>
  )
}
