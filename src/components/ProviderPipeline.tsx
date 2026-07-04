import React from 'react';
import { 
  Play, 
  Check, 
  X, 
  Terminal, 
  HelpCircle, 
  AlertCircle, 
  Network, 
  Zap,
  PhoneCall
} from 'lucide-react';
import { ClientSession } from '../types';

interface ProviderPipelineProps {
  sessions: ClientSession[];
  onAcceptSession: (sessionId: string) => void;
  onDeclineSession: (sessionId: string) => void;
  onLaunchAgora: (sessionId: string) => void;
  onJoinSession: (sessionId: string) => void;
}

export default function ProviderPipeline({
  sessions,
  onAcceptSession,
  onDeclineSession,
  onLaunchAgora,
  onJoinSession
}: ProviderPipelineProps) {
  const pendingRequests = sessions.filter(s => s.status === 'Pending');
  const activeEngagements = sessions.filter(s => s.status === 'Active' || s.status === 'In_Progress');
  const disputedEngagements = sessions.filter(s => s.status === 'Disputed');

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-5xl mx-auto select-none">
      <div>
        <h1 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tight">Fulfillment Request Pipeline</h1>
        <p className="font-sans text-xs text-white/50 uppercase tracking-wider mt-1">
          Review client intake forms, audit trust metrics, and deploy Agora RTC workspace sessions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Intake Forms & Requests Queue */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
            <Network size={16} className="text-white/40" />
            <span>Incoming Client Intake Requests ({pendingRequests.length})</span>
          </h2>

          <div className="flex flex-col gap-4">
            {pendingRequests.length === 0 ? (
              <div className="bg-neutral-950 border border-dashed border-white/20 rounded-xl p-8 text-center flex flex-col items-center gap-3">
                <Terminal size={24} className="text-white/40" />
                <p className="font-sans text-xs text-white/50 uppercase tracking-wider font-bold">No pending client requests found.</p>
                <span className="text-[10px] text-white/30 font-mono leading-relaxed max-w-xs">
                  Active nodes periodically listen to cluster channels. Direct bookings from the client discovery map appear here.
                </span>
              </div>
            ) : (
              pendingRequests.map((req) => (
                <div 
                  key={req.id} 
                  className="bg-neutral-950 border border-white/15 rounded-xl p-5 relative overflow-hidden flex flex-col gap-4 hover:border-white/30 transition-all"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-amber-500"></div>

                  {/* Header info */}
                  <div className="flex justify-between items-start gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={req.clientAvatar} 
                        alt={req.clientName} 
                        className="w-10 h-10 rounded-full border border-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight">{req.clientName}</h3>
                          <span className={`text-[7px] font-mono font-black px-1.5 py-0.5 rounded border uppercase tracking-widest ${
                            req.intake.priority === 'high' 
                              ? 'bg-rose-950/50 text-rose-400 border-rose-800/30' 
                              : 'bg-white/10 text-white border-white/20'
                          }`}>
                            {req.intake.priority} Priority
                          </span>
                        </div>
                        <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-0.5">VAULT_LOCK // {req.id}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono text-sm font-black text-white">${req.amount} USDC</span>
                      <span className="font-mono text-[8px] text-white/40 block uppercase tracking-widest font-black">escrow secure</span>
                    </div>
                  </div>

                  {/* Client Intake form data */}
                  <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex flex-col gap-2">
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Client Intake Form Summary</span>
                    <div>
                      <span className="font-mono text-[9px] text-white/30 block uppercase tracking-wider">Target Location Coordinates:</span>
                      <span className="font-sans text-xs text-white font-bold uppercase">{req.intake.targetLocation}</span>
                    </div>
                    <div className="mt-2">
                      <span className="font-mono text-[9px] text-white/30 block uppercase tracking-wider">Operational Notes:</span>
                      <span className="font-sans text-xs text-white/80 leading-relaxed font-medium">{req.intake.notes}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-1">
                    <button 
                      onClick={() => onAcceptSession(req.id)}
                      className="flex-1 bg-white hover:bg-neutral-200 text-black font-mono text-[9px] font-black uppercase tracking-widest py-2.5 rounded flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <Check size={12} />
                      <span>Accept Contract</span>
                    </button>
                    <button 
                      onClick={() => onDeclineSession(req.id)}
                      className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[9px] font-black uppercase tracking-widest py-2.5 px-4 rounded transition-all cursor-pointer"
                    >
                      <X size={12} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Active Engagements Pipeline & Disputes */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
            <Zap size={16} className="text-white/40" />
            <span>Fulfillment Pipeline ({activeEngagements.length})</span>
          </h2>

          <div className="flex flex-col gap-4">
            {activeEngagements.length === 0 ? (
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider text-center py-6 bg-neutral-950 rounded-xl border border-white/15">
                No active operational engagements.
              </p>
            ) : (
              activeEngagements.map((eng) => (
                <div 
                  key={eng.id} 
                  className="bg-neutral-950 border border-white/15 rounded-xl p-4.5 flex flex-col gap-3 transition-all hover:border-white/20"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-sans font-black text-xs text-white uppercase tracking-tight">{eng.tierName}</h4>
                      <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">Client: {eng.clientName}</span>
                    </div>

                    <span className={`text-[8px] font-mono font-bold px-2 py-0.5 rounded border uppercase tracking-wider shrink-0 ${
                      eng.status === 'Active' 
                        ? 'bg-blue-950/40 text-blue-300 border-blue-800/30' 
                        : 'bg-white text-black border-white animate-pulse'
                    }`}>
                      {eng.status}
                    </span>
                  </div>

                  <div className="mt-2">
                    {eng.status === 'Active' ? (
                      <button 
                        onClick={() => onLaunchAgora(eng.id)}
                        className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-[9px] font-black uppercase tracking-widest py-3 rounded flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <PhoneCall size={12} />
                        <span>Launch Agora Gateway</span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => onJoinSession(eng.id)}
                        className="w-full bg-white text-black font-mono text-[9px] font-black uppercase tracking-widest py-3 rounded flex items-center justify-center gap-1.5 animate-bounce cursor-pointer"
                      >
                        <Play size={12} className="fill-current" />
                        <span>Enter Workspace Room</span>
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Active Disputes section */}
          {disputedEngagements.length > 0 && (
            <div className="mt-6 flex flex-col gap-4">
              <h2 className="font-sans font-black text-sm text-rose-400 uppercase tracking-tight flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-500" />
                <span>Active Disputes ({disputedEngagements.length})</span>
              </h2>

              <div className="flex flex-col gap-3">
                {disputedEngagements.map((eng) => (
                  <div key={eng.id} className="bg-rose-950/10 border border-rose-800/40 p-4 rounded-xl flex flex-col gap-2">
                    <div className="flex justify-between">
                      <span className="font-sans font-bold text-xs text-rose-200 uppercase tracking-wider">{eng.tierName}</span>
                      <span className="font-mono text-xs font-black text-rose-300">${eng.amount} USDC</span>
                    </div>
                    <span className="font-sans text-[10px] text-rose-200/50">Funds are temporarily locked in high-stasis escrow. Gikspot consensus engine is waiting for resolution metadata.</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
