import { useState, FormEvent } from 'react';
import { 
  CheckCircle, 
  Lock, 
  Unlock, 
  AlertTriangle, 
  Image as ImageIcon, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  ChevronDown,
  Send
} from 'lucide-react';
import { Job, ProofOfWork } from '../types';

interface EscrowDetailsProps {
  jobs: Job[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  onApprovePayout: (jobId: string) => void;
  onRaiseDispute: (jobId: string) => void;
  onAddProof: (jobId: string, proof: ProofOfWork) => void;
}

export default function EscrowDetails({ 
  jobs, 
  selectedJobId, 
  setSelectedJobId,
  onApprovePayout,
  onRaiseDispute,
  onAddProof
}: EscrowDetailsProps) {
  const currentJob = jobs.find(j => j.id === selectedJobId) || jobs[0];
  const [newProofUrl, setNewProofUrl] = useState('');
  const [showProofForm, setShowProofForm] = useState(false);

  if (!currentJob) {
    return (
      <div className="bg-neutral-950 border border-white/15 rounded-xl p-8 text-center flex flex-col items-center gap-3">
        <Clock size={40} className="text-white/40" />
        <h3 className="font-sans font-black text-lg text-white uppercase tracking-tight">No Escrow Agreements Found</h3>
        <p className="font-sans text-xs text-white/50 uppercase tracking-wider">Go to Create Job to deploy a contract first.</p>
      </div>
    );
  }

  const handleProofSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newProofUrl.trim()) return;

    const newProof: ProofOfWork = {
      id: `proof-${Date.now()}`,
      imageUrl: newProofUrl,
      description: 'Newly uploaded proof of technical milestone completion',
      location: '40.7128° N, 74.0060° W' // Simulated GPS stamp
    };

    onAddProof(currentJob.id, newProof);
    setNewProofUrl('');
    setShowProofForm(false);
  };

  const handleSelectPresetProof = (url: string) => {
    setNewProofUrl(url);
  };

  const presetProofs = [
    { name: 'Cabling Detail', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLbFvn9nSzujkvpJJaIITYJJUDELk0YdHxjLzEpUFaiMzNEf5mLSzUYZ_erMju2LLfvKeMbzBpYc0LtQgROkLi1Z8JrXB01eR3M8CjRiEVVF1Yl9RvYpfSI3tnySQGwzu6fQ0znNdl8Z7y1I-IUn_3SKpLqSMbM8WkkglUnY4R-E2pJleX4mC2fOLflzx9gz7WR8HV7n0yiy6ris6f6Pp-Zctmeg0nnfSwej44X8ClFLstXjSxUpx1jNeh9QQ-4qyPOg7WGifQb_yZ' },
    { name: 'Wire crimp', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX_waz16XVupn3XSFtNg4H8et4_WNt5lUv7pvnE0d6Py_umEODtvIm3ja2OtJHYbXRKgVpKR4j7yscDbgytE7YxALZ49dJc-DxeTj39n1rHYE5LJArotKTPTYciAbXI5TC7-zoYRK0aUmF5p82dZFvQHAv4MWF2V6vpl9J4zBe8BQB6EcJ-P-wazVi92fuHcw4e1SLu4iKKCpFmQXl4fO-mf5ZzkEN-uU94YMxUiFx3OHb66ph36dcqJ6k0YfUF47Va7L47q_7VKgQ' },
    { name: 'Server room layout', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnoibwkIaJtX4fHnqwgsHyRzjZ1Db_FO6pa5mFdvj994Vcu6Z0zEIEpiCJ5pXcE9WFNDtQMA9poHBh4jsZ_5FJmU9EPbMoNh1R7fuaDKbhw8Dm2Uuv8RdhAlWJ1PHLvdbyBmyabBsdC-lZEwuJGHqd_71VK9AKzDRA3X1jiEloMUd-aIJfbKrspV0FMXTTvSAvmn52CsfujXQJ7vvDTcu1oLqeoBmT5vCS5hmZ6ERPuZLlTGMKoWOp3e4nrzyNxTitzSkkiaYec6YD' }
  ];

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-5xl mx-auto select-none">
      
      {/* Selector of created agreements */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-white/15 shadow-sm">
        <div>
          <span className="font-mono text-[9px] text-white/40 uppercase tracking-[0.2em] font-bold">Active vault cluster</span>
          <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight">Escrow Contracts Ledger</h2>
        </div>
        <div className="relative w-full sm:w-72">
          <select 
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-2.5 text-xs text-white font-bold focus:outline-none focus:border-white cursor-pointer appearance-none outline-none"
          >
            {jobs.map(job => (
              <option key={job.id} value={job.id}>
                {job.id} — {job.title}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-3.5 pointer-events-none text-white/40">
            <ChevronDown size={14} />
          </div>
        </div>
      </div>

      {/* Transaction Header */}
      <div>
        <div className="flex items-center gap-2.5 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-widest bg-white/10 text-white border border-white/15">
            <CheckCircle size={10} className="mr-1 fill-black text-white" />
            Verified Smart Contract
          </span>
          <span className="text-white/40 font-mono text-xs">{currentJob.id}</span>
        </div>
        <h2 className="font-sans font-black text-xl md:text-3xl text-white uppercase tracking-tight">{currentJob.title}</h2>
        <p className="text-white/60 font-sans text-xs mt-1 leading-snug">
          Escrow contract initialized on vault <b className="text-white font-mono font-black">{currentJob.vaultId}</b>. Awaiting final state resolution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: State Card, proofs */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Status Detail Card */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient relative overflow-hidden border-t-2 border-white">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-white">
              <Lock size={120} />
            </div>

            <div className="flex items-start justify-between relative z-10 gap-4">
              <div>
                <h3 className="font-sans font-black text-base md:text-lg text-white uppercase tracking-tight">
                  Status: {currentJob.status.replace(/_/g, ' ')}
                </h3>
                <p className="font-sans text-xs text-white/60 mt-2 max-w-md leading-relaxed">
                  {currentJob.status === 'HELD_IN_ESCROW' && '100% of milestone funds are secured and locked in the isolated Gikspot ledger, awaiting approval.'}
                  {currentJob.status === 'RELEASE_PENDING' && 'Payout initiated by node validation. Funds are in transition.'}
                  {currentJob.status === 'SETTLED' && 'Funds successfully released and settled into the professional\'s liquid wallet.'}
                  {currentJob.status === 'DISPUTED' && 'Contract under cryptographic dispute. Locked pending mediation.'}
                </p>
              </div>

              <div className="text-right shrink-0">
                <div className="font-mono text-lg md:text-2xl font-black text-white">
                  ${currentJob.milestones.reduce((acc, m) => acc + m.amount, 0).toLocaleString()}
                </div>
                <div className="font-mono text-[9px] text-white/40 font-bold uppercase tracking-widest mt-1">USDC Tokenized</div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              {currentJob.status === 'HELD_IN_ESCROW' ? (
                <>
                  <button 
                    onClick={() => onApprovePayout(currentJob.id)}
                    className="bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded transition-all active:scale-95 flex-1 flex justify-center items-center gap-2"
                  >
                    <Unlock size={14} strokeWidth={2.5} />
                    <span>Approve Payout</span>
                  </button>
                  <button 
                    onClick={() => onRaiseDispute(currentJob.id)}
                    className="bg-transparent border border-rose-500 text-rose-500 hover:bg-rose-500/10 font-mono text-[10px] font-black uppercase tracking-widest py-3.5 px-6 rounded transition-all active:scale-95 flex-1 flex justify-center items-center gap-2"
                  >
                    <AlertTriangle size={14} />
                    <span>Raise Dispute</span>
                  </button>
                </>
              ) : (
                <div className="w-full bg-white/5 border border-white/10 rounded p-3.5 text-center font-mono text-[10px] font-bold uppercase tracking-widest text-white/60">
                  🔐 Vault Transaction state finalized: {currentJob.status}
                </div>
              )}
            </div>
          </div>

          {/* Proof of Work Section */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient border-l-2 border-white/40">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div>
                <h3 className="font-sans font-black text-base text-white uppercase tracking-tight">Proof of Work</h3>
                <p className="font-sans text-[9px] text-white/40 uppercase tracking-widest">Node telemetry & visual attestation logs</p>
              </div>
              <span className="font-mono text-[9px] text-white/40 font-bold uppercase tracking-widest">
                {(currentJob.proofs || []).length} Items Uploaded
              </span>
            </div>

            {/* Grid of Proof images */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(currentJob.proofs || []).map((proof) => (
                <div 
                  key={proof.id}
                  className="group relative rounded border border-white/10 overflow-hidden cursor-pointer shadow-sm hover:border-white/30 transition-all"
                >
                  <div className="aspect-video bg-neutral-900 w-full relative">
                    <img 
                      className="object-cover w-full h-full absolute inset-0" 
                      src={proof.imageUrl} 
                      alt={proof.description} 
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                      <div className="flex items-center text-white/90 font-mono text-[8px] tracking-tight">
                        <MapPin size={8} className="mr-1 text-white" />
                        <span>{proof.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-2 bg-neutral-900">
                    <p className="font-sans text-[9px] text-white/50 line-clamp-1 leading-normal">
                      {proof.description}
                    </p>
                  </div>
                </div>
              ))}

              {/* Upload Simulated Proof Box */}
              {currentJob.status === 'HELD_IN_ESCROW' && (
                <div 
                  onClick={() => setShowProofForm(true)}
                  className="border border-dashed border-white/25 hover:border-white rounded p-4 flex flex-col items-center justify-center text-center cursor-pointer bg-white/5 hover:bg-white/10 transition-all min-h-[120px]"
                >
                  <ImageIcon size={24} className="text-white/40 mb-1.5" />
                  <span className="font-mono text-[9px] font-bold text-white uppercase tracking-widest">Add Proof of Work</span>
                  <span className="font-sans text-[8px] text-white/40 mt-1 uppercase tracking-wider">Attach server completion logs</span>
                </div>
              )}
            </div>

            {/* Proof submission drawer */}
            {showProofForm && (
              <form onSubmit={handleProofSubmit} className="mt-6 p-4 bg-neutral-900 rounded border border-white/10 animate-fade-in flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Link Telemetry Proof URL</h4>
                  <button 
                    type="button" 
                    onClick={() => setShowProofForm(false)}
                    className="font-mono text-[9px] font-bold uppercase text-white/40 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                {/* Preset image buttons */}
                <div className="flex flex-wrap gap-2">
                  {presetProofs.map(pp => (
                    <button
                      key={pp.name}
                      type="button"
                      onClick={() => handleSelectPresetProof(pp.url)}
                      className="px-2.5 py-1 bg-white/5 border border-white/10 text-[9px] font-mono font-bold uppercase rounded hover:border-white text-white/60 hover:text-white"
                    >
                      Preset: {pp.name}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2">
                  <input 
                    type="url" 
                    placeholder="https://example.com/proof-telemetry.jpg"
                    value={newProofUrl}
                    onChange={(e) => setNewProofUrl(e.target.value)}
                    required
                    className="flex-1 bg-neutral-950 border border-white/15 rounded px-3 py-1.5 text-xs text-white focus:outline-none focus:border-white outline-none"
                  />
                  <button 
                    type="submit"
                    className="bg-white text-black font-mono text-[9px] font-black uppercase px-4 py-2 rounded hover:bg-neutral-200 flex items-center gap-1 shrink-0"
                  >
                    <Send size={10} />
                    <span>Upload</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: State Tracker & Security Note */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* State Tracker */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-6 shadow-ambient">
            <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight mb-6">Transaction State</h3>
            
            <div className="relative pl-6 border-l border-white/10 space-y-6">
              
              {/* Step 1: Done */}
              <div className="relative">
                <div className="absolute -left-[30px] top-0.5 w-4 h-4 rounded-full bg-white/5 border-2 border-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                </div>
                <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Uninitialized Contract</h4>
                <p className="font-mono text-[9px] text-white/40 mt-0.5">10:42 AM - Oct 24, 2023</p>
              </div>

              {/* Step 2: Active or Completed */}
              <div className="relative">
                <div className={`absolute -left-[30px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                  currentJob.status !== 'DRAFT'
                    ? 'bg-white border-white'
                    : 'bg-black border-white/20'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    currentJob.status !== 'DRAFT' ? 'bg-black' : 'bg-transparent'
                  }`}></div>
                </div>
                <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Held in Escrow</h4>
                <p className="font-mono text-[9px] text-white/40 mt-0.5">11:15 AM - Oct 24, 2023</p>
              </div>

              {/* Step 3: Pending or settled */}
              <div className="relative">
                <div className={`absolute -left-[30px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                  currentJob.status === 'RELEASE_PENDING' || currentJob.status === 'SETTLED'
                    ? 'bg-white border-white'
                    : 'bg-black border-white/20'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    currentJob.status === 'RELEASE_PENDING' || currentJob.status === 'SETTLED' ? 'bg-black' : 'bg-transparent'
                  }`}></div>
                </div>
                <h4 className="font-sans text-xs font-bold text-white uppercase tracking-wider">Release Pending</h4>
                <p className="font-mono text-[9px] text-white/40 mt-0.5">
                  {currentJob.status === 'RELEASE_PENDING' || currentJob.status === 'SETTLED' ? 'Node Attested Release' : '--'}
                </p>
              </div>

              {/* Step 4: Settled */}
              <div className="relative">
                <div className={`absolute -left-[30px] top-0.5 w-4 h-4 rounded-full flex items-center justify-center border-2 ${
                  currentJob.status === 'SETTLED'
                    ? 'bg-white border-white'
                    : 'bg-black border-white/20'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${
                    currentJob.status === 'SETTLED' ? 'bg-black' : 'bg-transparent'
                  }`}></div>
                </div>
                <h4 className="font-sans text-xs font-black text-white uppercase tracking-wider">Settled Ledger</h4>
                <p className="font-mono text-[9px] text-white/40 mt-0.5">
                  {currentJob.status === 'SETTLED' ? '12:04 PM - settled' : '--'}
                </p>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-4 flex items-start gap-3">
            <ShieldCheck size={18} className="text-white shrink-0 mt-0.5" />
            <div>
              <p className="font-sans text-xs font-bold text-white uppercase tracking-wider">Security Notice</p>
              <p className="font-sans text-[10px] text-white/50 mt-1 leading-relaxed">
                This transaction and all telemetry proof uploads are fully protected by Gikspot Lab Decentralized Governance and dispute resolution mechanisms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
