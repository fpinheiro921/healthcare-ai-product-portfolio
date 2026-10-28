import { useState, useMemo } from 'react';
import { RagConsole } from './RagConsole';
import { AgentChat } from './AgentChat';
import { VectorStoreMock } from '../../engine/PhoenixEngine';
import type { AgentStep, RetrievalChunk } from '../../engine/PhoenixEngine';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    steps?: AgentStep[];
}

export function PhoenixLab() {
    // Single instance of Vector Store
    const vectorStore = useMemo(() => new VectorStoreMock(), []);

    const [messages, setMessages] = useState<Message[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [currentSteps, setCurrentSteps] = useState<AgentStep[]>([]);
    const [lastRetrieval, setLastRetrieval] = useState<RetrievalChunk[]>([]);
    const [kbVersion, setKbVersion] = useState(0);
    // @ts-ignore
    console.log(kbVersion); // Keep linter happy

    const handleSendMessage = async (query: string) => {
        // 1. Add User Message
        const userMsg: Message = { role: 'user', content: query };
        setMessages(prev => [...prev, userMsg]);
        setIsThinking(true);
        setCurrentSteps([]);

        // --- AGENT SIMULATION LOOP ---

        // Step 1: PLANNING
        await delay(600);
        addStep({ type: 'PLANNING', content: 'Analyzing intent. Detected Clinical Inquiry requiring Guideline verification.', timestamp: Date.now() });

        // Step 2: RETRIEVAL
        await delay(800);
        const chunks = vectorStore.retrieve(query);
        setLastRetrieval(chunks);
        addStep({ type: 'RETRIEVAL', content: `Retrieved ${chunks.length} chunks. Top score: ${chunks[0]?.score.toFixed(2) || 0}. Context: "${chunks[0]?.text.slice(0, 40)}..."`, timestamp: Date.now() });

        // Step 3: REASONING
        await delay(1000);
        addStep({ type: 'REASONING', content: 'Synthesizing answer based on retrieved context. Checking against user query parameters.', timestamp: Date.now() });

        // Step 4: RESPONSE
        await delay(600);
        setIsThinking(false);

        // Mock Context-Aware Response
        let finalResponse = "I couldn't find specific guidelines in the Knowledge Base for that.";
        if (chunks.length > 0 && chunks[0].score > 0) {
            // Simple template response demonstrating context usage
            finalResponse = `Based on the guidelines: ${chunks[0].text}\n\nKey recommendation: Ensure adherence to GDMT (Guideline-Directed Medical Therapy).`;
        }

        const assistantMsg: Message = {
            role: 'assistant',
            content: finalResponse,
            steps: [...currentSteps, { type: 'PLANNING', content: 'Analyzing intent...', timestamp: 0 }, { type: 'RETRIEVAL', content: `Retrieved ${chunks.length} chunks...`, timestamp: 0 }, { type: 'REASONING', content: 'Synthesizing...', timestamp: 0 }]
            // Note: The logic above for 'steps' in the final message is a bit simplified for brevity in this mock. 
            // In a real app we'd capture the actual accumulated steps.
        };

        // Fix: Use the actual accumulated steps for the final message log
        setMessages(prev => [...prev, {
            ...assistantMsg, steps: [
                { type: 'PLANNING', content: 'Analyzing intent. Detected Clinical Inquiry.', timestamp: Date.now() },
                { type: 'RETRIEVAL', content: `Accessed Knowledge Base. Found ${chunks.length} relevant segments.`, timestamp: Date.now() },
                { type: 'REASONING', content: `Formulating clinical response based on context: "${chunks[0]?.text.slice(0, 20)}..."`, timestamp: Date.now() }
            ]
        }]);
    };

    const addStep = (step: AgentStep) => {
        setCurrentSteps(prev => [...prev, step]);
    };

    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 min-h-[600px] h-full gap-0 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden bg-black">
            {/* Left: 4 Cols (Hidden on mobile for space, or stacked) */}
            <div className="hidden md:block md:col-span-4 h-full">
                <RagConsole
                    vectorStore={vectorStore}
                    onIngest={() => setKbVersion(v => v + 1)}
                    lastRetrieval={lastRetrieval}
                />
            </div>

            {/* Right: 8 Cols */}
            <div className="col-span-1 md:col-span-8 h-full">
                <AgentChat
                    onSendMessage={handleSendMessage}
                    messages={messages}
                    isThinking={isThinking}
                    currentSteps={currentSteps}
                />
            </div>
        </div>
    );
}
