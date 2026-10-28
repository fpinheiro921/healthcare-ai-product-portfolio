import React, { useState, useRef, useEffect } from 'react';
import { Send, Stethoscope, Trash2 } from 'lucide-react';
import { chatWithNurseAI, checkLLMStatus } from '../services/geminiService';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

interface Props {
    nurseName: string;
    specialty: string;
}

const STORAGE_KEY = 'heartguide-chat-history';
const MAX_STORED_MESSAGES = 50;

const EMERGENCY_PATTERNS = [
    'chest pain', 'chest pressure', 'crushing pain', "can't breathe", 'cant breathe',
    'cannot breathe', 'heart attack', 'unconscious', 'call 911', 'choking',
    'passing out', 'fainted', 'suicide', 'kill myself', 'overdose',
];
const EMERGENCY_RESPONSE = 'This sounds like it could be an emergency. If you are experiencing chest pain, severe shortness of breath, or feel you may pass out, call 911 immediately. Do not wait for a reply here.';

function detectEmergency(text: string): string | null {
    const lower = text.toLowerCase();
    return EMERGENCY_PATTERNS.some(p => lower.includes(p)) ? EMERGENCY_RESPONSE : null;
}

function loadMessages(fallback: Message): Message[] {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return [fallback];
        const parsed = JSON.parse(raw) as Array<Omit<Message, 'timestamp'> & { timestamp: string }>;
        if (!Array.isArray(parsed) || parsed.length === 0) return [fallback];
        return parsed.map(m => ({ ...m, timestamp: new Date(m.timestamp) }));
    } catch {
        return [fallback];
    }
}

const AIChatInterface: React.FC<Props> = ({ nurseName, specialty }) => {
    const greeting: Message = {
        id: '1',
        role: 'assistant',
        content: `Hi! I'm ${nurseName}, your personal ${specialty} assistant. How are you feeling today?`,
        timestamp: new Date()
    };
    const [messages, setMessages] = useState<Message[]>(() => loadMessages(greeting));
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [aiOnline, setAiOnline] = useState<boolean | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED_MESSAGES)));
        } catch { /* storage full or unavailable */ }
    }, [messages, isTyping]);

    const refreshStatus = () => {
        checkLLMStatus().then(s => setAiOnline(s.online)).catch(() => setAiOnline(false));
    };

    useEffect(() => {
        refreshStatus();
    }, []);

    const pushAssistantMessage = (content: string) => {
        setMessages(prev => [...prev, {
            id: `${Date.now()}-ai`,
            role: 'assistant',
            content,
            timestamp: new Date()
        }]);
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            id: `${Date.now()}-user`,
            role: 'user',
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        const userText = input;
        setInput('');

        const emergency = detectEmergency(userText);
        if (emergency) {
            pushAssistantMessage(emergency);
            return;
        }

        setIsTyping(true);
        try {
            const aiResponse = await chatWithNurseAI(userText, 'Heart failure patient using daily check-in app');
            pushAssistantMessage(aiResponse);
        } catch (error) {
            pushAssistantMessage("I'm having trouble connecting right now. If this is urgent, please call your care provider.");
        } finally {
            setIsTyping(false);
            refreshStatus();
        }
    };

    const handleClear = () => {
        setMessages([{ ...greeting, id: `${Date.now()}-reset`, timestamp: new Date() }]);
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-b from-slate-50 to-white rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-white px-4 py-3 border-b border-slate-200 flex items-center gap-3 shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-full flex items-center justify-center shadow-sm">
                    <Stethoscope size={20} className="text-indigo-600" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm">Nurse {nurseName}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${aiOnline === false ? 'bg-slate-400' : 'bg-emerald-500 animate-pulse'}`} />
                        {specialty} · {aiOnline === false ? 'Offline' : 'Online now'}
                    </p>
                </div>
                <button
                    onClick={handleClear}
                    aria-label="Clear conversation"
                    title="Clear conversation"
                    className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin" role="log" aria-live="polite" aria-label="Conversation">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                    >
                        <div className={`max-w-[80%] ${msg.role === 'user' ? 'text-right' : ''}`}>
                            <div
                                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed text-left ${
                                    msg.role === 'user'
                                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-br-md shadow-md shadow-indigo-600/20'
                                        : 'bg-white text-slate-700 border border-slate-200 rounded-bl-md shadow-sm'
                                }`}
                            >
                                {msg.content}
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1 px-1">
                                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="bg-white border-t border-slate-200 p-3">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your message..."
                        aria-label="Message input"
                        className="flex-1 bg-slate-100 text-slate-800 text-sm rounded-full px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:bg-white transition-all duration-200"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!input.trim() || isTyping}
                        aria-label="Send message"
                        className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white p-2.5 rounded-full hover:shadow-lg hover:shadow-indigo-600/30 transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed shadow-md active:scale-90"
                    >
                        <Send size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChatInterface;
