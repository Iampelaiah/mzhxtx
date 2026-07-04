import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  Send, 
  CheckCircle, 
  ShieldAlert, 
  Terminal, 
  Cpu, 
  Layers 
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'provider' | 'system';
  text: string;
  timestamp: string;
}

interface ChatThread {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  verified: boolean;
  status: string;
  messages: Message[];
}

export default function Chats() {
  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 'thread-elias',
      name: 'Elias Vance',
      specialty: 'Industrial Electrical',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmHdClsbCcmiAiYF97p0kpoRQoGoyl8seUmmFCr1B3OTT7Ic-1byRVqKEOcKsPGJ0zxHGgHZ-9vkuYocMhr-1JzkFytaU4kUd0wSHIbCle735Tngcsr3QXnj4WrVhVEsDnKOa8DcjBSSWjJy3m6BInf8S6Z5eJMLsI7vY92BtDfkn8hq0ntJosLoccyCpK-zf_jE-2kbc8xFH_A4KkeTIHF1bGbVVgb1ETG9_kKfjc2gU_jQAN7BJzdf4Jj_9f9c-3lTa_sHvTFo_J',
      verified: true,
      status: 'ONLINE // ESCROW COMPLIANT',
      messages: [
        { id: '1', sender: 'system', text: 'Secure multi-sig escrow session initialized for TX-9824-A.', timestamp: 'Yesterday • 10:42 AM' },
        { id: '2', sender: 'provider', text: 'Hey Aditya, I have deployed the primary wire conduits and physical rack configurations for phase 1.', timestamp: 'Yesterday • 11:05 AM' },
        { id: '3', sender: 'user', text: 'Excellent progress, Elias. Are the blue color-coded Ethernet trunks securely bundled and terminated?', timestamp: 'Yesterday • 11:15 AM' },
        { id: '4', sender: 'provider', text: 'Yes, fully bundled and organized. I just uploaded three cryptographic proofs of work directly to the escrow tracker. Please review the visual states and verify when you can.', timestamp: 'Today • 09:12 AM' }
      ]
    },
    {
      id: 'thread-sarah',
      name: 'Sarah Jenkins',
      specialty: 'Fiber Optics & Cabling',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGVmtObE-uEVQzyQRXW6demQcYeeFRoOQs7ljgoeFO1MwTPD4aR_qjCw0cwP-xsvX6cey07QFbg2XOv_1V7ronSt_XspUGu8tAD-napYCDq4kduVQiWGK_QWqkz5XYZopsUmTjtWCCrnYQujIFjx7D-vrvIMeBTCZSrNQPzLbSa8n9bDj_QBCTFLZtLfr9wKeNCSk1BmzlHaJduw4lMyvxJa11RXK_SVJPyUpBxT7hHPZY0P-TLf-eftkyVCZUDxM4JTL9S0DOzHGs',
      verified: true,
      status: 'OFFLINE // LEDGER IDLE',
      messages: [
        { id: '1', sender: 'system', text: 'Escrow communication channel established with verified identity SARAH_JENKINS_NODE_3.', timestamp: '2 days ago' },
        { id: '2', sender: 'provider', text: 'Initial site survey is complete. Fiber backhaul lines are in place. Waiting for structural engineering to clear the conduit access.', timestamp: '2 days ago' },
        { id: '3', sender: 'user', text: 'Understood. Keep me posted on any delay.', timestamp: 'Yesterday' }
      ]
    },
    {
      id: 'thread-bot',
      name: 'Gikspot Escrow Consensus',
      specialty: 'Protocol Agent',
      avatar: '',
      verified: true,
      status: 'SYSTEM // SHIELDED NODE',
      messages: [
        { id: '1', sender: 'system', text: 'Consensus engine listening on cluster 0x8A...3F92.', timestamp: '3 days ago' },
        { id: '2', sender: 'system', text: 'Alert: Escrow funds totaling $12,450.00 USDC securely locked across 3 active vaults.', timestamp: '2 days ago' },
        { id: '3', sender: 'system', text: 'Notification: Elias Vance has submitted proofs of work for evaluation.', timestamp: 'Today • 09:13 AM' }
      ]
    }
  ]);

  const [activeThreadId, setActiveThreadId] = useState<string>('thread-elias');
  const [inputText, setInputText] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeThread = threads.find(t => t.id === activeThreadId) || threads[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: inputText,
      timestamp: 'Today • Just now'
    };

    setThreads(prev => prev.map(thread => {
      if (thread.id === activeThreadId) {
        return {
          ...thread,
          messages: [...thread.messages, newMessage]
        };
      }
      return thread;
    }));

    setInputText('');

    // Simulate automated response from Elias
    if (activeThreadId === 'thread-elias') {
      setTimeout(() => {
        const reply: Message = {
          id: `msg-reply-${Date.now()}`,
          sender: 'provider',
          text: "Copy that. Let me know if you need any adjustments to the fiber patches or physical cable alignments.",
          timestamp: 'Today • Just now'
        };
        setThreads(p => p.map(t => t.id === 'thread-elias' ? { ...t, messages: [...t.messages, reply] } : t));
      }, 1500);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread.messages]);

  return (
    <div className="flex flex-col gap-6 animate-fade-in max-w-5xl mx-auto h-[calc(100vh-180px)] select-none">
      <div>
        <h1 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tight">Consensus Intercom</h1>
        <p className="font-sans text-xs text-white/50 uppercase tracking-wider mt-1">
          Cryptographically signed, peer-to-peer workspace communications.
        </p>
      </div>

      <div className="flex-1 bg-neutral-950 border border-white/10 rounded-xl overflow-hidden flex flex-col md:flex-row">
        
        {/* Threads sidebar */}
        <div className="w-full md:w-80 border-r border-white/10 flex flex-col shrink-0 bg-black/40">
          <div className="p-4 border-b border-white/10 bg-black/60 flex items-center justify-between">
            <span className="font-mono text-[9px] text-white/40 font-black uppercase tracking-widest">Active Channels</span>
            <span className="bg-white/10 border border-white/20 text-white font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-wider">
              {threads.length} NODE(S)
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1.5 scrollbar-hide">
            {threads.map((thread) => {
              const isActive = thread.id === activeThreadId;
              const lastMsg = thread.messages[thread.messages.length - 1];

              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full text-left p-3 rounded flex items-center gap-3 transition-all border ${
                    isActive 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-white border-transparent hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="relative shrink-0">
                    {thread.avatar ? (
                      <img 
                        src={thread.avatar} 
                        alt={thread.name} 
                        className={`w-9 h-9 rounded object-cover border ${isActive ? 'border-black/20' : 'border-white/20'}`}
                      />
                    ) : (
                      <div className={`w-9 h-9 rounded flex items-center justify-center border ${
                        isActive ? 'bg-black text-white border-black' : 'bg-neutral-900 text-white border-white/10'
                      }`}>
                        <Cpu size={16} />
                      </div>
                    )}
                    {thread.verified && (
                      <div className={`absolute -bottom-1 -right-1 p-0.5 rounded-full border ${
                        isActive ? 'bg-black text-white border-white' : 'bg-white text-black border-black'
                      }`}>
                        <CheckCircle size={8} className="fill-current" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-sans font-black text-xs uppercase tracking-tight truncate leading-tight">
                        {thread.name}
                      </h4>
                    </div>
                    <p className={`font-mono text-[9px] mt-0.5 uppercase tracking-wider ${isActive ? 'text-black/60' : 'text-white/40'}`}>
                      {thread.specialty}
                    </p>
                    {lastMsg && (
                      <p className={`text-[10px] mt-1.5 truncate ${isActive ? 'text-black/70 font-medium' : 'text-white/50'}`}>
                        {lastMsg.sender === 'user' ? 'You: ' : ''}{lastMsg.text}
                      </p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Message body */}
        <div className="flex-1 flex flex-col bg-black/10">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-white/10 bg-black/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider">
                  {activeThread.name}
                </h3>
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest flex items-center gap-1.5 mt-1 font-bold">
                  <span className={`w-1.5 h-1.5 rounded-full ${activeThread.status.includes('ONLINE') ? 'bg-white animate-pulse' : 'bg-white/20'}`}></span>
                  {activeThread.status}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden md:inline-block font-mono text-[8px] text-white/40 uppercase tracking-widest font-black border border-white/10 px-2.5 py-1 rounded">
                SHA-256 ENCRYPTED
              </span>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
            {activeThread.messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isSystem = msg.sender === 'system';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex items-center justify-center my-2 animate-fade-in">
                    <div className="bg-neutral-900 border border-white/5 text-[9px] font-mono text-white/60 px-4 py-1.5 rounded flex items-center gap-2 uppercase tracking-wider">
                      <Terminal size={10} className="text-white/50" />
                      <span>{msg.text}</span>
                      <span className="text-[8px] opacity-40 ml-2">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div 
                  key={msg.id} 
                  className={`flex gap-3 max-w-[80%] ${isUser ? 'self-end flex-row-reverse' : 'self-start'}`}
                >
                  <div className={`w-7 h-7 rounded flex items-center justify-center border shrink-0 text-xs font-black ${
                    isUser 
                      ? 'bg-white text-black border-white' 
                      : 'bg-neutral-900 text-white border-white/15'
                  }`}>
                    {isUser ? 'A' : activeThread.name.slice(0, 1)}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className={`p-3 rounded text-xs leading-relaxed ${
                      isUser 
                        ? 'bg-white text-black font-medium rounded-tr-none' 
                        : 'bg-neutral-900 text-white border border-white/10 rounded-tl-none'
                    }`}>
                      {msg.text}
                    </div>
                    <span className={`font-mono text-[8px] uppercase tracking-wider opacity-40 mt-0.5 ${isUser ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Send form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-white/10 bg-black/60 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Inject secure message..."
              className="flex-1 bg-neutral-950 border border-white/10 focus:border-white rounded px-4 py-3 text-xs text-white placeholder-white/25 focus:outline-none focus:bg-neutral-950 transition-all font-medium"
            />
            <button
              type="submit"
              className="px-5 py-3 bg-white hover:bg-neutral-200 active:scale-95 text-black rounded font-mono text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Transmit</span>
              <Send size={11} />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
