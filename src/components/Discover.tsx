import React, { useState, useRef } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  CheckCircle, 
  Star, 
  Navigation,
  Compass,
  Sparkles,
  Lock,
  X,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { Provider } from '../types';

interface DiscoverProps {
  providers: Provider[];
  setCurrentTab: (tab: string) => void;
  setPreloadedProvider: (provider: Provider | null) => void;
  onDeployIntakeSession: (sessionData: any) => void;
  liquidBalance: number;
}

export default function Discover({ 
  providers, 
  setCurrentTab, 
  setPreloadedProvider,
  onDeployIntakeSession,
  liquidBalance
}: DiscoverProps) {
  const [selectedProviderId, setSelectedProviderId] = useState<string>('1');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  // Intake Form Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [intakeLocation, setIntakeLocation] = useState('Room 402, Server Cluster Delta');
  const [intakeNotes, setIntakeNotes] = useState('Please verify the backup redundant power lines before mounting. All Ethernet lines must be color-coded in light blue.');
  const [intakePriority, setIntakePriority] = useState<'low' | 'medium' | 'high'>('high');
  const [selectedTierIndex, setSelectedTierIndex] = useState(1); // Defaults to Tier 2
  const [isSecuring, setIsSecuring] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const carouselRef = useRef<HTMLDivElement>(null);
  const activeProvider = providers.find(p => p.id === selectedProviderId) || providers[0];

  // Lookup of customized tiers based on selected provider
  const getProviderTiers = (providerId: string) => {
    const tierMap: Record<string, Array<{ name: string; amount: number; description: string }>> = {
      '1': [
        { name: 'Tier 1: Basic Site Assessment', amount: 150, description: 'Initial site walkthrough, wireline path planning, and physical layout recommendations.' },
        { name: 'Tier 2: Enterprise Installation', amount: 680, description: 'Structured cabling setup, patch panel termination, color-coded Ethernet bundling, and Escrow testing.' },
        { name: 'Tier 3: Fiber Optic Splicing', amount: 1250, description: 'High-precision fiber splicing, OTDR validation logs, security audits, and real-time Agora RTC deployment guidance.' }
      ],
      '2': [
        { name: 'Tier 1: Pressure Diagnostics', amount: 120, description: 'System leakage pressure scans, volumetric flow analysis, and pipe structural audits.' },
        { name: 'Tier 2: Hydraulic System Install', amount: 550, description: 'Full hydraulic valve alignment, pressure regulator setups, and secure backup flow deployment.' },
        { name: 'Tier 3: High-Flow Retrofitting', amount: 980, description: 'Advanced heavy-industrial high-flow pipe retrofitting, sub-zero coolant seals, and 12-month node stasis warranty.' }
      ],
      '3': [
        { name: 'Tier 1: Initial Architecture Blueprint', amount: 250, description: 'Zero-trust layout blueprinted maps, threat-model mapping, and network credential specs.' },
        { name: 'Tier 2: Redundant Setup Design', amount: 720, description: 'Multi-sig cluster architecture, load balancer blueprints, and high-availability gateway integrations.' },
        { name: 'Tier 3: Cluster Auditing & Hardening', amount: 1100, description: 'Deep security exploit testing, quantum-resistant keys setup, and certified cryptographic state attestation.' }
      ]
    };
    return tierMap[providerId] || tierMap['1'];
  };

  const providerTiers = getProviderTiers(activeProvider?.id || '1');
  const currentTier = providerTiers[selectedTierIndex];

  const handleProviderSelect = (id: string) => {
    setSelectedProviderId(id);
    const cardElement = document.getElementById(`worker-card-${id}`);
    if (cardElement && carouselRef.current) {
      cardElement.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }
  };

  const handleOpenBookingModal = (provider: Provider) => {
    setSelectedProviderId(provider.id);
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleDeployIntake = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (currentTier.amount > liquidBalance) {
      setErrorMsg(`Insufficient wallet funds. Cost: $${currentTier.amount.toLocaleString()}, Balance: $${liquidBalance.toLocaleString()}`);
      return;
    }

    setIsSecuring(true);

    // Simulated zero-trust smart contract deployment latency
    setTimeout(() => {
      onDeployIntakeSession({
        provider: activeProvider,
        tier: currentTier,
        location: intakeLocation,
        notes: intakeNotes,
        priority: intakePriority,
        amount: currentTier.amount
      });
      setIsSecuring(false);
      setIsModalOpen(false);
      setCurrentTab('dashboard'); // Redirect to home dashboard
    }, 2000);
  };

  // Filter logic
  const filteredProviders = providers.filter(p => {
    const searchLower = searchTerm.toLowerCase();
    
    // Check main profile
    const matchesProfile = p.name.toLowerCase().includes(searchLower) || 
                           p.specialty.toLowerCase().includes(searchLower) ||
                           p.category.toLowerCase().includes(searchLower);
                           
    // Check portfolio items (dynamic sync!)
    const matchesPortfolio = p.portfolio?.some(item => 
      item.title.toLowerCase().includes(searchLower) ||
      item.description.toLowerCase().includes(searchLower) ||
      item.tags?.some(tag => tag.toLowerCase().includes(searchLower))
    ) || false;

    const matchesSearch = matchesProfile || matchesPortfolio;
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });


  return (
    <div className="relative h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] w-full overflow-hidden flex flex-col animate-fade-in select-none">
      
      {/* Search Header Bar floating */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-[94%] max-w-2xl pointer-events-auto">
        <div className="bg-neutral-950 rounded-xl border border-white/20 shadow-ambient flex items-center p-2">
          <Search className="text-white/40 ml-2.5 shrink-0" size={18} />
          <input 
            type="text" 
            placeholder="Search verified node services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent border-none text-sm text-white px-3 py-2 outline-none focus:ring-0 placeholder-white/30"
          />
          <div className="h-6 w-px bg-white/15 mx-2"></div>
          <button className="flex items-center gap-1 px-3 py-1.5 text-white/60 hover:bg-white/5 hover:text-white rounded transition-colors font-mono text-[9px] font-bold uppercase tracking-wider">
            <SlidersHorizontal size={14} />
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-1.5 mt-3 overflow-x-auto pb-1 scrollbar-hide">
          {['All', 'Electrical', 'Plumbing'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded font-mono text-[9px] font-bold uppercase tracking-wider transition-all border ${
                activeCategory === cat
                  ? 'bg-white text-black border-white'
                  : 'bg-neutral-950 border-white/10 text-white/60 hover:bg-white/5'
              }`}
            >
              {cat === 'All' ? 'All Systems' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Map Interactive Canvas */}
      <div className="absolute inset-0 z-0 bg-black flex items-center justify-center overflow-hidden">
        
        {/* Decorative Grid vector map elements simulating Los Angeles / NY */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Simulated main roads */}
            <path d="M 0 150 C 300 220 500 120 900 350" fill="none" stroke="#ffffff" strokeWidth="2" strokeOpacity="0.5" />
            <path d="M 200 0 C 300 400 150 600 250 1000" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
            <path d="M 600 0 C 450 300 700 700 800 1000" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeOpacity="0.5" />
            <path d="M 0 500 Q 400 400 1200 650" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="5,5" strokeOpacity="0.3" />
            
            {/* Built up zone cards */}
            <rect x="240" y="280" width="160" height="110" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <rect x="100" y="450" width="120" height="150" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
            <rect x="650" y="200" width="180" height="130" rx="4" fill="#000000" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.2" />
          </svg>
        </div>

        {/* Map Center Coordinate Indicator */}
        <div className="absolute top-24 left-6 bg-neutral-950/90 backdrop-blur-md px-3 py-1.5 rounded border border-white/15 shadow-sm font-mono text-[8px] text-white/60 z-10 flex items-center gap-1.5 uppercase tracking-wider">
          <Navigation size={10} className="text-white animate-pulse" />
          <span>COORD: 34.0522° N, 118.2437° W (LA CLUSTER)</span>
        </div>

        {/* Map Pins */}
        {filteredProviders.map((prov) => {
          const isSelected = selectedProviderId === prov.id;
          
          // Map offsets for simulated placement
          const positions: Record<string, { top: string; left: string }> = {
            '1': { top: '65%', left: '33%' }, // Elias
            '2': { top: '48%', left: '68%' }, // Sarah
            '3': { top: '35%', left: '25%' }  // Marcus
          };
          
          const pos = positions[prov.id] || { top: '50%', left: '50%' };

          return (
            <button
              key={prov.id}
              onClick={() => handleProviderSelect(prov.id)}
              style={{ top: pos.top, left: pos.left }}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-all duration-300"
            >
              {/* Radial pulse */}
              {isSelected && (
                <div className="absolute -inset-4 bg-white/20 rounded-full animate-ping pointer-events-none duration-1000"></div>
              )}
              
              <div className={`relative p-1 rounded-full shadow-priority border transition-all duration-300 ${
                isSelected 
                  ? 'bg-white border-white scale-110 text-black' 
                  : 'bg-black border-white/20 group-hover:scale-105 text-white'
              }`}>
                <img 
                  src={prov.avatar} 
                  alt={prov.name}
                  className="w-10 h-10 rounded-full object-cover" 
                />
                
                {prov.verified && (
                  <div className="absolute -top-1 -right-1 bg-white text-black rounded-full p-0.5 border border-black">
                    <CheckCircle size={8} className="fill-black text-white" />
                  </div>
                )}
              </div>

              {/* Tag below pin */}
              <div className={`mt-1.5 px-2.5 py-0.5 rounded border shadow-sm flex items-center gap-1 transition-all ${
                isSelected
                  ? 'bg-white border-white text-black font-black'
                  : 'bg-black border-white/20 text-white/75'
              }`}>
                <Star size={10} className={isSelected ? 'text-black fill-black' : 'text-white/60 fill-white/60'} />
                <span className="font-mono text-[9px] font-bold leading-none">{prov.rating}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Floating Bottom sheet carousel of Providers */}
      <div className="absolute bottom-20 md:bottom-6 left-0 w-full z-10 pointer-events-none overflow-hidden">
        <div 
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-4 px-6 pb-4 max-w-4xl mx-auto pointer-events-auto"
        >
          {filteredProviders.length === 0 ? (
            <div className="snap-center shrink-0 w-full bg-neutral-950 rounded-xl border border-white/20 shadow-priority p-6 text-center">
              <Compass size={32} className="text-white/50 mx-auto mb-2" />
              <p className="font-sans text-xs text-white/60 font-bold uppercase tracking-wider">No active systems found in this sector.</p>
            </div>
          ) : (
            filteredProviders.map((prov) => {
              const isSelected = selectedProviderId === prov.id;
              
              return (
                <div
                  key={prov.id}
                  id={`worker-card-${prov.id}`}
                  onClick={() => setSelectedProviderId(prov.id)}
                  className={`snap-center shrink-0 w-[90%] sm:w-[80%] md:w-full md:max-w-2xl bg-neutral-950 rounded-2xl border transition-all duration-300 p-5 md:p-6 shadow-priority relative overflow-hidden cursor-pointer ${
                    isSelected 
                      ? 'border-white opacity-100 scale-100' 
                      : 'border-white/10 opacity-50 scale-[0.98]'
                  }`}
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-white"></div>
                  
                  <div className="flex items-start gap-4 text-white">
                    <div className="relative shrink-0">
                      <img 
                        src={prov.avatar} 
                        alt={prov.name}
                        className="w-14 h-14 rounded object-cover border border-white/20 shadow-sm" 
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-sans font-black text-base md:text-lg text-white uppercase tracking-tight truncate">{prov.name}</h3>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1">
                            <span className="bg-white/10 text-white text-[8px] font-mono font-bold px-2 py-0.5 rounded border border-white/15 flex items-center gap-1 uppercase tracking-wider">
                              <CheckCircle size={8} />
                              VERIFIED NODE
                            </span>
                            <span className="text-white/50 font-sans text-xs">Tier {prov.tier} System</span>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1 justify-end">
                            <Star size={14} className="text-white fill-white" />
                            <span className="font-mono text-sm font-black text-white">{prov.rating}</span>
                          </div>
                          <span className="font-mono text-[9px] text-white/40 uppercase tracking-wider">{prov.distance}</span>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/10 pt-3">
                        <div>
                          <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block font-bold">Specialty</span>
                          <span className="font-sans text-xs text-white font-bold uppercase tracking-wider">{prov.specialty}</span>
                        </div>
                        <div>
                          <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block font-bold">Hourly rate</span>
                          <span className="font-mono text-xs text-white font-black">${prov.estRate}/hr</span>
                        </div>
                      </div>

                      {/* Browsable Portfolio Catalog past works */}
                      {prov.portfolio && prov.portfolio.length > 0 && (
                        <div className="mt-4 border-t border-white/10 pt-3">
                          <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block font-black mb-2">Past Executed Case Studies ({prov.portfolio.length})</span>
                          <div className="flex flex-col gap-2 max-h-36 overflow-y-auto pr-1">
                            {prov.portfolio.map((item) => {
                              const matchesTitle = searchTerm && item.title.toLowerCase().includes(searchTerm.toLowerCase());
                              const matchesDesc = searchTerm && item.description.toLowerCase().includes(searchTerm.toLowerCase());
                              const matchesTag = searchTerm && item.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
                              const isMatched = matchesTitle || matchesDesc || matchesTag;

                              return (
                                <div key={item.id} className={`p-2.5 rounded bg-white/5 border text-left flex items-start gap-2.5 transition-all ${
                                  isMatched ? 'border-amber-500 bg-amber-500/5' : 'border-white/5'
                                }`}>
                                  {item.imageUrl && (
                                    <img src={item.imageUrl} alt={item.title} className="w-10 h-10 rounded object-cover border border-white/10 shrink-0 mt-0.5" />
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline gap-2">
                                      <h5 className="font-sans font-black text-[10px] text-white uppercase tracking-wider truncate">{item.title}</h5>
                                      <span className="font-mono text-[7px] text-white/30 uppercase shrink-0">{item.category}</span>
                                    </div>
                                    <p className="text-[10px] text-white/50 leading-relaxed font-medium line-clamp-2 mt-0.5">{item.description}</p>
                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                      {item.tags?.map((t, idx) => (
                                        <span key={idx} className={`text-[7px] font-mono px-1.5 py-0.5 rounded border ${
                                          searchTerm && t.toLowerCase().includes(searchTerm.toLowerCase())
                                            ? 'bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold'
                                            : 'bg-white/5 text-white/40 border-white/5'
                                        }`}>
                                          #{t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      <div className="mt-4 flex flex-col sm:flex-row gap-3">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBookingModal(prov);
                          }}
                          className="flex-1 bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-wider py-2.5 px-4 rounded transition-colors text-center flex items-center justify-center gap-1.5"
                        >
                          <Sparkles size={12} />
                          <span>Deploy Contract Quote</span>
                        </button>
                        <button 
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 bg-white/5 hover:bg-white/10 text-white/80 font-mono text-[10px] font-black uppercase tracking-wider py-2.5 px-4 rounded border border-white/15 transition-colors text-center"
                        >
                          Audit Credentials
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* INTAKE FORM & ESCROW LOCK MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-fade-in">
          <div className="bg-neutral-950 border border-white/20 text-white w-full max-w-xl rounded-2xl p-6 relative overflow-hidden flex flex-col gap-6 shadow-priority max-h-[92vh] overflow-y-auto">
            <div className="absolute top-0 left-0 w-full h-1 bg-white"></div>
            
            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[8px] text-white/45 uppercase tracking-widest font-black block">Client Portal // Secure Booking</span>
                <h3 className="font-sans font-black text-lg uppercase tracking-tight text-white mt-1">Configure Intake & Escrow</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white p-1 border border-white/10 hover:border-white rounded transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {errorMsg && (
              <div className="bg-rose-950 border border-rose-800 rounded-xl p-3.5 flex items-start gap-2.5 text-rose-200">
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span className="text-[10px] font-mono uppercase tracking-wider font-semibold">{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleDeployIntake} className="flex flex-col gap-5">
              
              {/* Selected Provider Details */}
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl">
                <img 
                  src={activeProvider.avatar} 
                  alt={activeProvider.name} 
                  className="w-10 h-10 rounded object-cover border border-white/25"
                />
                <div>
                  <h4 className="font-sans font-black text-xs text-white uppercase tracking-wider">{activeProvider.name}</h4>
                  <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest mt-0.5">{activeProvider.specialty} // RATE: ${activeProvider.estRate}/HR</p>
                </div>
              </div>

              {/* Service Tier List Preset Selection */}
              <div className="flex flex-col gap-2">
                <span className="font-mono text-[8px] text-white/45 uppercase tracking-widest font-black block">Select Service Tier</span>
                <div className="flex flex-col gap-2">
                  {providerTiers.map((tier, idx) => {
                    const isSelected = selectedTierIndex === idx;
                    return (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => setSelectedTierIndex(idx)}
                        className={`text-left p-3 rounded-xl border flex justify-between items-start gap-3 transition-all cursor-pointer ${
                          isSelected 
                            ? 'bg-white text-black border-white' 
                            : 'bg-neutral-900 border-white/5 text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex-1 min-w-0">
                          <span className={`font-sans font-black text-xs uppercase tracking-wide block ${isSelected ? 'text-black' : 'text-white'}`}>{tier.name}</span>
                          <p className={`text-[10px] leading-relaxed mt-1 font-medium ${isSelected ? 'text-black/75' : 'text-white/50'}`}>{tier.description}</p>
                        </div>
                        <span className={`font-mono text-xs font-black shrink-0 ${isSelected ? 'text-black' : 'text-white'}`}>${tier.amount} USDC</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location Coordination */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/45 uppercase tracking-widest font-black" htmlFor="intake-loc">Target Coordinate Location</label>
                  <input 
                    type="text" 
                    id="intake-loc"
                    value={intakeLocation}
                    onChange={(e) => setIntakeLocation(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-bold"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[8px] text-white/45 uppercase tracking-widest font-black" htmlFor="intake-priority">Priority</label>
                  <select
                    id="intake-priority"
                    value={intakePriority}
                    onChange={(e) => setIntakePriority(e.target.value as any)}
                    className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-bold cursor-pointer"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
              </div>

              {/* Intake Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[8px] text-white/45 uppercase tracking-widest font-black" htmlFor="intake-notes">Operational Scope Instructions</label>
                <textarea 
                  id="intake-notes"
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-white leading-relaxed resize-none"
                  rows={2}
                />
              </div>

              {/* Financial commitment lock panel */}
              <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block font-black">Escrow Lock Amount</span>
                  <span className="font-mono text-sm font-black text-white">${currentTier.amount} USDC</span>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block font-black">Your wallet balance</span>
                  <span className="font-mono text-xs font-bold text-white/60">${liquidBalance.toLocaleString()} USDC</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSecuring}
                className="w-full bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-widest py-3.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:bg-neutral-800 disabled:text-white/40 transition-all active:scale-95"
              >
                {isSecuring ? (
                  <>
                    <RefreshCw size={12} className="animate-spin" />
                    <span>Deploying Escrow Vault...</span>
                  </>
                ) : (
                  <>
                    <Lock size={12} />
                    <span>Lock Escrow & Deploy Intake</span>
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

