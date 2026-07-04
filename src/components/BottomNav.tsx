import { 
  Home, 
  Search, 
  PlusCircle, 
  Shield, 
  Wallet 
} from 'lucide-react';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function BottomNav({ currentTab, setCurrentTab }: BottomNavProps) {
  const tabs = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover', icon: Search },
    { id: 'create_job', label: 'New Job', icon: PlusCircle, isCenter: true },
    { id: 'escrow', label: 'Escrows', icon: Shield },
    { id: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  return (
    <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
      <nav className="relative flex justify-between items-center px-4 py-2 bg-neutral-950 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          if (tab.isCenter) {
            return (
              <div key={tab.id} className="relative -top-5">
                <button
                  onClick={() => setCurrentTab(tab.id)}
                  aria-label="Create New Job Listing"
                  className="flex items-center justify-center bg-white hover:bg-neutral-200 text-black rounded-full w-14 h-14 shadow-priority border-4 border-neutral-950 transition-transform active:scale-90"
                >
                  <Icon size={26} strokeWidth={2.5} />
                </button>
              </div>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`relative flex flex-col items-center justify-center w-14 py-1 transition-all ${
                isActive ? 'text-white font-black uppercase' : 'text-white/40 hover:text-white'
              }`}
            >
              <Icon size={20} className={isActive ? 'text-white' : 'text-white/40'} />
              <span className="font-sans text-[8px] mt-1 tracking-wider uppercase font-bold">
                {tab.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-5 h-1 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
