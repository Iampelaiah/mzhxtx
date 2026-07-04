import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Save, 
  ShieldAlert, 
  CheckSquare, 
  Radio, 
  Volume2, 
  VolumeX, 
  LogOut, 
  Award, 
  Network,
  CheckCircle,
  FileText
} from 'lucide-react';
import { ClientSession } from '../types';

interface AgoraRTCWorkspaceProps {
  session: ClientSession;
  portalMode: 'client' | 'provider';
  onClose: () => void;
  onUpdateSessionStatus: (sessionId: string, status: 'Completed' | 'Disputed') => void;
}

export default function AgoraRTCWorkspace({
  session,
  portalMode,
  onClose,
  onUpdateSessionStatus
}: AgoraRTCWorkspaceProps) {
  const [micActive, setMicActive] = useState(true);
  const [videoActive, setVideoActive] = useState(true);
  const [speakerActive, setSpeakerActive] = useState(true);
  const [notesText, setNotesText] = useState(session.notes || '');
  const [isSaved, setIsSaved] = useState(false);
  const [fulfillmentRequestSent, setFulfillmentRequestSent] = useState(false);

  // Checklist states for provider
  const [checklist, setChecklist] = useState([
    { id: '1', text: 'Analyze physical conduit boundaries', done: false },
    { id: '2', text: 'Verify redundant power supply configurations', done: false },
    { id: '3', text: 'Structure cables cleanly into patch panels', done: false },
    { id: '4', text: 'Conduct network traffic latency test', done: false }
  ]);

  const toggleCheck = (id: string) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const handleSaveNotes = () => {
    session.notes = notesText;
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const handleFulfillmentRequest = () => {
    setFulfillmentRequestSent(true);
  };

  const handleApproveRelease = () => {
    // Release funds!
    onUpdateSessionStatus(session.id, 'Completed');
  };

  const handleDispute = () => {
    onUpdateSessionStatus(session.id, 'Disputed');
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/98 backdrop-blur-md flex flex-col text-white select-none animate-fade-in">
      
      {/* Top bar */}
      <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-black">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <h2 className="font-sans font-black text-xs uppercase tracking-wider text-white">
              Agora Secure RTC Gateway // {session.agoraChannelId}
            </h2>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-0.5">
              Role: {portalMode === 'client' ? 'Client Interface' : 'Provider Interface'} // Peer: {portalMode === 'client' ? session.providerName : session.clientName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block font-mono text-[8px] border border-white/10 px-2 py-1 rounded bg-white/5 text-white/50 uppercase tracking-widest font-bold">
            LATENCY: 12ms // BANDWIDTH: 4.8MBPS // CH-ID: {session.id}
          </span>
          <button 
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded border border-white/10 flex items-center gap-1.5 font-mono text-[9px] font-black uppercase tracking-wider transition-colors"
          >
            <LogOut size={12} />
            <span>Close Room</span>
          </button>
        </div>
      </div>

      {/* Main body: split workspace */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        
        {/* Left Side: Clean, High-integrity Live Streams Area */}
        <div className="flex-1 bg-black p-6 flex flex-col justify-between overflow-y-auto">
          
          {/* Streams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 items-center justify-center max-w-4xl mx-auto w-full">
            
            {/* Local participant */}
            <div className="aspect-video bg-neutral-900 border border-white/15 rounded-2xl relative overflow-hidden flex items-center justify-center group shadow-priority">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-white opacity-40"></div>
              
              {videoActive ? (
                <div className="absolute inset-0 flex flex-col justify-between p-4">
                  <div className="self-end bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded font-mono text-[8px] uppercase tracking-widest text-white/80 font-bold">
                    Camera Active
                  </div>
                  
                  {/* Visualizer elements simulating live feed */}
                  <div className="flex-1 flex items-center justify-center">
                    <div className="flex items-end gap-1.5 h-12">
                      <div className="w-1.5 bg-white/30 h-4 animate-pulse duration-700 rounded-full" />
                      <div className="w-1.5 bg-white/50 h-8 animate-pulse duration-1000 rounded-full" />
                      <div className="w-1.5 bg-white h-12 animate-pulse duration-500 rounded-full" />
                      <div className="w-1.5 bg-white/50 h-6 animate-pulse duration-800 rounded-full" />
                      <div className="w-1.5 bg-white/30 h-3 animate-pulse duration-600 rounded-full" />
                    </div>
                  </div>

                  <span className="font-sans font-black text-[10px] text-white uppercase tracking-wider leading-none">
                    You ({portalMode === 'client' ? 'Aditya Sheral' : 'Elias Vance'})
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-neutral-950 border border-white/10 flex items-center justify-center">
                    <VideoOff size={24} className="text-white/30" />
                  </div>
                  <span className="font-sans font-black text-xs text-white/50 uppercase tracking-widest">Feed Muted</span>
                </div>
              )}
            </div>

            {/* Remote Peer */}
            <div className="aspect-video bg-neutral-900 border border-white/15 rounded-2xl relative overflow-hidden flex items-center justify-center group shadow-priority">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-white"></div>
              
              <div className="absolute inset-0 flex flex-col justify-between p-4">
                <div className="self-end bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded font-mono text-[8px] uppercase tracking-widest text-white/80 font-bold">
                  Peer Connection Stable
                </div>
                
                {/* Visualizer elements simulating remote feed */}
                <div className="flex-1 flex items-center justify-center">
                  <div className="relative">
                    <img 
                      src={portalMode === 'client' ? session.providerAvatar : session.clientAvatar} 
                      alt="Peer Avatar" 
                      className="w-16 h-16 rounded-full border border-white/20 object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full border border-black">
                      <Radio size={8} className="text-black animate-pulse" />
                    </div>
                  </div>
                </div>

                <span className="font-sans font-black text-[10px] text-white uppercase tracking-wider leading-none">
                  {portalMode === 'client' ? session.providerName : session.clientName}
                </span>
              </div>
            </div>

          </div>

          {/* Device and calling control console */}
          <div className="bg-neutral-950/80 border border-white/15 rounded-2xl p-4 flex justify-between items-center max-w-xl mx-auto w-full shadow-ambient mt-6 shrink-0">
            <div className="flex gap-2">
              <button 
                onClick={() => setMicActive(!micActive)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  micActive 
                    ? 'bg-white/5 border-white/15 text-white hover:bg-white/10' 
                    : 'bg-rose-950 border-rose-800 text-rose-300'
                }`}
              >
                {micActive ? <Mic size={16} /> : <MicOff size={16} />}
              </button>
              <button 
                onClick={() => setVideoActive(!videoActive)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  videoActive 
                    ? 'bg-white/5 border-white/15 text-white hover:bg-white/10' 
                    : 'bg-rose-950 border-rose-800 text-rose-300'
                }`}
              >
                {videoActive ? <Video size={16} /> : <VideoOff size={16} />}
              </button>
              <button 
                onClick={() => setSpeakerActive(!speakerActive)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  speakerActive 
                    ? 'bg-white/5 border-white/15 text-white hover:bg-white/10' 
                    : 'bg-rose-950 border-rose-800 text-rose-300'
                }`}
              >
                {speakerActive ? <Volume2 size={16} /> : <VolumeX size={16} />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black hidden sm:inline">
                Secure stream protocol active
              </span>
              <button 
                onClick={onClose}
                className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-[9px] font-black uppercase tracking-widest px-4 py-2.5 rounded-lg cursor-pointer transition-all active:scale-95"
              >
                Disconnect
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Specialized Panels customized per portal */}
        {portalMode === 'client' ? (
          
          /* CLIENT PANEL: Room controls and upfront escrow status */
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-neutral-950 p-6 flex flex-col justify-between overflow-y-auto shrink-0">
            <div className="flex flex-col gap-6">
              
              {/* Escrow Lock visual Card */}
              <div className="bg-white/5 border border-white/15 rounded-2xl p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute top-0 left-0 w-[4px] h-full bg-white"></div>
                
                <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black block mb-2">Escrow Stasis</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-mono text-3xl font-black text-white">${session.amount}</span>
                  <span className="font-mono text-xs text-white/50 font-black">USDC Locked</span>
                </div>
                <span className="font-sans text-[9px] text-white/50 leading-relaxed block mt-2">
                  Locked in zero-trust vault. Funds will only release to provider Elias Vance upon your explicit authorization or completion.
                </span>
              </div>

              {/* Session Overview and credentials */}
              <div className="flex flex-col gap-3">
                <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Award size={14} className="text-white/40" />
                  <span>Verified Credentials Audit</span>
                </h3>
                <div className="bg-black border border-white/5 p-3.5 rounded-lg flex flex-col gap-1.5">
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/60 font-medium">Node Validation:</span>
                    <span className="text-white font-mono font-bold">ELIAS_V_NODE_3</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/60 font-medium">Fulfillment Rating:</span>
                    <span className="text-white font-mono font-bold">4.95 / 5.00</span>
                  </div>
                  <div className="flex justify-between text-[10px]">
                    <span className="text-white/60 font-medium">Identity Attestation:</span>
                    <span className="text-white font-mono font-bold">SHA-256 COMPLIANT</span>
                  </div>
                </div>
              </div>

              {/* Simulated real-time triggers and prompts */}
              {fulfillmentRequestSent ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4.5 flex flex-col gap-3 text-emerald-300 animate-pulse">
                  <div className="flex gap-2">
                    <CheckCircle size={14} className="shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-sans font-black text-xs uppercase tracking-wider text-white">Fulfillment Declared!</h4>
                      <p className="text-[10px] text-emerald-200/70 mt-1 leading-relaxed">
                        Elias Vance has finished organizing Phase 1 structured cabling. He is requesting release of locked funds.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-white/40 text-[10px] text-center italic font-medium leading-relaxed">
                  Waiting for provider to complete the session parameters. You can release or raise a dispute at any point below.
                </div>
              )}
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-3 mt-6">
              <button 
                onClick={handleApproveRelease}
                className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
              >
                <CheckCircle size={14} />
                <span>Authorize Escrow Release</span>
              </button>
              <button 
                onClick={handleDispute}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-rose-400 hover:text-rose-300 hover:border-rose-800/40 py-3 rounded-lg font-mono text-[9px] font-black uppercase tracking-widest transition-colors cursor-pointer"
              >
                <ShieldAlert size={12} className="inline mr-1" />
                <span>Raise Ledger Dispute</span>
              </button>
            </div>

          </div>
        ) : (
          
          /* PROVIDER PANEL: Note taking board and inline checklist tracker */
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-white/10 bg-neutral-950 p-6 flex flex-col justify-between overflow-y-auto shrink-0">
            <div className="flex flex-col gap-6">
              
              {/* Checklist fulfillment tracker */}
              <div className="flex flex-col gap-3">
                <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider flex items-center gap-2">
                  <CheckSquare size={14} className="text-white/40" />
                  <span>Fulfillment Checklist</span>
                </h3>
                
                <div className="flex flex-col gap-2">
                  {checklist.map(item => (
                    <button 
                      key={item.id}
                      onClick={() => toggleCheck(item.id)}
                      className={`text-left p-3 rounded-lg border text-xs flex gap-3 transition-all cursor-pointer ${
                        item.done 
                          ? 'bg-white/5 border-white/20 text-white line-through' 
                          : 'bg-transparent border-white/5 text-white/60 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                        item.done ? 'bg-white border-white text-black' : 'border-white/20 bg-neutral-950'
                      }`}>
                        {item.done && <CheckCircle size={10} className="stroke-[3]" />}
                      </div>
                      <span className="font-medium">{item.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Inline client notes board */}
              <div className="flex flex-col gap-2">
                <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText size={14} className="text-white/40" />
                    <span>Inline Session Notes</span>
                  </div>
                  {isSaved && <span className="font-mono text-[8px] text-green-400 uppercase tracking-widest">SAVED</span>}
                </h3>
                <textarea 
                  value={notesText}
                  onChange={(e) => setNotesText(e.target.value)}
                  placeholder="Record real-time site insights or cable codes..."
                  className="w-full h-32 bg-neutral-900 border border-white/10 rounded-lg p-3 text-xs text-white placeholder-white/25 focus:outline-none focus:border-white focus:bg-neutral-950 leading-relaxed transition-all resize-none"
                />
                <button 
                  onClick={handleSaveNotes}
                  className="self-end bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Save size={10} />
                  <span>Save Session Note</span>
                </button>
              </div>

            </div>

            {/* Action buttons */}
            <div className="mt-6">
              {fulfillmentRequestSent ? (
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-lg text-[10px] font-mono text-white/50 text-center uppercase tracking-wider">
                  Fulfillment notification broadcasted to Aditya Sheral
                </div>
              ) : (
                <button 
                  onClick={handleFulfillmentRequest}
                  className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-widest py-3.5 rounded-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md active:scale-95"
                >
                  <Award size={14} />
                  <span>Declare Fulfillment & Ask Payout</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
