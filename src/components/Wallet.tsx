import { useState, FormEvent } from 'react';
import { 
  ArrowDown, 
  ArrowUp, 
  Lock, 
  PlusCircle, 
  ArrowLeftRight, 
  Banknote, 
  FileText, 
  CheckCircle,
  Settings,
  Plus
} from 'lucide-react';
import { Transaction } from '../types';

interface WalletProps {
  transactions: Transaction[];
  liquidBalance: number;
  escrowBalance: number;
  onTopUp: (amount: number) => void;
  onWithdraw: (amount: number) => void;
}

export default function Wallet({ 
  transactions, 
  liquidBalance, 
  escrowBalance,
  onTopUp,
  onWithdraw
}: WalletProps) {
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [amountInput, setAmountInput] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');

  const handleTopUpSubmit = (e: FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      onTopUp(amount);
      setAmountInput('');
      setShowTopUpModal(false);
    }
  };

  const handleWithdrawSubmit = (e: FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0 && amount <= liquidBalance) {
      onWithdraw(amount);
      setAmountInput('');
      setWithdrawAddress('');
      setShowWithdrawModal(false);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-12 animate-fade-in max-w-5xl mx-auto select-none">
      
      {/* Desktop Header */}
      <div className="hidden md:flex justify-between items-end">
        <div>
          <h1 className="font-sans font-black text-2xl md:text-3xl text-white uppercase tracking-tight">Mazhetx Wallet</h1>
          <p className="font-sans text-xs text-white/50 uppercase tracking-wider mt-1">Manage your institutional escrow and liquid assets securely.</p>
        </div>
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="bg-white hover:bg-neutral-200 text-black font-mono text-[10px] font-black uppercase tracking-widest px-5 py-3 rounded transition-colors flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
        >
          <Plus size={14} />
          <span>Top Up Wallet</span>
        </button>
      </div>

      {/* Grid of Balances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Primary Escrow Card (High-Integrity design matching mock) */}
        <div className="relative bg-neutral-950 rounded-xl p-6 md:p-8 text-white shadow-priority overflow-hidden border border-white/10 border-t-2 border-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] gap-6">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="font-mono text-[9px] text-white/40 font-black uppercase tracking-widest">Total Escrow Balance</h2>
                <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1 rounded border border-white/10">
                  <CheckCircle size={10} className="text-white" />
                  <span className="font-mono text-[8px] text-white font-black uppercase tracking-widest">Verified Vault</span>
                </div>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-sans text-3xl md:text-4xl font-black tracking-tight">${escrowBalance.toLocaleString()}</span>
                <span className="font-mono text-xs text-white/40 font-black">USDC</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <div className="font-mono text-[9px] text-white/40 font-bold uppercase tracking-wider">
                Vault Cluster ID: <span className="text-white font-mono font-bold">0x8A...3F92</span>
              </div>
              <button className="p-2 hover:bg-white/5 rounded text-white/60 hover:text-white transition-colors cursor-pointer">
                <Settings size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Liquid Wallet Card - Styled like the Purple card pocket layout in Screen 4's mockup */}
        <div className="relative bg-neutral-950 rounded-xl p-6 md:p-8 text-white shadow-priority overflow-hidden border border-white/10 border-t-2 border-white/30">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col justify-between h-full min-h-[160px] gap-6">
            <div>
              <div className="flex justify-between items-center">
                <h2 className="font-mono text-[9px] text-white/40 font-black uppercase tracking-widest">Liquid Account</h2>
                <span className="font-mono text-[8px] text-white font-black bg-white/10 px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                  VISA ACTIVE
                </span>
              </div>
              <div className="flex items-baseline gap-2 mt-4">
                <span className="font-sans text-3xl md:text-4xl font-black tracking-tight">${liquidBalance.toLocaleString()}</span>
                <span className="font-mono text-xs text-white/40 font-black">USDC</span>
              </div>
            </div>

            <div className="flex justify-between items-center border-t border-white/10 pt-4">
              <span className="font-mono text-[8px] text-white/40 font-bold uppercase tracking-wider">CARDMASTER: ADITYA SHERAL **** 5678</span>
              <span className="font-mono text-[8px] text-white/40 font-bold">EXP: 05/29</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions (Corporate Modern circles) */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-4 md:gap-6">
        <button 
          onClick={() => setShowTopUpModal(true)}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded bg-neutral-950 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all shadow-sm">
            <PlusCircle size={20} className="text-white group-hover:text-black transition-colors" />
          </div>
          <span className="font-sans text-[9px] text-white/50 group-hover:text-white font-black uppercase tracking-widest">Top Up</span>
        </button>

        <button 
          onClick={() => setShowWithdrawModal(true)}
          className="flex flex-col items-center gap-2 group cursor-pointer"
        >
          <div className="w-14 h-14 md:w-16 md:h-16 rounded bg-neutral-950 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all shadow-sm">
            <ArrowLeftRight size={20} className="text-white group-hover:text-black transition-colors" />
          </div>
          <span className="font-sans text-[9px] text-white/50 group-hover:text-white font-black uppercase tracking-widest">Withdraw</span>
        </button>

        <button className="flex flex-col items-center gap-2 group cursor-not-allowed opacity-30">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded bg-neutral-950 border border-white/5 flex items-center justify-center shadow-sm">
            <Banknote size={20} className="text-white/40" />
          </div>
          <span className="font-sans text-[9px] text-white/30 uppercase tracking-widest font-black">Transfer</span>
        </button>

        <button className="flex flex-col items-center gap-2 group cursor-not-allowed opacity-30">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded bg-neutral-950 border border-white/5 flex items-center justify-center shadow-sm">
            <FileText size={20} className="text-white/40" />
          </div>
          <span className="font-sans text-[9px] text-white/30 uppercase tracking-widest font-black">Statements</span>
        </button>
      </div>

      {/* Recent Transactions / Ledger activity */}
      <section className="flex flex-col gap-4">
        <div className="flex justify-between items-end mb-2">
          <div>
            <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight">Ledger Activity</h3>
            <p className="font-sans text-xs text-white/50 uppercase tracking-wider mt-0.5">Chronological list of escrow and liquid transitions</p>
          </div>
          <span className="font-mono text-[10px] text-white/40 font-bold uppercase tracking-widest">Showing {transactions.length} states</span>
        </div>

        <div className="bg-neutral-950 rounded-xl border border-white/10 overflow-hidden shadow-sm">
          {transactions.map((tx, idx) => {
            const isEscrowRelease = tx.type === 'ESCROW_RELEASE';
            const isEscrowHold = tx.type === 'ESCROW_HOLD';
            const isIncome = tx.type === 'INCOME';

            return (
              <div 
                key={tx.id || idx}
                className="flex items-center justify-between p-4 border-b border-white/10 last:border-b-0 hover:bg-white/5 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {tx.avatar ? (
                    <div className="w-10 h-10 rounded overflow-hidden border border-white/10">
                      <img src={tx.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded flex items-center justify-center border ${
                      isEscrowRelease || isIncome
                        ? 'bg-white/10 border-white/20 text-white'
                        : isEscrowHold
                        ? 'bg-neutral-900 border-white/10 text-white'
                        : 'bg-neutral-900 border-white/10 text-white'
                    }`}>
                      {isEscrowRelease || isIncome ? (
                        <ArrowDown size={14} />
                      ) : isEscrowHold ? (
                        <Lock size={14} />
                      ) : (
                        <ArrowUp size={14} />
                      )}
                    </div>
                  )}

                  <div>
                    <p className="font-sans text-xs font-black text-white uppercase tracking-wider">{tx.title}</p>
                    <p className="font-mono text-[9px] text-white/40 mt-1 uppercase font-bold">{tx.timestamp}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-mono text-xs font-black text-white">
                    {isEscrowRelease || isIncome ? '+' : '-'} ${tx.amount.toLocaleString()}.00
                  </p>
                  
                  <span className="inline-block font-mono text-[8px] font-black px-2 py-0.5 rounded mt-1.5 uppercase bg-white/10 text-white border border-white/10">
                    {tx.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top Up Modal */}
      {showTopUpModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/20 rounded-xl p-6 max-w-sm w-full shadow-priority animate-fade-in flex flex-col gap-5">
            <div>
              <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight">Add Liquid Funds</h3>
              <p className="font-sans text-[10px] text-white/50 uppercase tracking-wider mt-1.5">Simulate adding tokenized USDC from your credit card or external bank.</p>
            </div>

            <form onSubmit={handleTopUpSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest">Top Up Amount (USDC)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 5000"
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white focus:bg-neutral-950 outline-none font-bold"
                />
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button 
                  type="button" 
                  onClick={() => setShowTopUpModal(false)}
                  className="px-4 py-2 bg-transparent border border-white/10 hover:border-white rounded font-mono text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-white hover:bg-neutral-200 text-black rounded font-mono text-[9px] font-black uppercase tracking-widest transition-colors"
                >
                  Add USDC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-neutral-950 border border-white/20 rounded-xl p-6 max-w-sm w-full shadow-priority animate-fade-in flex flex-col gap-5">
            <div>
              <h3 className="font-sans font-black text-sm text-white uppercase tracking-tight">Withdraw USDC</h3>
              <p className="font-sans text-[10px] text-white/50 uppercase tracking-wider mt-1.5">Simulate sending liquid funds to an external ERC-20 blockchain address.</p>
            </div>

            <form onSubmit={handleWithdrawSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest">Address (0x...)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 0x98A1...F92B"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-3 text-xs text-white focus:outline-none focus:border-white focus:bg-neutral-950 outline-none font-mono font-bold"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] font-black text-white/40 uppercase tracking-widest">Withdraw Amount (USDC)</label>
                <input 
                  type="number" 
                  placeholder="e.g. 1000"
                  max={liquidBalance}
                  value={amountInput}
                  onChange={(e) => setAmountInput(e.target.value)}
                  required
                  className="w-full bg-neutral-900 border border-white/10 rounded px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-white focus:bg-neutral-950 outline-none font-bold"
                />
                <span className="font-sans text-[9px] text-white/40 mt-1 uppercase tracking-wider font-bold">Available: ${liquidBalance.toLocaleString()} USDC</span>
              </div>

              <div className="flex gap-2 justify-end mt-2">
                <button 
                  type="button" 
                  onClick={() => setShowWithdrawModal(false)}
                  className="px-4 py-2 bg-transparent border border-white/10 hover:border-white rounded font-mono text-[9px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-white hover:bg-neutral-200 text-black rounded font-mono text-[9px] font-black uppercase tracking-widest transition-colors"
                >
                  Withdraw USDC
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
