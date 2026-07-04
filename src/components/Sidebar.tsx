import { 
  Shield, 
  Search, 
  PlusCircle, 
  Wallet, 
  Activity, 
  CheckCircle 
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  escrowBalance: number;
}

export default function Sidebar({ currentTab, setCurrentTab, escrowBalance }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'discover', label: 'Discover Services', icon: Search },
    { id: 'create_job', label: 'Create Job', icon: PlusCircle },
    { id: 'escrow', label: 'Escrow Tracker', icon: Shield },
    { id: 'wallet', label: 'Mazhetx Wallet', icon: Wallet },
  ];

  return (
    <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[280px] bg-black border-r border-white/15 py-8 z-40 text-white justify-between select-none">
      <div className="flex flex-col gap-10">
        {/* Brand logo display */}
        <div className="px-6 flex flex-col">
          <div className="flex items-center gap-2">
            <Shield className="text-white fill-white/10" size={24} />
            <span className="text-2xl font-black tracking-tighter leading-none">MAZHETX</span>
          </div>
          <span className="text-[9px] font-bold tracking-[0.3em] uppercase opacity-40 mt-2">Computational Escrow</span>
        </div>

        {/* User profile section */}
        <div className="px-6 flex items-center gap-3 border-y border-white/10 py-5">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white/30 bg-neutral-900 flex items-center justify-center">
            <img 
              className="w-full h-full object-cover" 
              alt="Institutional User Avatar" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSs3rwbjhw8DsrLXLpyUdHP4fKUK-BwItpliioFe_g7yfxsoFNt8Y432a2qUMgGWvUiPuYKXf_YFBxIExe9cMOkAKCp_tmO_klQ8a4VMlEhJ1qXzTZCD4mle_qjQlh8-L6-MT2-1Ob2fct1yde6AY4RaFDMGkF7O4GbPyvc7ZEm7tgvbEnmjX9WlXb9qp085Orc6Q9R4v_Q8zL2Bjo9JmtUodAJnMbO4Ll6sfy8OfmJAi4taSfC43XtwIvKockS40rlsonAh8FMA0"
            />
          </div>
          <div className="flex flex-col">
            <h2 className="font-sans font-black text-white text-xs tracking-tight uppercase leading-none">Aditya Sheral</h2>
            <p className="font-mono text-[9px] text-white/50 flex items-center gap-1 mt-1 uppercase tracking-wider">
              <CheckCircle size={9} className="text-white" /> Verified Entity
            </p>
          </div>
        </div>

        {/* Navigation menu */}
        <nav className="px-3">
          <ul className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentTab(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all border ${
                      isActive
                        ? 'bg-white text-black border-white'
                        : 'text-white/60 hover:text-white border-transparent hover:border-white/10 hover:bg-white/5'
                    }`}
                  >
                    <Icon size={16} className={isActive ? 'text-black' : 'text-white/40'} />
                    <span>{item.label}</span>
                    {item.id === 'wallet' && (
                      <span className={`ml-auto text-[9px] font-mono px-2 py-0.5 rounded font-black border ${
                        isActive 
                          ? 'bg-black text-white border-black' 
                          : 'bg-white/10 text-white border-white/20'
                      }`}>
                        ${escrowBalance.toLocaleString()}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Footer secure metadata */}
      <div className="px-6 flex flex-col gap-4">
        <div className="h-px bg-white/10"></div>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-[0.2em] opacity-40 font-bold">Consensus Layer</span>
          <span className="font-mono text-[10px] text-white/70">ACTIVE // SECURE NODE</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[8px] uppercase tracking-[0.2em] opacity-40 font-bold">Network Latency</span>
          <span className="font-mono text-[10px] text-white/70">14.00 MS // P2P</span>
        </div>
      </div>
    </aside>
  );
}
