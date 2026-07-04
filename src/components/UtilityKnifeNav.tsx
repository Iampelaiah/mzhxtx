import { 
  Home, 
  Search, 
  FolderSymlink, 
  MessageSquareMore, 
  User,
  Zap
} from 'lucide-react';

interface UtilityKnifeNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  portalMode?: 'client' | 'provider';
}

export default function UtilityKnifeNav({ currentTab, setCurrentTab, portalMode = 'client' }: UtilityKnifeNavProps) {
  const tabs = portalMode === 'client' 
    ? [
        { id: 'dashboard', label: 'Home', icon: Home },
        { id: 'discover', label: 'Explore', icon: Search },
        { id: 'create_job', label: 'Deploy Listing', icon: FolderSymlink },
        { id: 'chats', label: 'Channels', icon: MessageSquareMore },
        { id: 'wallet', label: 'Token Vault', icon: User },
      ]
    : [
        { id: 'dashboard', label: 'Console', icon: Home },
        { id: 'pipeline', label: 'Pipeline', icon: Zap },
        { id: 'chats', label: 'Channels', icon: MessageSquareMore },
        { id: 'wallet', label: 'Ledger', icon: User },
      ];


  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95%] md:max-w-4xl px-2 select-none animate-fade-in pointer-events-none">
      <div className="relative pointer-events-auto flex items-center justify-center">
        
        {/* Knife Body Container */}
        <div className="relative w-full flex items-center h-20 md:h-24 bg-neutral-900 rounded-r-[40px] rounded-l-md shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-t border-b border-white/10 overflow-visible group">
          
          {/* BRUSHED METAL TEXTURE OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-600 to-zinc-800 rounded-r-[40px] rounded-l-md opacity-95 mix-blend-overlay pointer-events-none" />
          
          {/* Machined Metal Horizontal Grooves / Bevels */}
          <div className="absolute top-1 left-2 right-[110px] h-1 bg-white/15 rounded-full pointer-events-none" />
          <div className="absolute bottom-1.5 left-2 right-[110px] h-1.5 bg-black/45 rounded-full pointer-events-none" />
          <div className="absolute top-[8%] left-1 right-[90px] bottom-[8%] border border-white/5 rounded-r-[32px] rounded-l-sm pointer-events-none" />

          {/* RETRACTABLE UTILITY BLADE (Left side) */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 w-14 h-11 flex items-center justify-end z-[-1] pointer-events-none transition-transform duration-500 ease-out group-hover:-translate-x-1.5">
            <svg 
              width="56" 
              height="38" 
              viewBox="0 0 56 38" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[2px_4px_6px_rgba(0,0,0,0.7)]"
            >
              {/* Main Blade Geometry */}
              <path 
                d="M56 0L10 20L0 38H56V0Z" 
                fill="url(#blade_grad)" 
                stroke="#1c1917" 
                strokeWidth="1.5"
              />
              {/* Razor Bevel Edge */}
              <path 
                d="M10 20L0 38H18L26 22L10 20Z" 
                fill="url(#bevel_grad)" 
                className="opacity-90"
              />
              {/* Blade Grind Line */}
              <line 
                x1="12" 
                y1="19" 
                x2="56" 
                y2="19" 
                stroke="#2a2a2a" 
                strokeWidth="1.5" 
                strokeDasharray="4 2"
              />
              
              <defs>
                <linearGradient id="blade_grad" x1="0" y1="0" x2="56" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#d4d4d8" />
                  <stop offset="40%" stopColor="#71717a" />
                  <stop offset="70%" stopColor="#27272a" />
                  <stop offset="100%" stopColor="#52525b" />
                </linearGradient>
                <linearGradient id="bevel_grad" x1="0" y1="20" x2="20" y2="38" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#a1a1aa" />
                  <stop offset="100%" stopColor="#3f3f46" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* SLIDER LOCK BUTTON (Below the body on the left side) */}
          <div className="absolute left-6 -bottom-1 w-12 h-2.5 bg-gradient-to-b from-zinc-700 to-zinc-950 border border-black rounded shadow-[0_2px_4px_rgba(0,0,0,0.6)] flex items-center justify-around px-1 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
          </div>

          {/* PHYSICAL STRUCTURAL SCREWS */}
          {/* Top-Left Screw */}
          <div className="absolute top-2.5 left-20 w-3 h-3 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-950 to-zinc-700 border border-black flex items-center justify-center shadow-md">
            <div className="w-1.5 h-[1.5px] bg-zinc-500 rotate-45" />
          </div>
          {/* Bottom-Left Screw */}
          <div className="absolute bottom-2.5 left-20 w-3 h-3 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-950 to-zinc-700 border border-black flex items-center justify-center shadow-md">
            <div className="w-1.5 h-[1.5px] bg-zinc-500 -rotate-45" />
          </div>
          {/* Top-Middle Screw */}
          <div className="absolute top-2.5 right-64 w-3 h-3 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-950 to-zinc-700 border border-black flex items-center justify-center shadow-md">
            <div className="w-1.5 h-[1.5px] bg-zinc-500 -rotate-12" />
          </div>
          {/* Bottom-Middle Screw */}
          <div className="absolute bottom-2.5 right-64 w-3 h-3 rounded-full bg-gradient-to-br from-zinc-600 via-zinc-950 to-zinc-700 border border-black flex items-center justify-center shadow-md">
            <div className="w-1.5 h-[1.5px] bg-zinc-500 rotate-[60deg]" />
          </div>

          {/* FIVE INTERACTIVE METALLIC TABS */}
          <div className="flex-1 flex justify-around items-center pl-28 pr-28 h-full z-10">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className="flex flex-col items-center justify-center w-16 md:w-20 h-full relative cursor-pointer group/btn"
                >
                  {/* Indented Engraving Backing on Active */}
                  <div className={`absolute inset-y-1.5 inset-x-0.5 rounded-lg transition-all duration-300 ${
                    isActive 
                      ? 'bg-gradient-to-b from-black/80 to-black/35 shadow-[inset_0_2px_8px_rgba(0,0,0,0.9),_0_1px_1px_rgba(255,255,255,0.15)] border-t border-black/40' 
                      : 'bg-transparent group-hover/btn:bg-white/5'
                  }`} />

                  {/* Icon & Label with custom engraving visual states */}
                  <div className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                    isActive 
                      ? 'scale-95 translate-y-0.5 text-white' 
                      : 'text-zinc-400 hover:text-white'
                  }`}>
                    <Icon 
                      size={20} 
                      strokeWidth={1.5} 
                      className={`transition-all duration-300 ${
                        isActive 
                          ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.7)] text-white' 
                          : 'opacity-70 group-hover/btn:opacity-100'
                      }`}
                    />
                    
                    <span className={`font-mono text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all duration-300 ${
                      isActive 
                        ? 'text-white' 
                        : 'opacity-60 group-hover/btn:opacity-100'
                    }`}>
                      {tab.label}
                    </span>
                  </div>

                  {/* Interactive Beep/Indicator light below */}
                  {isActive && (
                    <div className="absolute bottom-2.5 w-1 h-1 rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.7)]" />
                  )}
                </button>
              );
            })}
          </div>

          {/* LANYARD CUTOUT / INTEGRATED HOLE RING (Right side) */}
          <div className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-full bg-neutral-950 border-4 border-zinc-500 shadow-[inset_0_4px_12px_rgba(0,0,0,0.95),_0_2px_4px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden">
            {/* Specular inner bevel light */}
            <div className="absolute inset-0.5 rounded-full border border-black/40 bg-transparent pointer-events-none" />
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-transparent border-2 border-zinc-700/40 pointer-events-none" />
          </div>

        </div>
      </div>
    </div>
  );
}
