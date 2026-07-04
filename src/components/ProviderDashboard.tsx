import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Award, 
  Settings, 
  Plus, 
  LineChart, 
  Database, 
  BookOpen, 
  Star,
  Layers,
  Sparkles,
  FolderHeart,
  Image as ImageIcon
} from 'lucide-react';
import { ClientSession, Provider, PortfolioItem } from '../types';

interface ProviderDashboardProps {
  sessions: ClientSession[];
  providers?: Provider[];
  onAddPortfolioItem?: (providerId: string, item: PortfolioItem) => void;
  onAddTier?: (tier: any) => void;
}

export default function ProviderDashboard({ 
  sessions, 
  providers, 
  onAddPortfolioItem 
}: ProviderDashboardProps) {
  const eliasProvider = providers?.find(p => p.id === '1');
  const portfolioList = eliasProvider?.portfolio || [];

  const [bio, setBio] = useState('Senior Enterprise Structured Cabling Architect & Fiber Optic Specialist with certified cryptographic network design expertise.');
  const [credentials, setCredentials] = useState([
    { name: 'ISO-9001 Structural Cable Cert', id: 'ISO-9824-H6', status: 'VERIFIED' },
    { name: 'Agora RTC Systems Architect', id: 'AG-7729-SYS', status: 'VERIFIED' },
    { name: 'Gikspot Trust Node Endorsement', id: 'GIK-TRUST-3A', status: 'VERIFIED' }
  ]);
  const [tiers, setTiers] = useState([
    { id: 'tier-1', name: 'Tier 1: Basic Site Assessment', rate: 70, description: 'Initial site walkthrough, wireline path planning, and physical layout recommendations.' },
    { id: 'tier-2', name: 'Tier 2: Enterprise Installation', rate: 85, description: 'Structured cabling setup, patch panel termination, color-coded Ethernet bundling, and Escrow testing.' },
    { id: 'tier-3', name: 'Tier 3: Fiber Optic Splicing', rate: 110, description: 'High-precision fiber splicing, OTDR validation logs, security audits, and real-time Agora RTC deployment guidance.' }
  ]);

  const [newTierName, setNewTierName] = useState('');
  const [newTierRate, setNewTierRate] = useState('');
  const [newTierDesc, setNewTierDesc] = useState('');
  const [showAddTier, setShowAddTier] = useState(false);

  // Portfolio addition form states
  const [showAddPortfolio, setShowAddPortfolio] = useState(false);
  const [newPortTitle, setNewPortTitle] = useState('');
  const [newPortDesc, setNewPortDesc] = useState('');
  const [newPortTags, setNewPortTags] = useState('');
  const [newPortCategory, setNewPortCategory] = useState('Electrical');
  const [newPortImage, setNewPortImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuDLbFvn9nSzujkvpJJaIITYJJUDELk0YdHxjLzEpUFaiMzNEf5mLSzUYZ_erMju2LLfvKeMbzBpYc0LtQgROkLi1Z8JrXB01eR3M8CjRiEVVF1Yl9RvYpfSI3tnySQGwzu6fQ0znNdl8Z7y1I-IUn_3SKpLqSMbM8WkkglUnY4R-E2pJleX4mC2fOLflzx9gz7WR8HV7n0yiy6ris6f6Pp-Zctmeg0nnfSwej44X8ClFLstXjSxUpx1jNeh9QQ-4qyPOg7WGifQb_yZ');

  const completedSessions = sessions.filter(s => s.status === 'Completed');
  const totalEarnings = completedSessions.reduce((sum, s) => sum + s.amount, 0);
  const activeEscrowAmount = sessions
    .filter(s => s.status !== 'Completed' && s.status !== 'Pending')
    .reduce((sum, s) => sum + s.amount, 0);

  const handleCreateTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTierName.trim() || !newTierRate) return;

    const newTier = {
      id: `tier-${Date.now()}`,
      name: newTierName,
      rate: Number(newTierRate),
      description: newTierDesc || 'Customized service tier listing.'
    };

    setTiers([...tiers, newTier]);
    setNewTierName('');
    setNewTierRate('');
    setNewTierDesc('');
    setShowAddTier(false);
  };

  const handleCreatePortfolioItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPortTitle.trim() || !newPortDesc.trim()) return;

    const tagsArray = newPortTags
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(t => t.length > 0);

    const newItem: PortfolioItem = {
      id: `port-${Date.now()}`,
      title: newPortTitle,
      description: newPortDesc,
      category: newPortCategory,
      imageUrl: newPortImage || 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLbFvn9nSzujkvpJJaIITYJJUDELk0YdHxjLzEpUFaiMzNEf5mLSzUYZ_erMju2LLfvKeMbzBpYc0LtQgROkLi1Z8JrXB01eR3M8CjRiEVVF1Yl9RvYpfSI3tnySQGwzu6fQ0znNdl8Z7y1I-IUn_3SKpLqSMbM8WkkglUnY4R-E2pJleX4mC2fOLflzx9gz7WR8HV7n0yiy6ris6f6Pp-Zctmeg0nnfSwej44X8ClFLstXjSxUpx1jNeh9QQ-4qyPOg7WGifQb_yZ',
      tags: tagsArray.length > 0 ? tagsArray : ['custom', 'node', 'hardware'],
      createdAt: new Date().toISOString()
    };

    if (onAddPortfolioItem) {
      onAddPortfolioItem('1', newItem);
    }

    setNewPortTitle('');
    setNewPortDesc('');
    setNewPortTags('');
    setShowAddPortfolio(false);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-5xl mx-auto select-none">
      {/* Provider Bio & Professional Credentials */}
      <div className="bg-neutral-950 border border-white/15 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-priority">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="flex flex-col md:flex-row gap-6 items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h1 className="font-sans font-black text-xl md:text-2xl text-white uppercase tracking-tight">Elias Vance</h1>
              <span className="bg-white/10 text-white text-[8px] font-mono font-bold px-2.5 py-1 rounded border border-white/15 flex items-center gap-1.5 uppercase tracking-wider">
                <ShieldCheck size={9} />
                PROVIDER ID: ELIAS_V_NODE_3
              </span>
            </div>
            <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-1">BUSINESS MODE // ENTERPRISE CONSOLE</p>
            
            <div className="mt-4 max-w-xl">
              <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black block mb-1">Public Bio</span>
              <p className="text-xs text-white/70 leading-relaxed font-medium">
                {bio}
              </p>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 w-full md:w-80 shrink-0">
            <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black block mb-2">Verified Professional Credentials</span>
            <div className="flex flex-col gap-2">
              {credentials.map((cred, idx) => (
                <div key={idx} className="flex justify-between items-center text-[10px] bg-neutral-900 border border-white/5 p-2 rounded">
                  <div>
                    <span className="text-white font-sans font-bold block">{cred.name}</span>
                    <span className="text-white/40 font-mono text-[8px] uppercase tracking-wider">ID: {cred.id}</span>
                  </div>
                  <span className="bg-white/15 text-white border border-white/10 px-1.5 py-0.5 rounded text-[7px] font-mono font-bold tracking-widest uppercase">
                    {cred.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Financial Analytics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Total Earnings Realized</span>
            <div className="p-1.5 bg-white/5 rounded border border-white/10 text-white">
              <LineChart size={12} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-white">${totalEarnings.toLocaleString()}</span>
              <span className="font-mono text-[10px] text-white/50 font-bold">USDC</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-wider">Released and settled</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">In Escrow Pipeline</span>
            <div className="p-1.5 bg-white/5 rounded border border-white/10 text-white">
              <Database size={12} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-white">${activeEscrowAmount.toLocaleString()}</span>
              <span className="font-mono text-[10px] text-white/50 font-bold">USDC</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-wider">Locked in active sessions</p>
          </div>
        </div>

        <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-mono text-[9px] text-white/50 uppercase tracking-[0.2em] font-bold">Business Reputation</span>
            <div className="p-1.5 bg-white/5 rounded border border-white/10 text-white">
              <Star size={12} />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-black text-white">4.95</span>
              <span className="font-sans text-[10px] text-white/50 font-bold uppercase tracking-wider">/5.0</span>
            </div>
            <p className="font-mono text-[9px] text-white/40 mt-1 uppercase tracking-wider">142 verified sessions</p>
          </div>
        </div>
      </div>

      {/* Customizable Service Tier Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Tier Config list */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
              <Layers size={16} className="text-white/40" />
              <span>Customizable Service Tier Pricing</span>
            </h2>
            <button 
              onClick={() => setShowAddTier(!showAddTier)}
              className="bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer"
            >
              <Plus size={11} />
              <span>Configure Tier</span>
            </button>
          </div>

          {showAddTier && (
            <form onSubmit={handleCreateTier} className="bg-neutral-950 border border-white/20 p-5 rounded-xl flex flex-col gap-4">
              <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider">Add Service Tier Param</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Tier Name</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Tier 4: Hardware Audit"
                    value={newTierName}
                    onChange={(e) => setNewTierName(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-bold"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Hourly Rate ($)</label>
                  <input 
                    type="number" 
                    placeholder="120"
                    value={newTierRate}
                    onChange={(e) => setNewTierRate(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-bold font-mono"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Description Scope</label>
                <textarea 
                  placeholder="Summarize the scope parameters..."
                  value={newTierDesc}
                  onChange={(e) => setNewTierDesc(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white leading-relaxed"
                  rows={2}
                />
              </div>
              <div className="flex gap-2">
                <button type="submit" className="bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider px-4 py-2 rounded">
                  Broadcast Tier
                </button>
                <button type="button" onClick={() => setShowAddTier(false)} className="bg-white/5 border border-white/10 text-white font-mono text-[9px] font-black uppercase tracking-wider px-4 py-2 rounded">
                  Dismiss
                </button>
              </div>
            </form>
          )}

          <div className="flex flex-col gap-4">
            {tiers.map((tier) => (
              <div key={tier.id} className="bg-neutral-950 border border-white/10 p-5 rounded-xl flex justify-between items-start gap-4 transition-all hover:border-white/20">
                <div className="flex-1 min-w-0">
                  <h4 className="font-sans font-black text-sm text-white uppercase tracking-tight">{tier.name}</h4>
                  <p className="text-xs text-white/60 leading-relaxed font-medium mt-1.5">{tier.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-mono text-sm font-black text-white">${tier.rate}/hr</span>
                  <span className="font-mono text-[8px] text-white/40 block uppercase tracking-wider mt-0.5">Est rate</span>
                </div>
              </div>
            ))}
          </div>

          {/* Portfolio & Catalog Sync */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
                <FolderHeart size={16} className="text-white/40" />
                <span>Portfolio & Catalog Sync</span>
              </h2>
              <button 
                onClick={() => setShowAddPortfolio(!showAddPortfolio)}
                className="bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider px-3 py-1.5 rounded flex items-center gap-1 cursor-pointer"
              >
                <Plus size={11} />
                <span>Add past job to Catalog</span>
              </button>
            </div>

            {showAddPortfolio && (
              <form onSubmit={handleCreatePortfolioItem} className="bg-neutral-950 border border-white/20 p-5 rounded-xl flex flex-col gap-4 animate-fade-in">
                <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider">Publish Past Work Credentials</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Project Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Sub-zero Coolant Splicing"
                      value={newPortTitle}
                      onChange={(e) => setNewPortTitle(e.target.value)}
                      className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-bold"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Category Tag</label>
                    <select
                      value={newPortCategory}
                      onChange={(e) => setNewPortCategory(e.target.value)}
                      className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-bold cursor-pointer"
                    >
                      <option value="Electrical">Electrical System</option>
                      <option value="Plumbing">Plumbing / Hydraulic</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Media Asset URL</label>
                  <input 
                    type="text" 
                    placeholder="https://lh3.googleusercontent.com/..."
                    value={newPortImage}
                    onChange={(e) => setNewPortImage(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Search Index Tags (comma separated)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. cabling, otdr, fiber, high-flow"
                    value={newPortTags}
                    onChange={(e) => setNewPortTags(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-semibold"
                  />
                  <span className="font-mono text-[7px] text-white/30 uppercase block">These keywords instantly refresh the client discovery index.</span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black">Operational Case Study Scope</label>
                  <textarea 
                    placeholder="Describe how the installation was audited and closed out..."
                    value={newPortDesc}
                    onChange={(e) => setNewPortDesc(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white leading-relaxed"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="bg-white text-black font-mono text-[9px] font-black uppercase tracking-wider px-4 py-2 rounded flex items-center gap-1.5 cursor-pointer">
                    <Sparkles size={11} />
                    <span>Upload to Portfolio</span>
                  </button>
                  <button type="button" onClick={() => setShowAddPortfolio(false)} className="bg-white/5 border border-white/10 text-white font-mono text-[9px] font-black uppercase tracking-wider px-4 py-2 rounded cursor-pointer">
                    Dismiss
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolioList.length === 0 ? (
                <div className="col-span-2 text-center py-6 border border-dashed border-white/10 rounded-xl">
                  <span className="font-mono text-[10px] text-white/45 uppercase">No catalog elements uploaded yet.</span>
                </div>
              ) : (
                portfolioList.map((item) => (
                  <div key={item.id} className="bg-neutral-950 border border-white/10 rounded-xl overflow-hidden flex flex-col hover:border-white/20 transition-all">
                    {item.imageUrl && (
                      <div className="h-32 w-full overflow-hidden border-b border-white/10 bg-neutral-900 relative">
                        <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 right-2 bg-black/75 text-white border border-white/10 px-1.5 py-0.5 rounded text-[8px] font-mono font-bold uppercase tracking-wider">
                          {item.category}
                        </span>
                      </div>
                    )}
                    <div className="p-4 flex flex-col gap-2 flex-1">
                      <h4 className="font-sans font-black text-xs text-white uppercase tracking-tight">{item.title}</h4>
                      <p className="text-[11px] text-white/60 leading-relaxed font-medium flex-1">{item.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.tags?.map((tag, idx) => (
                          <span key={idx} className="bg-white/5 border border-white/10 text-white/40 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded lowercase">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Escrow payout ledger */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h2 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2">
            <BookOpen size={16} className="text-white/40" />
            <span>Escrow & Payout Ledger</span>
          </h2>

          <div className="bg-neutral-950 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
            {completedSessions.length === 0 ? (
              <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider text-center py-6">No historical payouts logged.</p>
            ) : (
              completedSessions.map((session) => (
                <div key={session.id} className="border-b border-white/5 last:border-none pb-2.5 last:pb-0 flex flex-col gap-1">
                  <div className="flex justify-between items-baseline">
                    <span className="font-sans font-black text-xs text-white uppercase tracking-tight truncate max-w-[120px]">{session.clientName}</span>
                    <span className="font-mono text-[10px] font-black text-green-400">+${session.amount} USDC</span>
                  </div>
                  <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest">{session.tierName}</p>
                  <span className="font-sans text-[8px] text-white/30 block mt-1">State: PAID & CLEARED</span>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
