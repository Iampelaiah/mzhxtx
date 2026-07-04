import React, { useState, useMemo } from 'react';
import { 
  ShieldCheck, 
  CreditCard, 
  History, 
  Clock, 
  User, 
  SlidersHorizontal, 
  Search,
  Plus,
  Smile,
  Coffee,
  Lock,
  Briefcase,
  Utensils,
  Navigation,
  ArrowRight,
  Shield,
  CheckCircle,
  Sparkles,
  Info,
  Star,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Compass,
  FileText
} from 'lucide-react';
import { ClientSession, Provider, PortfolioItem } from '../types';

interface ClientDashboardProps {
  sessions: ClientSession[];
  liquidBalance: number;
  escrowBalance: number;
  setCurrentTab: (tab: string) => void;
  onJoinSession: (sessionId: string) => void;
  providers?: Provider[];
  onDeployIntakeSession?: (sessionData: any) => void;
}

export default function ClientDashboard({ 
  sessions, 
  liquidBalance, 
  escrowBalance, 
  setCurrentTab,
  onJoinSession,
  providers = [],
  onDeployIntakeSession
}: ClientDashboardProps) {
  // Bio/Profile configurations
  const [bio, setBio] = useState('Principal Cryptographic Systems Architect focusing on zero-trust validation grids.');
  const [isEditing, setIsEditing] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Electrical' | 'Plumbing'>('All');
  const [sortBy, setSortBy] = useState<'ranking' | 'proximity' | 'availability'>('ranking');

  // Selected map pin or active worker detail
  const [selectedProviderId, setSelectedProviderId] = useState<string>('1');

  // Intake/Booking Modal state
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [modalProvider, setModalProvider] = useState<Provider | null>(null);
  const [selectedTierIndex, setSelectedTierIndex] = useState(1); // Default to Tier 2 (Enterprise)
  const [intakeLocation, setIntakeLocation] = useState('Room 402, Server Cluster Delta');
  const [intakeNotes, setIntakeNotes] = useState('Deploy structured cabling, verify 3-phase power, and establish multi-sig stasis vaults.');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  // Active sessions & history
  const activeSessions = sessions.filter(s => s.status !== 'Completed');
  const completedSessions = sessions.filter(s => s.status === 'Completed');

  // Center coordinate for proximity calculation: (34.0522, -118.2437)
  const centerLat = 34.0522;
  const centerLng = -118.2437;

  // Processed providers with calculated fields
  const processedProviders = useMemo(() => {
    return providers.map(p => {
      // Calculate real Euclidean distance relative to our hub center
      const diffLat = p.lat - centerLat;
      const diffLng = p.lng - centerLng;
      const distance = Math.sqrt(diffLat * diffLat + diffLng * diffLng) * 69; // 69 miles per degree approx

      // Simulate availability based on ID
      let availabilityStatus: 'Available Now' | 'In Call' | 'Offline' = 'Available Now';
      if (p.id === '2') availabilityStatus = 'In Call';
      if (p.id === '3') availabilityStatus = 'Available Now';

      return {
        ...p,
        distance: Number(distance.toFixed(1)),
        availability: availabilityStatus
      };
    });
  }, [providers]);

  // Handle active selection matching
  const activeProvider = processedProviders.find(p => p.id === selectedProviderId) || processedProviders[0];

  // Map Filter and Sort Loops
  const filteredAndSortedProviders = useMemo(() => {
    let list = processedProviders.filter(p => {
      const query = searchTerm.toLowerCase();
      const matchesProfile = p.name.toLowerCase().includes(query) || 
                             p.specialty.toLowerCase().includes(query) ||
                             p.category.toLowerCase().includes(query);
                             
      const matchesPortfolio = p.portfolio?.some(item => 
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.tags?.some(tag => tag.toLowerCase().includes(query))
      ) || false;

      const matchesSearch = matchesProfile || matchesPortfolio;
      const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Apply Sorting
    if (sortBy === 'ranking') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'proximity') {
      list.sort((a, b) => (a.distance || 0) - (b.distance || 0));
    } else if (sortBy === 'availability') {
      // Prioritize Available Now
      const getPriority = (status: string) => {
        if (status === 'Available Now') return 3;
        if (status === 'In Call') return 2;
        return 1;
      };
      list.sort((a, b) => getPriority(b.availability) - getPriority(a.availability));
    }

    return list;
  }, [processedProviders, searchTerm, selectedCategory, sortBy]);

  // Service tiers for the selected provider
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

  const activeProviderTiers = getProviderTiers(activeProvider?.id || '1');

  const handleOpenBooking = (provider: Provider) => {
    setModalProvider(provider);
    setSelectedTierIndex(1); // Default to Tier 2
    setShowBookingModal(true);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onDeployIntakeSession || !modalProvider) return;

    const providerTiers = getProviderTiers(modalProvider.id);
    const selectedTier = providerTiers[selectedTierIndex] || providerTiers[0];

    if (liquidBalance < selectedTier.amount) {
      alert(`Insufficient liquid USDC funds to deploy this stasis escrow vault. Cost: $${selectedTier.amount}, Balance: $${liquidBalance}`);
      return;
    }

    setIsBookingLoading(true);

    setTimeout(() => {
      onDeployIntakeSession({
        provider: modalProvider,
        tier: selectedTier,
        amount: selectedTier.amount,
        location: intakeLocation,
        notes: intakeNotes,
        priority: 'medium'
      });
      setIsBookingLoading(false);
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setShowBookingModal(false);
      }, 1500);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-7xl mx-auto select-none">
      
      {/* Top Glassmorphic HUD Bar for Client Balance */}
      <div className="bg-neutral-950 border border-white/15 rounded-2xl p-5 md:p-6 relative overflow-hidden shadow-priority">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded overflow-hidden border border-white/20 shrink-0">
              <img 
                className="w-full h-full object-cover" 
                alt="Aditya Sheral Profile" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSs3rwbjhw8DsrLXLpyUdHP4fKUK-BwItpliioFe_g7yfxsoFNt8Y432a2qUMgGWvUiPuYKXf_YFBxIExe9cMOkAKCp_tmO_klQ8a4VMlEhJ1qXzTZCD4mle_qjQlh8-L6-MT2-1Ob2fct1yde6AY4RaFDMGkF7O4GbPyvc7ZEm7tgvbEnmjX9WlXb9qp085Orc6Q9R4v_Q8zL2Bjo9JmtUodAJnMbO4Ll6sfy8OfmJAi4taSfC43XtwIvKockS40rlsonAh8FMA0"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-sans font-black text-lg text-white uppercase tracking-tight">Aditya Sheral</h1>
                <span className="bg-white/10 text-white text-[7px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/15 flex items-center gap-0.5 uppercase tracking-wider">
                  <ShieldCheck size={8} />
                  TRUST SCORE: A+
                </span>
              </div>
              <p className="font-mono text-[8px] text-white/40 uppercase tracking-widest mt-0.5">CLIENT ENDPOINT // ADITYA_SHERAL_NODE_X</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 w-full sm:w-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 flex-1 sm:flex-none">
              <div className="p-1.5 bg-white/5 rounded text-white">
                <CreditCard size={12} />
              </div>
              <div>
                <span className="font-mono text-[7px] text-white/40 uppercase tracking-wider block font-bold">Liquid Balance</span>
                <span className="font-mono text-sm font-black text-white">${liquidBalance.toLocaleString()} <span className="text-[9px] text-white/50">USDC</span></span>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3 flex-1 sm:flex-none">
              <div className="p-1.5 bg-white/5 rounded text-white">
                <ShieldCheck size={12} />
              </div>
              <div>
                <span className="font-mono text-[7px] text-white/40 uppercase tracking-wider block font-bold">Escrow Committed</span>
                <span className="font-mono text-sm font-black text-white">${escrowBalance.toLocaleString()} <span className="text-[9px] text-white/50">USDC</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Spacious Dashboard Layout Grid - No Mockup Phone Device! */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Map & Interactive Filtering Radar (lg:col-span-8) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Header & Status Indicator */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-sans font-black text-lg text-white uppercase tracking-tight flex items-center gap-2">
                <Compass size={20} className="text-white/80" />
                <span>Geospatial Specialist Grid</span>
              </h2>
              <p className="font-mono text-[8.5px] text-white/40 uppercase tracking-widest mt-0.5">Aditya Sheral // Location Coordinates: (34.0522, -118.2437)</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-mono text-[8px] text-emerald-400 uppercase tracking-widest font-bold">RADIR BEACON ONLINE</span>
            </div>
          </div>

          {/* LARGE SPACOUS MAP CONTAINER (DIRECT EMBED - NO MOBILE PHONE DEVICE MOCKUP FRAME!) */}
          <div className="w-full bg-[#D3DFE8] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 aspect-[16/9] md:aspect-[21/9] min-h-[350px]">
            
            {/* SVG Interactive Map Grid */}
            <svg className="absolute inset-0 w-full h-full select-none" viewBox="0 0 800 350" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Green recreational zones */}
              <rect x="50" y="30" width="140" height="90" rx="16" fill="#E4ECE3" />
              <rect x="620" y="210" width="150" height="110" rx="24" fill="#E4ECE3" />
              <circle cx="120" cy="270" r="60" fill="#E4ECE3" />
              
              {/* River Body (Light flowing blue-green) */}
              <path d="M720 -20 C680 90, 760 160, 720 240 C690 300, 610 330, 640 410" stroke="#C3D5E6" strokeWidth="45" strokeLinecap="round" strokeLinejoin="round" />
              
              {/* Grid Lines */}
              <line x1="0" y1="70" x2="800" y2="70" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="0" y1="140" x2="800" y2="140" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="0" y1="210" x2="800" y2="210" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="0" y1="280" x2="800" y2="280" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="150" y1="0" x2="150" y2="350" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="300" y1="0" x2="300" y2="350" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="450" y1="0" x2="450" y2="350" stroke="#E3EAF0" strokeWidth="0.75" />
              <line x1="600" y1="0" x2="600" y2="350" stroke="#E3EAF0" strokeWidth="0.75" />

              {/* Major Streets & Highways (Wider white roads) */}
              <path d="M-20 80 L350 180 L820 240" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />
              <path d="M300 -20 L270 120 L440 260 L620 370" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />
              <path d="M-20 280 L280 230 L550 150" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
              <path d="M120 370 L380 230 L590 120" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />

              {/* Highway dashes */}
              <path d="M-20 80 L350 180 L820 240" stroke="#EAF2F7" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" />
              <path d="M300 -20 L270 120 L440 260 L620 370" stroke="#EAF2F7" strokeWidth="1.5" strokeDasharray="5,5" strokeLinecap="round" />

              {/* Street Typography */}
              <text x="410" y="105" fill="#93A2AE" fontSize="8" fontFamily="monospace" fontWeight="semibold" transform="rotate(11, 410, 105)" letterSpacing="0.1em">Severnyy Prospekt</text>
              <text x="310" y="160" fill="#93A2AE" fontSize="8" fontFamily="monospace" fontWeight="semibold" transform="rotate(45, 310, 160)" letterSpacing="0.05em">Ulitsa Akademika Baykova</text>
              <text x="85" y="250" fill="#93A2AE" fontSize="8" fontFamily="monospace" fontWeight="semibold" transform="rotate(-10, 85, 250)" letterSpacing="0.05em">pr. Nauki</text>
            </svg>

            {/* FLOATING ACTION INTERACTIVE PINS */}
            
            {/* PIN 1: ELIAS VANCE (Pink Coffee Cup) */}
            {processedProviders.find(p => p.id === '1') && (
              <button 
                onClick={() => setSelectedProviderId('1')}
                className={`absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  selectedProviderId === '1' ? 'scale-125 z-20' : 'hover:scale-110'
                }`}
                style={{ left: '55%', top: '48%' }}
              >
                <div className={`p-1.5 bg-white rounded-2xl shadow-xl border-2 flex items-center justify-center transition-all ${
                  selectedProviderId === '1' ? 'border-pink-500 shadow-pink-200 shadow-lg' : 'border-white'
                }`}>
                  <div className="w-8 h-8 rounded-xl bg-pink-500 flex items-center justify-center text-white">
                    <Coffee size={16} />
                  </div>
                </div>
              </button>
            )}

            {/* PIN 2: SAMANTHA CROFT (Blue Briefcase) */}
            {processedProviders.find(p => p.id === '2') && (
              <button 
                onClick={() => setSelectedProviderId('2')}
                className={`absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  selectedProviderId === '2' ? 'scale-125 z-20' : 'hover:scale-110'
                }`}
                style={{ left: '26%', top: '35%' }}
              >
                <div className={`p-1.5 bg-white rounded-2xl shadow-xl border-2 flex items-center justify-center transition-all ${
                  selectedProviderId === '2' ? 'border-blue-500 shadow-blue-200 shadow-lg' : 'border-white'
                }`}>
                  <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center text-white">
                    <Briefcase size={14} />
                  </div>
                </div>
              </button>
            )}

            {/* PIN 3: MARCUS THORNE (Yellow Utensils) */}
            {processedProviders.find(p => p.id === '3') && (
              <button 
                onClick={() => setSelectedProviderId('3')}
                className={`absolute transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 ${
                  selectedProviderId === '3' ? 'scale-125 z-20' : 'hover:scale-110'
                }`}
                style={{ left: '72%', top: '65%' }}
              >
                <div className={`p-1.5 bg-white rounded-2xl shadow-xl border-2 flex items-center justify-center transition-all ${
                  selectedProviderId === '3' ? 'border-amber-500 shadow-amber-200 shadow-lg' : 'border-white'
                }`}>
                  <div className="w-8 h-8 rounded-xl bg-amber-500 flex items-center justify-center text-white">
                    <Utensils size={14} />
                  </div>
                </div>
              </button>
            )}

            {/* CURRENT USER HUB BLUE DOT */}
            <div className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ left: '48%', top: '45%' }}>
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-blue-500/20 animate-ping"></div>
                <div className="w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-xl"></div>
              </div>
            </div>

            {/* Active Provider mini HUD on Map */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/85 backdrop-blur-md border border-white/10 p-3.5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white max-w-xl">
              <div className="flex items-center gap-3">
                <img src={activeProvider.avatar} alt={activeProvider.name} className="w-9 h-9 rounded-full border border-white/20 object-cover shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-sans font-black text-xs uppercase tracking-tight">{activeProvider.name}</span>
                    <span className="bg-white/15 text-[8px] font-mono font-bold px-1.5 py-0.2 rounded border border-white/10">{activeProvider.category}</span>
                  </div>
                  <p className="font-mono text-[9px] text-white/50 uppercase tracking-widest mt-0.5">{activeProvider.specialty} • {activeProvider.distance} miles away</p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[8px] font-mono font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                  activeProvider.availability === 'Available Now' 
                    ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40' 
                    : 'bg-amber-950/40 text-amber-400 border-amber-800/40'
                }`}>
                  {activeProvider.availability}
                </span>
                <button 
                  onClick={() => handleOpenBooking(activeProvider)}
                  className="bg-white hover:bg-neutral-200 text-black font-mono text-[9px] font-black uppercase tracking-wider py-1.5 px-3 rounded flex items-center gap-1 transition-all"
                >
                  <Plus size={11} className="stroke-[3]" />
                  <span>Deploy Contract</span>
                </button>
              </div>
            </div>

          </div>

          {/* ADVANCED ADVOCATED FILTERING PANEL (SEARCH, JOB TYPE, PROXIMITY, RANKING, AVAILABILITY) */}
          <div className="bg-neutral-950 border border-white/10 rounded-xl p-5 flex flex-col gap-4">
            
            {/* Section description */}
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5">
                <SlidersHorizontal size={14} className="text-white/40" />
                <span>Zero-Trust Directory Filters</span>
              </h3>
              <span className="font-mono text-[8px] text-white/30 uppercase tracking-widest">
                Showing {filteredAndSortedProviders.length} active node matches
              </span>
            </div>

            {/* Search Input and Job Type selection */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              
              {/* Search input (covers workers and tags) */}
              <div className="md:col-span-5 relative">
                <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black block mb-1.5">Search Keywords / Tags</label>
                <div className="relative">
                  <Search size={13} className="absolute left-3 top-2.5 text-white/40" />
                  <input 
                    type="text" 
                    placeholder="Search e.g. Elias, otdr, wiring..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-neutral-900 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white w-full font-bold"
                  />
                </div>
              </div>

              {/* Specialty filter */}
              <div className="md:col-span-3">
                <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black block mb-1.5">Job Type Specialty</label>
                <div className="flex gap-1 bg-neutral-900 border border-white/10 p-1 rounded-lg">
                  {(['All', 'Electrical', 'Plumbing'] as const).map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex-1 text-center py-1 rounded text-[8px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                        selectedCategory === cat 
                          ? 'bg-white text-black' 
                          : 'text-white/55 hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sorting Selector: Ranking, Proximity, Availability */}
              <div className="md:col-span-4">
                <label className="font-mono text-[8px] text-white/40 uppercase tracking-widest font-black block mb-1.5">Filter & Sort By Vector</label>
                <div className="grid grid-cols-3 gap-1 bg-neutral-900 border border-white/10 p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setSortBy('ranking')}
                    className={`text-center py-1 rounded text-[8px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      sortBy === 'ranking' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    Ranking
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('proximity')}
                    className={`text-center py-1 rounded text-[8px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      sortBy === 'proximity' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    Proximity
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('availability')}
                    className={`text-center py-1 rounded text-[8px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                      sortBy === 'availability' ? 'bg-white text-black' : 'text-white/55 hover:text-white'
                    }`}
                  >
                    Availability
                  </button>
                </div>
              </div>

            </div>

          </div>

          {/* FILTERED SPECIALISTS LISTING */}
          <div className="flex flex-col gap-4">
            <h3 className="font-sans font-black text-xs text-white uppercase tracking-wider flex items-center gap-1.5 px-1">
              <Star size={14} className="text-white/40" />
              <span>Matching Professional Service Nodes</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredAndSortedProviders.map((prov) => {
                const isSelected = prov.id === selectedProviderId;
                return (
                  <div 
                    key={prov.id}
                    onClick={() => setSelectedProviderId(prov.id)}
                    className={`bg-neutral-950 border rounded-2xl p-5 flex flex-col gap-4 hover:border-white/25 transition-all cursor-pointer text-left relative overflow-hidden ${
                      isSelected ? 'border-white ring-1 ring-white/15' : 'border-white/10'
                    }`}
                  >
                    {/* Corner badge for ranking metric */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <div className="flex items-center gap-0.5 text-amber-400 bg-amber-400/5 px-2 py-0.5 rounded border border-amber-500/20">
                        <Star size={10} className="fill-amber-400" />
                        <span className="font-mono text-[9px] font-bold">{prov.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <img src={prov.avatar} alt={prov.name} className="w-11 h-11 rounded-xl object-cover border border-white/15 shrink-0" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-sans font-black text-sm text-white uppercase tracking-tight truncate">{prov.name}</h4>
                          {prov.verified && (
                            <span className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 rounded px-1 py-0.2 text-[6.5px] font-mono font-bold uppercase tracking-wider">
                              VERIFIED
                            </span>
                          )}
                        </div>
                        <p className="font-mono text-[8.5px] text-white/50 uppercase tracking-widest mt-1">{prov.specialty}</p>
                      </div>
                    </div>

                    {/* Proximity / Distance and availability info blocks */}
                    <div className="grid grid-cols-3 gap-2 border-t border-b border-white/5 py-2 text-center">
                      <div>
                        <span className="font-mono text-[6.5px] text-white/40 uppercase block font-black">Proximity</span>
                        <span className="font-mono text-[10px] font-bold text-white/80">{prov.distance} mi</span>
                      </div>
                      <div>
                        <span className="font-mono text-[6.5px] text-white/40 uppercase block font-black">Escrow Rate</span>
                        <span className="font-mono text-[10px] font-bold text-white/80">${prov.estRate}/hr</span>
                      </div>
                      <div>
                        <span className="font-mono text-[6.5px] text-white/40 uppercase block font-black">Availability</span>
                        <span className={`font-mono text-[8.5px] font-black uppercase ${
                          prov.availability === 'Available Now' ? 'text-emerald-400' : 'text-amber-400'
                        }`}>
                          {prov.availability === 'Available Now' ? 'Online' : 'In Session'}
                        </span>
                      </div>
                    </div>

                    {/* Showcase past portfolio jobs sync! */}
                    {prov.portfolio && prov.portfolio.length > 0 && (
                      <div className="flex flex-col gap-1.5 bg-white/5 border border-white/5 p-3 rounded-xl">
                        <span className="font-mono text-[7px] text-white/40 uppercase tracking-widest block font-black">Synced Portfolio Item</span>
                        {prov.portfolio.map((port) => (
                          <div key={port.id} className="flex gap-2">
                            {port.imageUrl && (
                              <img src={port.imageUrl} alt={port.title} className="w-8 h-8 rounded object-cover border border-white/10 shrink-0" />
                            )}
                            <div className="min-w-0">
                              <h5 className="font-sans font-black text-[9px] text-white uppercase tracking-wider truncate">{port.title}</h5>
                              <p className="text-[9px] text-white/50 line-clamp-2 leading-tight font-medium mt-0.5">{port.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenBooking(prov);
                        }}
                        className="flex-1 bg-white hover:bg-neutral-200 text-black font-mono text-[9px] font-black uppercase tracking-widest py-2 rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Lock size={10} />
                        <span>Deploy Escrow Contract</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Active Engagements & System History Logs (lg:col-span-4) */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Active engagements tracker */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-black text-xs text-white uppercase tracking-tight flex items-center gap-2">
              <Clock size={15} className="text-white/40" />
              <span>Active Service Engagements</span>
            </h3>

            <div className="flex flex-col gap-3">
              {activeSessions.length === 0 ? (
                <div className="bg-neutral-950 border border-dashed border-white/20 rounded-xl p-6 text-center flex flex-col items-center gap-2">
                  <span className="font-mono text-[9px] text-white/45 uppercase">No active pipeline requests</span>
                  <p className="text-[10px] text-white/30 text-center leading-normal">Select a specialty node on the map and tap the blue plus button to fund an escrow contract.</p>
                </div>
              ) : (
                activeSessions.map((session) => (
                  <div key={session.id} className="bg-neutral-950 border border-white/10 rounded-xl p-4 flex flex-col gap-3 hover:border-white/20 transition-all relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-l-xl"></div>
                    
                    <div className="flex justify-between items-start gap-2">
                      <div className="min-w-0">
                        <h4 className="font-sans font-black text-xs text-white uppercase tracking-tight truncate">{session.tierName}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <img src={session.providerAvatar} alt={session.providerName} className="w-4 h-4 rounded-full border border-white/10" />
                          <span className="font-sans text-[10px] text-white/70 font-semibold">{session.providerName}</span>
                        </div>
                      </div>
                      <span className={`text-[7px] font-mono font-black uppercase tracking-wider px-1.5 py-0.5 rounded border ${
                        session.status === 'Pending' 
                          ? 'bg-amber-950/40 text-amber-300 border-amber-800/30' 
                          : 'bg-white text-black border-white animate-pulse'
                      }`}>
                        {session.status}
                      </span>
                    </div>

                    <div className="flex justify-between items-center border-t border-white/5 pt-2 text-[9px] font-mono text-white/50">
                      <span>Vault Lock: ${session.amount} USDC</span>
                      {session.status === 'In_Progress' ? (
                        <button 
                          onClick={() => onJoinSession(session.id)}
                          className="bg-white text-black font-black uppercase px-2 py-1 rounded text-[8px] tracking-wider cursor-pointer active:scale-95"
                        >
                          Join Room
                        </button>
                      ) : (
                        <span className="text-white/30 uppercase tracking-widest text-[8px]">Pending Accept</span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* History logging feed */}
          <div className="flex flex-col gap-3">
            <h3 className="font-sans font-black text-xs text-white uppercase tracking-tight flex items-center gap-2">
              <History size={15} className="text-white/40" />
              <span>Fulfillment History Logs</span>
            </h3>

            <div className="bg-neutral-950 border border-white/10 rounded-xl p-4 flex flex-col gap-3">
              {completedSessions.length === 0 ? (
                <p className="text-[9px] font-mono text-white/40 uppercase tracking-wider text-center py-4">No historical logs written</p>
              ) : (
                completedSessions.map((session) => (
                  <div key={session.id} className="border-b border-white/5 last:border-none pb-2 flex flex-col gap-1">
                    <div className="flex justify-between items-baseline gap-2">
                      <span className="font-sans font-black text-[10px] text-white uppercase tracking-tight truncate">{session.providerName}</span>
                      <span className="font-mono text-[9px] font-black text-green-400">+${session.amount} USDC</span>
                    </div>
                    <p className="font-mono text-[8px] text-white/30 uppercase tracking-widest leading-none">{session.tierName}</p>
                    <span className="font-sans text-[7px] text-white/20 block">Verification closed & settled.</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>

      </div>

      {/* SECURE ESCROW BOOKING VAULT INTAKE MODAL */}
      {showBookingModal && modalProvider && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/20 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-scale-in">
            
            {/* Header cover graphic */}
            <div className="h-24 bg-neutral-900 border-b border-white/10 relative overflow-hidden flex flex-col justify-end p-5">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
              <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight flex items-center gap-2 relative z-10">
                <ShieldCheck className="text-white" size={16} />
                <span>Initiate Secure Escrow Intake</span>
              </h3>
              <p className="font-mono text-[8px] text-white/50 uppercase tracking-widest relative z-10 mt-1">Multi-sig vault deployment loop</p>
            </div>

            {/* Main Form content */}
            <form onSubmit={handleBookingSubmit} className="p-6 flex flex-col gap-4">
              
              {/* Selected Node Header */}
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center gap-3">
                <img src={modalProvider.avatar} alt={modalProvider.name} className="w-8 h-8 rounded-full border border-white/20" />
                <div>
                  <h4 className="font-sans font-black text-xs text-white uppercase leading-none">{modalProvider.name}</h4>
                  <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest block mt-1">{modalProvider.specialty}</span>
                </div>
              </div>

              {/* Tier options cards */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[7px] text-white/40 uppercase tracking-widest font-black">Select Milestone Tier Contract</label>
                <div className="flex flex-col gap-2">
                  {getProviderTiers(modalProvider.id).map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`text-left p-3 rounded-xl border flex justify-between items-center transition-all cursor-pointer ${
                        selectedTierIndex === idx 
                          ? 'bg-white border-white text-black font-black' 
                          : 'bg-neutral-900 border-white/10 text-white/70 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <span className="font-sans text-[10px] block font-bold leading-tight">{t.name}</span>
                        <span className="font-mono text-[7px] block uppercase mt-0.5 opacity-65">Release on milestone audit completion</span>
                      </div>
                      <span className="font-mono text-xs font-black">${t.amount} USDC</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Target Location Input */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[7px] text-white/40 uppercase tracking-widest font-black">Target Location Identifier</label>
                <input 
                  type="text" 
                  value={intakeLocation}
                  onChange={(e) => setIntakeLocation(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white font-bold focus:outline-none focus:border-white"
                  required
                />
              </div>

              {/* Intake Notes / operational case notes */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[7px] text-white/40 uppercase tracking-widest font-black">Operational Case Notes Scope</label>
                <textarea 
                  value={intakeNotes}
                  onChange={(e) => setIntakeNotes(e.target.value)}
                  className="bg-neutral-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white leading-relaxed focus:outline-none focus:border-white"
                  rows={2}
                  required
                />
              </div>

              {/* Balance assurance indicator */}
              <div className="bg-white/5 border border-white/15 p-3 rounded-xl flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={11} className="text-white" />
                  <span className="font-sans text-[9px] text-white/60 font-medium">Verified Wallet Balance Available</span>
                </div>
                <span className="font-mono text-[9px] text-white font-black">${liquidBalance.toLocaleString()} USDC</span>
              </div>

              {/* Controls */}
              <div className="flex gap-2.5 mt-2">
                <button 
                  type="submit" 
                  disabled={isBookingLoading || bookingSuccess}
                  className="flex-1 bg-white text-black font-mono text-[10px] font-black uppercase tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-transform"
                >
                  {isBookingLoading ? (
                    <span className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                  ) : bookingSuccess ? (
                    <span>Vault Deployed!</span>
                  ) : (
                    <>
                      <Sparkles size={11} />
                      <span>Deploy Stasis Vault</span>
                    </>
                  )}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowBookingModal(false)}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-mono text-[10px] font-black uppercase tracking-wider px-4 py-2.5 rounded-lg cursor-pointer"
                >
                  Dismiss
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
