import { useState, useEffect } from 'react';
import { Database, FileText, Layers, RefreshCw } from 'lucide-react';
import { VectorStoreMock, DEFAULT_GUIDELINES } from '../../engine/PhoenixEngine';

interface RagConsoleProps {
    vectorStore: VectorStoreMock;
    onIngest: () => void;
    lastRetrieval: any[];
}

export function RagConsole({ vectorStore, onIngest, lastRetrieval }: RagConsoleProps) {
    const [inputText, setInputText] = useState(DEFAULT_GUIDELINES);
    const [stats, setStats] = useState({ totalChunks: 0 });
    const [isIngesting, setIsIngesting] = useState(false);

    // Initial ingestion
    useEffect(() => {
        handleIngest();
    }, []);

    const handleIngest = () => {
        setIsIngesting(true);
        setTimeout(() => {
            vectorStore.ingest(inputText);
            setStats(vectorStore.getStats());
            onIngest();
            setIsIngesting(false);
        }, 600); // Fake processing delay
    };

    return (
        <div className="flex flex-col h-full bg-slate-900 text-slate-300 rounded-l-2xl border-r border-slate-700 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-700 bg-slate-950 flex justify-between items-center">
                <div className="flex items-center gap-2 text-emerald-400">
                    <Database size={18} />
                    <span className="font-bold tracking-wider text-sm">VECTOR STORE (MOCK)</span>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                    {stats.totalChunks} CHUNKS INDEXED
                </div>
            </div>

            {/* Input Area */}
            <div className="flex-1 p-4 flex flex-col gap-4 overflow-hidden">
                <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-500 uppercase flex items-center gap-2">
                        <FileText size={14} /> Knowledge Base (Context)
                    </label>
                    <button
                        onClick={handleIngest}
                        disabled={isIngesting}
                        className="text-xs bg-slate-800 hover:bg-slate-700 text-white px-3 py-1 rounded border border-slate-600 flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                        <RefreshCw size={12} className={isIngesting ? "animate-spin" : ""} />
                        {isIngesting ? 'CHUNKING...' : 'RE-INDEX'}
                    </button>
                </div>
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-1/3 bg-slate-950/50 border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-400 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
                    placeholder="Paste clinical guidelines or protocol text here..."
                />

                {/* Visualizer */}
                <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-4 overflow-hidden relative">
                    <div className="absolute top-3 right-3 text-xs font-bold text-slate-600 flex items-center gap-1">
                        <Layers size={12} /> RETRIEVAL LOG
                    </div>

                    <div className="mt-6 space-y-3 overflow-y-auto h-full pb-8">
                        {lastRetrieval.length === 0 ? (
                            <div className="text-center mt-20 text-slate-700 italic text-sm">
                                Waiting for Agent Query...
                            </div>
                        ) : (
                            lastRetrieval.map((chunk, idx) => (
                                <div key={idx} className="bg-slate-900 border border-slate-700 p-3 rounded text-xs">
                                    <div className="flex justify-between mb-1">
                                        <span className="text-emerald-500 font-mono font-bold">TOP {idx + 1}</span>
                                        <span className="text-slate-500">Score: {chunk.score.toFixed(3)}</span>
                                    </div>
                                    <p className="text-slate-400 line-clamp-3 leading-relaxed">
                                        "{chunk.text}"
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
