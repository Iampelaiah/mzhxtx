import { 
  Shield, 
  Wallet, 
  PlusCircle, 
  CheckCircle, 
  ArrowUpRight, 
  Database,
  Lock,
  Compass
} from 'lucide-react';
import { Job, Provider } from '../types';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
  activeJobs: Job[];
  providers: Provider[];
  escrowBalance: number;
  setSelectedJobId: (id: string) => void;
}

export default function Dashboard({ 
  setCurrentTab, 
  activeJobs, 
  providers, 
  escrowBalance,
  setSelectedJobId
}: DashboardProps) {

  const handleViewJob = (jobId: string) => {
    setSelectedJobId(jobId);
    setCurrentTab('escrow');
  };

  const activeEscrowCount = activeJobs.filter(j => j.status === 'HELD_IN_ESCROW' || j.status === 'RELEASE_PENDING').length;

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-5xl mx-auto select-none">
      {/* Welcome Hero banner in KNTIC Bold style */}
      <div className="relative overflow-hidden rounded-2xl bg-neutral-950 text-white p-8 md:p-12 border border-white/20 shadow-priority">
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2 mb-4 bg-white/10 border border-white/20 px-3 py-1 rounded w-fit">
              <CheckCircle size={11} className="text-white" />
              <span className="font-mono text-[9px] text-white font-bold uppercase tracking-[0.2em]">Node Verified Secured</span>
            </div>
            
            <div className="flex flex-col leading-none tracking-tighter">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase">ESCROW</h1>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase outline-text">STASIS</h1>
            </div>
            
            <p className="max-w-xl text-sm md:text-base font-light leading-relaxed opacity-70 mt-6 tracking-tight">
              Deploy zero-trust computational milestones, secure multi-signature vaults, and verify proof-of-work state variables with real-time cryptographic settlement.
            </p>
          </div>
          
          <button 
            onClick={() => setCurrentTab('create_job')}
            className="flex items-center justify-center gap-2 bg-white hover:bg-neutral-200 active:scale-95 text-black font-sans text-[11px] font-black uppercase tracking-widest py-4 px-8 rounded-full transition-all shrink-0"
          >
            <PlusCircle size={14} />
            <span>Deploy Vault</span>
          </button>
        </div>
      </div>

      {/* Grid of stats (Bold Brutalist cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Total Escrow Vault</span>
            <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
              <Wallet size={14} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-white">${escrowBalance.toLocaleString()}</span>
              <span className="font-mono text-[10px] text-white/50 font-bold">USDC</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-2 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
              Multi-sig active
            </p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Active Contracts</span>
            <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
              <Shield size={14} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-white">{activeEscrowCount}</span>
              <span className="font-sans text-[10px] text-white/50 font-bold uppercase tracking-wider">Deals</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-2 uppercase tracking-wider">Locked in cluster vaults</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Verified Entities</span>
            <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
              <Database size={14} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-white">{providers.length}</span>
              <span className="font-sans text-[10px] text-white/50 font-bold uppercase tracking-wider">Nodes</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-2 uppercase tracking-wider">Ready in local system</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Node Consensus</span>
            <div className="p-2 bg-white/5 rounded border border-white/10 text-white">
              <Compass size={14} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-base font-black text-white uppercase tracking-widest">Fully Locked</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-2 uppercase tracking-wider">Consensus state: 100%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active escrow tracker summary */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-sans font-black text-lg text-white tracking-tight uppercase flex items-center gap-2">
              <Shield size={16} className="text-white" />
              Active Escrow Registries
            </h2>
            <button 
              onClick={() => setCurrentTab('escrow')}
              className="font-mono text-[10px] text-white/60 hover:text-white flex items-center gap-1 font-bold uppercase tracking-widest transition-colors"
            >
              <span>Audit Ledger</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {activeJobs.length === 0 ? (
              <div className="bg-neutral-950 border border-dashed border-white/20 rounded-xl p-8 text-center flex flex-col items-center gap-3">
                <Shield size={28} className="text-white/40" />
                <p className="font-sans text-sm text-white/60 font-medium uppercase tracking-wider">No active escrow records detected.</p>
                <button 
                  onClick={() => setCurrentTab('create_job')}
                  className="bg-white text-black font-mono text-[9px] font-bold uppercase tracking-wider px-4 py-2 rounded"
                >
                  Broadcast New Job Contract
                </button>
              </div>
            ) : (
              activeJobs.map((job) => (
                <div 
                  key={job.id}
                  onClick={() => handleViewJob(job.id)}
                  className="group relative bg-neutral-950 border border-white/10 hover:border-white/30 rounded-xl p-5 cursor-pointer transition-all hover:-translate-y-0.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-l-xl"></div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-white/10 text-white text-[8px] font-mono px-2 py-0.5 rounded font-bold border border-white/10 flex items-center gap-1 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                        HELD IN VAULT
                      </span>
                      <span className="font-mono text-[11px] text-white/40 font-bold">{job.id}</span>
                    </div>
                    <h3 className="font-sans font-black text-sm md:text-base text-white group-hover:text-white/80 transition-colors uppercase tracking-tight">
                      {job.title}
                    </h3>
                    <p className="font-sans text-xs text-white/50 line-clamp-1 mt-1">
                      {job.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
                    <div className="text-left md:text-right">
                      <span className="font-mono text-sm font-black text-white">
                        ${job.milestones.reduce((acc, m) => acc + m.amount, 0).toLocaleString()}
                      </span>
                      <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-bold">USDC HELD</p>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <span className="bg-white/10 text-white text-[9px] font-mono font-bold px-2.5 py-1 rounded border border-white/20 uppercase tracking-wider flex items-center gap-1.5">
                        <Lock size={9} />
                        {job.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Local cluster directory overview */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-sans font-black text-lg text-white tracking-tight uppercase flex items-center gap-2">
              <Compass size={16} className="text-white" />
              Verified Nodes
            </h2>
            <button 
              onClick={() => setCurrentTab('discover')}
              className="font-mono text-[10px] text-white/60 hover:text-white flex items-center gap-1 font-bold uppercase tracking-widest transition-colors"
            >
              <span>Explore</span>
              <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="bg-neutral-950 border border-white/10 rounded-xl p-4 flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              {providers.slice(0, 2).map((prov) => (
                <div 
                  key={prov.id}
                  onClick={() => setCurrentTab('discover')}
                  className="flex items-center justify-between p-2.5 hover:bg-white/5 rounded-lg cursor-pointer border border-transparent hover:border-white/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img 
                        src={prov.avatar} 
                        alt={prov.name}
                        className="w-9 h-9 rounded object-cover border border-white/20" 
                      />
                      <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full border border-black text-black">
                        <CheckCircle size={8} className="fill-black text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-sans font-black text-xs text-white uppercase tracking-tight">
                        {prov.name}
                      </h4>
                      <p className="font-mono text-[10px] text-white/40">{prov.specialty}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-[10px] font-bold text-white">${prov.estRate}/hr</span>
                    <p className="font-mono text-[8px] text-white/40 uppercase tracking-wider font-semibold">Rating: {prov.rating}</p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setCurrentTab('discover')}
              className="w-full py-2.5 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white rounded font-mono text-[9px] font-bold uppercase tracking-widest text-white transition-all text-center"
            >
              Scan Local Networks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
