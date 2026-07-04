import { useState, useEffect, FormEvent } from 'react';
import { 
  Plus, 
  Trash2, 
  Lock, 
  ShieldCheck, 
  FileText, 
  AlertTriangle,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Job, Milestone, Provider } from '../types';

interface CreateJobProps {
  onJobCreate: (job: Job) => void;
  preloadedProvider: Provider | null;
  setPreloadedProvider: (p: Provider | null) => void;
  liquidBalance: number;
}

export default function CreateJob({ 
  onJobCreate, 
  preloadedProvider, 
  setPreloadedProvider,
  liquidBalance
}: CreateJobProps) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [budgetModel, setBudgetModel] = useState<'MULTI_MILESTONE' | 'FIXED_PRICE'>('MULTI_MILESTONE');
  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: '1', title: 'Initial Assessment', amount: 500, dueDate: '2026-08-01' }
  ]);
  const [mandatoryIdVerification, setMandatoryIdVerification] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeploying, setIsDeploying] = useState(false);

  // Preload provider if selected
  useEffect(() => {
    if (preloadedProvider) {
      setTitle(`Specialized Contract with ${preloadedProvider.name}`);
      setDescription(`Cryptographic milestone arrangement for specialized technical services in ${preloadedProvider.specialty}. Scope to be coordinated with the provider.`);
      const catMap: Record<string, string> = {
        'Electrical': 'technical',
        'Plumbing': 'technical'
      };
      setCategory(catMap[preloadedProvider.category] || 'technical');
      setMilestones([
        { 
          id: '1', 
          title: `Milestone 1: ${preloadedProvider.specialty} Setup`, 
          amount: preloadedProvider.estRate * 8, // 8 hours of work
          dueDate: '2026-07-20' 
        }
      ]);
    }
  }, [preloadedProvider]);

  const addMilestone = () => {
    const newId = (milestones.length + 1).toString();
    setMilestones([
      ...milestones,
      { id: newId, title: '', amount: 100, dueDate: '' }
    ]);
  };

  const updateMilestone = (id: string, field: keyof Milestone, value: any) => {
    setMilestones(
      milestones.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const deleteMilestone = (id: string) => {
    if (milestones.length === 1) return;
    setMilestones(milestones.filter((m) => m.id !== id));
  };

  const totalEscrow = milestones.reduce((sum, m) => sum + (Number(m.amount) || 0), 0);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!title.trim()) {
      setErrorMsg('Job Title is required.');
      return;
    }
    if (!category) {
      setErrorMsg('Please select a Category.');
      return;
    }
    if (!description.trim()) {
      setErrorMsg('Scope Description is required.');
      return;
    }

    // Validate milestones
    for (const m of milestones) {
      if (!m.title.trim()) {
        setErrorMsg('Please specify a title for all milestones.');
        return;
      }
      if (!m.amount || m.amount <= 0) {
        setErrorMsg('Milestone amount must be greater than $0.');
        return;
      }
    }

    if (totalEscrow > liquidBalance) {
      setErrorMsg(`Insufficient funds in wallet liquid balance. Needed: $${totalEscrow.toLocaleString()}, Available: $${liquidBalance.toLocaleString()}`);
      return;
    }

    setIsDeploying(true);

    // Simulate smart contract generation latency
    setTimeout(() => {
      const newJob: Job = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}-${['A', 'B', 'X', 'Y'][Math.floor(Math.random() * 4)]}`,
        title,
        category,
        description,
        milestones: milestones.map(m => ({ ...m, amount: Number(m.amount) })),
        mandatoryIdVerification,
        status: 'HELD_IN_ESCROW', // immediately moves to HELD_IN_ESCROW upon deployment
        createdAt: new Date().toISOString(),
        vaultId: `0x${Math.random().toString(16).substring(2, 6).toUpperCase()}...${Math.random().toString(16).substring(2, 6).toUpperCase()}`,
        txHash: `0x${Math.random().toString(16).substring(2, 10)}...`,
        broadcasted: true,
        proofs: [] // Starts with empty proofs for user to test uploading!
      };

      onJobCreate(newJob);
      setIsDeploying(false);
      setPreloadedProvider(null); // Reset preloaded
      // Reset form
      setTitle('');
      setDescription('');
      setCategory('');
      setMilestones([{ id: '1', title: 'Initial Assessment', amount: 500, dueDate: '2026-08-01' }]);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-5xl mx-auto select-none">
      <div>
        <h1 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tight">Create Job Listing</h1>
        <p className="font-sans text-xs text-white/50 uppercase tracking-wider mt-1">Define the parameters of the cryptographic smart contract for this task.</p>
      </div>

      {preloadedProvider && (
        <div className="bg-neutral-950 text-white p-4 rounded-xl border border-white/20 flex items-center justify-between shadow-ambient">
          <div className="flex items-center gap-3">
            <img 
              src={preloadedProvider.avatar} 
              alt={preloadedProvider.name} 
              className="w-10 h-10 rounded object-cover border border-white/20"
            />
            <div>
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">PRELOADED SPECIALIST</p>
              <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider">{preloadedProvider.name} ({preloadedProvider.specialty})</h4>
            </div>
          </div>
          <button 
            onClick={() => setPreloadedProvider(null)}
            className="text-white/80 hover:text-white font-mono text-[9px] font-bold uppercase tracking-wider px-3 py-1 bg-white/5 border border-white/10 rounded"
          >
            Clear Direct Hiring
          </button>
        </div>
      )}

      {errorMsg && (
        <div className="bg-rose-950 border border-rose-800 rounded-xl p-4 flex items-start gap-3 text-rose-200">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <div className="text-xs font-sans font-medium uppercase tracking-wider">{errorMsg}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Job & Milestone Setup */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Job Definition Card */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/20"></div>
            
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight border-b border-white/10 pb-3 mb-5 flex items-center gap-2">
              <FileText size={16} className="text-white/40" />
              <span>Job Definition</span>
            </h2>
 
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest" htmlFor="job-title">Job Title</label>
                <input 
                  type="text" 
                  id="job-title"
                  placeholder="e.g., Smart Home System Installation"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white focus:bg-neutral-950 transition-all outline-none font-bold"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest" htmlFor="job-category">Category</label>
                  <select 
                    id="job-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-3 text-sm text-white focus:outline-none focus:border-white focus:bg-neutral-950 transition-all cursor-pointer outline-none font-bold"
                  >
                    <option value="" disabled className="bg-neutral-950 text-white/30">Select a category...</option>
                    <option value="technical" className="bg-neutral-950 text-white">Technical Installation</option>
                    <option value="software" className="bg-neutral-950 text-white">Software Development</option>
                    <option value="audit" className="bg-neutral-950 text-white">Security Audit</option>
                    <option value="design" className="bg-neutral-950 text-white">System Design</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest" htmlFor="job-description">Description</label>
                <textarea 
                  id="job-description"
                  placeholder="Detail the scope of work..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white focus:bg-neutral-950 transition-all resize-y outline-none leading-relaxed"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Milestone Engine Card */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/10 pb-3 mb-5 gap-3">
              <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
                <Sparkles size={16} className="text-white animate-pulse" />
                <span>Milestone Engine</span>
              </h2>

              {/* Budget Model Toggle */}
              <div className="flex items-center bg-white/5 p-1 rounded border border-white/10">
                <button
                  type="button"
                  onClick={() => setBudgetModel('MULTI_MILESTONE')}
                  className={`px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded transition-all ${
                    budgetModel === 'MULTI_MILESTONE'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Multi-Milestone
                </button>
                <button
                  type="button"
                  onClick={() => setBudgetModel('FIXED_PRICE')}
                  className={`px-3 py-1.5 text-[9px] font-mono font-black uppercase rounded transition-all ${
                    budgetModel === 'FIXED_PRICE'
                      ? 'bg-white text-black shadow-sm'
                      : 'text-white/50 hover:text-white'
                  }`}
                >
                  Fixed Price
                </button>
              </div>
            </div>

            {/* Milestone lists */}
            <div className="flex flex-col gap-4">
              {milestones.map((milestone, idx) => (
                <div 
                  key={milestone.id}
                  className="border border-white/10 rounded p-4 flex flex-col md:flex-row gap-4 items-start md:items-center bg-white/5"
                >
                  <div className="bg-white/10 w-7 h-7 rounded flex items-center justify-center font-mono text-xs font-black text-white shrink-0">
                    {idx + 1}
                  </div>
                  
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-12 gap-3 w-full">
                    <div className="md:col-span-6">
                      <input 
                        type="text" 
                        placeholder="Milestone description (e.g. Phase 1 Audit)"
                        value={milestone.title}
                        onChange={(e) => updateMilestone(milestone.id, 'title', e.target.value)}
                        className="w-full bg-neutral-950 border border-white/10 rounded px-3 py-2 text-xs text-white placeholder-white/20 focus:outline-none focus:border-white outline-none font-bold"
                      />
                    </div>
                    <div className="md:col-span-3">
                      <div className="relative">
                        <span className="absolute left-2.5 top-2.5 font-mono text-xs text-white/30">$</span>
                        <input 
                          type="number" 
                          placeholder="Amount"
                          value={milestone.amount || ''}
                          onChange={(e) => updateMilestone(milestone.id, 'amount', Number(e.target.value))}
                          className="w-full bg-neutral-950 border border-white/10 rounded pl-6 pr-3 py-2 font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-white outline-none font-black"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-3">
                      <div className="relative">
                        <input 
                          type="date" 
                          value={milestone.dueDate}
                          onChange={(e) => updateMilestone(milestone.id, 'dueDate', e.target.value)}
                          className="w-full bg-neutral-950 border border-white/10 rounded px-3 py-2 font-mono text-xs text-white focus:outline-none focus:border-white outline-none font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => deleteMilestone(milestone.id)}
                    disabled={milestones.length === 1}
                    className="text-white/40 hover:text-rose-500 transition-colors p-2 shrink-0 disabled:opacity-30"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Add milestone button */}
              <button 
                type="button"
                onClick={addMilestone}
                className="border border-dashed border-white/20 hover:border-white hover:bg-white/5 transition-all rounded py-3 flex items-center justify-center gap-2 text-white font-mono text-[9px] font-black uppercase tracking-wider"
              >
                <Plus size={14} />
                <span>Add Milestone Entry</span>
              </button>

              <div className="flex justify-between items-center mt-3 pt-4 border-t border-white/10">
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest font-bold">Total Escrow Commitment</span>
                <span className="font-mono text-base font-black text-white">${totalEscrow.toLocaleString()} USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Security Protocol & Action Panel */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Security Protocol */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white"></div>

            <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight mb-4 flex items-center gap-2">
              <ShieldCheck size={16} className="text-white" />
              <span>Security Protocol</span>
            </h3>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input 
                type="checkbox"
                checked={mandatoryIdVerification}
                onChange={(e) => setMandatoryIdVerification(e.target.checked)}
                className="mt-1 accent-white rounded cursor-pointer w-4 h-4 border border-white/20 bg-neutral-950"
              />
              <div className="flex flex-col">
                <span className="font-sans text-xs font-bold text-white group-hover:text-white/80 transition-colors uppercase tracking-wider">
                  Mandatory ID Verification
                </span>
                <span className="font-sans text-[10px] text-white/50 leading-relaxed mt-1">
                  Only allow bids from nodes with cryptographic identity attestation & verified trust parameters.
                </span>
              </div>
            </label>
          </div>

          {/* Action deploy panel */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient flex flex-col gap-4">
            <div className="font-mono text-[9px] text-white/50 leading-relaxed bg-white/5 p-3 rounded border border-white/10 uppercase tracking-wider font-bold">
              ⚡ Deploying this contract will instantly deduct <b className="text-white font-mono font-black">${totalEscrow.toLocaleString()} USDC</b> from your liquid balance and secure it within the Gikspot escrow protocols.
            </div>

            <button
              type="submit"
              disabled={isDeploying}
              className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-widest py-4 rounded flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 disabled:bg-neutral-800 disabled:text-white/40"
            >
              {isDeploying ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>Generating Contract...</span>
                </>
              ) : (
                <>
                  <Lock size={14} />
                  <span>Broadcast Job Contract</span>
                </>
              )}
            </button>

            <button 
              type="button"
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white text-white/80 hover:text-white py-3 rounded font-mono text-[9px] font-black uppercase tracking-widest transition-colors"
            >
              Save Draft Params
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
