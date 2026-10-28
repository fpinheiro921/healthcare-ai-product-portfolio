import { useState, useRef, useEffect } from 'react';
import { Send, Cpu } from 'lucide-react';
import type { AgentStep } from '../../engine/PhoenixEngine';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    steps?: AgentStep[]; // Only for assistant
}

interface AgentChatProps {
    onSendMessage: (query: string) => Promise<void>;
    messages: Message[];
    isThinking: boolean;
    currentSteps: AgentStep[];
}

export function AgentChat({ onSendMessage, messages, isThinking, currentSteps }: AgentChatProps) {
    const [input, setInput] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentSteps]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isThinking) return;
        onSendMessage(input);
        setInput('');
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 rounded-r-2xl overflow-hidden relative border-l border-slate-800">
            {/* Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                        <Cpu size={18} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white leading-none">Phoenix Care</h3>
                        <span className="text-xs text-emerald-500 font-medium">● Online (Agentic Mode)</span>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-900">
                {messages.length === 0 && (
                    <div className="text-center mt-20 text-slate-500">
                        <p>Try asking: "What is the GDMT for HFrEF?"</p>
                    </div>
                )}

                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm p-4' : 'w-full'}`}>
                            {msg.role === 'user' ? (
                                msg.content
                            ) : (
                                <div className="space-y-4">
                                    {/* Chain of Thought Block */}
                                    {msg.steps && msg.steps.length > 0 && (
                                        <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm">
                                            <div className="bg-black/20 px-3 py-2 border-b border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                                <Cpu size={12} /> Chain of Thought
                                            </div>
                                            <div className="divide-y divide-slate-800">
                                                {msg.steps.map((step, sIdx) => (
                                                    <div key={sIdx} className="p-3 text-sm flex gap-3">
                                                        <div className="mt-0.5">
                                                            {step.type === 'PLANNING' && <span className="text-purple-400 font-mono text-xs">PLAN</span>}
                                                            {step.type === 'RETRIEVAL' && <span className="text-amber-400 font-mono text-xs">READ</span>}
                                                            {step.type === 'REASONING' && <span className="text-blue-400 font-mono text-xs">THINK</span>}
                                                        </div>
                                                        <div className="text-slate-400 flex-1 font-mono text-xs leading-relaxed">
                                                            {step.content}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Final Response */}
                                    <div className="bg-slate-800 p-4 rounded-2xl rounded-tl-sm shadow-sm border border-slate-700 text-white leading-relaxed">
                                        {msg.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {/* Real-time Thinking Indicator */}
                {isThinking && (
                    <div className="flex justify-start w-full">
                        <div className="w-full max-w-[85%] space-y-4">
                            {/* Active Steps */}
                            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-sm animate-pulse">
                                <div className="bg-black/20 px-3 py-2 border-b border-slate-800 flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider">
                                    <Cpu size={12} /> Processing...
                                </div>
                                <div className="divide-y divide-slate-800">
                                    {currentSteps.map((step, sIdx) => (
                                        <div key={sIdx} className="p-3 text-sm flex gap-3">
                                            <div className="mt-0.5">
                                                {step.type === 'PLANNING' && <span className="text-purple-400 font-mono text-xs">PLAN</span>}
                                                {step.type === 'RETRIEVAL' && <span className="text-amber-400 font-mono text-xs">READ</span>}
                                                {step.type === 'REASONING' && <span className="text-blue-400 font-mono text-xs">THINK</span>}
                                            </div>
                                            <div className="text-slate-400 flex-1 font-mono text-xs leading-relaxed">
                                                {step.content}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 bg-slate-950 border-t border-slate-800">
                <div className="flex items-center gap-2">
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isThinking ? "Agent is thinking..." : "Ask clinical question..."}
                        disabled={isThinking}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50 placeholder:text-slate-600"
                    />
                    <button
                        type="submit"
                        disabled={!input.trim() || isThinking}
                        className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </form>
        </div>
    );
}
