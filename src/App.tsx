import { useState } from 'react';
import { Shield, CheckCircle, Bell, ArrowLeftRight } from 'lucide-react';
import { Job, Provider, Transaction, ProofOfWork, ClientSession, PortfolioItem } from './types';
import { DEFAULT_PROVIDERS, DEFAULT_JOBS, DEFAULT_TRANSACTIONS } from './data';
import UtilityKnifeNav from './components/UtilityKnifeNav';
import Chats from './components/Chats';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import CreateJob from './components/CreateJob';
import EscrowDetails from './components/EscrowDetails';
import Wallet from './components/Wallet';

// Portal Partitioning modules
import ClientDashboard from './components/ClientDashboard';
import ProviderDashboard from './components/ProviderDashboard';
import ProviderPipeline from './components/ProviderPipeline';
import AgoraRTCWorkspace from './components/AgoraRTCWorkspace';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [jobs, setJobs] = useState<Job[]>([
    ...DEFAULT_JOBS,
    // Add two seed jobs to make the total Escrow balance equal exactly $12,450.00 to match Screen 4 mockup!
    {
      id: 'TX-4320-D',
      title: 'Design Services & System Architecture',
      category: 'design',
      description: 'System architectural design and blueprinted wireframes for high-integrity client portals.',
      milestones: [{ id: 'ms-ds', title: 'System Architecture Blueprint', amount: 1200, dueDate: '2026-07-29' }],
      mandatoryIdVerification: true,
      status: 'HELD_IN_ESCROW',
      createdAt: '2023-10-22T09:15:00',
      vaultId: '0x8A...3F92',
      txHash: '0x3892a0...',
      broadcasted: true,
      proofs: []
    },
    {
      id: 'TX-7215-B',
      title: 'API Gateway Integration',
      category: 'software',
      description: 'Develop and audit multi-sig API gateway endpoints with standard cryptographic logs.',
      milestones: [{ id: 'ms-api', title: 'API Gateway Integration', amount: 850, dueDate: '2026-08-05' }],
      mandatoryIdVerification: true,
      status: 'HELD_IN_ESCROW',
      createdAt: '2023-10-18T16:20:00',
      vaultId: '0x8A...3F92',
      txHash: '0x7b2210...',
      broadcasted: true,
      proofs: []
    },
    {
      id: 'TX-9011-Y',
      title: 'Industrial Power Upgrade Phase 2',
      category: 'technical',
      description: 'Deploy three-phase power upgrades and distribution grids for computing vaults.',
      milestones: [{ id: 'ms-pwr', title: 'Power Grid Upgrades', amount: 5900, dueDate: '2026-09-01' }],
      mandatoryIdVerification: true,
      status: 'HELD_IN_ESCROW',
      createdAt: '2023-10-25T11:00:00',
      vaultId: '0x8A...3F92',
      txHash: '0x88f219...',
      broadcasted: true,
      proofs: []
    }
  ]);
  const [selectedJobId, setSelectedJobId] = useState<string>('TX-9824-A');
  const [providers, setProviders] = useState<Provider[]>(DEFAULT_PROVIDERS);
  const [transactions, setTransactions] = useState<Transaction[]>(DEFAULT_TRANSACTIONS);
  const [liquidBalance, setLiquidBalance] = useState<number>(25867.40); // Matches Aditya Sheral's mockup balance!
  const [preloadedProvider, setPreloadedProvider] = useState<Provider | null>(null);

  // Portal split and active live session state
  const [portalMode, setPortalMode] = useState<'client' | 'provider'>('client');
  const [activeWorkspaceSessionId, setActiveWorkspaceSessionId] = useState<string | null>(null);
  const [sessions, setSessions] = useState<ClientSession[]>([
    {
      id: 'SESSION-9214-A',
      clientId: 'user-aditya',
      clientName: 'Aditya Sheral',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOSs3rwbjhw8DsrLXLpyUdHP4fKUK-BwItpliioFe_g7yfxsoFNt8Y432a2qUMgGWvUiPuYKXf_YFBxIExe9cMOkAKCp_tmO_klQ8a4VMlEhJ1qXzTZCD4mle_qjQlh8-L6-MT2-1Ob2fct1yde6AY4RaFDMGkF7O4GbPyvc7ZEm7tgvbEnmjX9WlXb9qp085Orc6Q9R4v_Q8zL2Bjo9JmtUodAJnMbO4Ll6sfy8OfmJAi4taSfC43XtwIvKockS40rlsonAh8FMA0',
      providerId: '1',
      providerName: 'Elias Vance',
      providerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmHdClsbCcmiAiYF97p0kpoRQoGoyl8seUmmFCr1B3OTT7Ic-1byRVqKEOcKsPGJ0zxHGgHZ-9vkuYocMhr-1JzkFytaU4kUd0wSHIbCle735Tngcsr3QXnj4WrVhVEsDnKOa8DcjBSSWjJy3m6BInf8S6Z5eJMLsI7vY92BtDfkn8hq0ntJosLoccyCpK-zf_jE-2kbc8xFH_A4KkeTIHF1bGbVVgb1ETG9_kKfjc2gU_jQAN7BJzdf4Jj_9f9c-3lTa_sHvTFo_J',
      tierId: 'tier-2',
      tierName: 'Tier 2: Enterprise Installation',
      amount: 680,
      status: 'Pending',
      intake: {
        targetLocation: 'Room 402, Server Cluster Delta',
        notes: 'Please verify the backup redundant power lines before mounting. All Ethernet lines must be color-coded in light blue.',
        priority: 'high'
      },
      createdAt: new Date().toISOString(),
      agoraChannelId: 'AGORA-77922-DEL',
      notes: ''
    }
  ]);

  // Dynamic selector for Escrow Balance including custom sessions!
  const sessionEscrow = sessions
    .filter(s => s.status !== 'Completed')
    .reduce((sum, s) => sum + s.amount, 0);

  const escrowBalance = jobs
    .filter(j => j.status === 'HELD_IN_ESCROW' || j.status === 'RELEASE_PENDING' || j.status === 'DISPUTED')
    .reduce((sum, j) => sum + j.milestones.reduce((acc, m) => acc + m.amount, 0), 0) + sessionEscrow;

  // App handlers for state persistence and reactions
  const handleJobCreate = (newJob: Job) => {
    // Subtract from liquid balance
    const cost = newJob.milestones.reduce((acc, m) => acc + m.amount, 0);
    setLiquidBalance(prev => prev - cost);
    setJobs(prev => [newJob, ...prev]);
    setSelectedJobId(newJob.id);

    // Create a new ledger transaction
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      title: `${newJob.title} (Locked)`,
      type: 'ESCROW_HOLD',
      amount: cost,
      timestamp: 'Today • Just now',
      status: 'HELD_IN_VAULT',
      referenceId: newJob.id
    };
    setTransactions(prev => [newTx, ...prev]);
    setCurrentTab('escrow'); // Automatically view tracker
  };

  const handleApprovePayout = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Transition status to SETTLED
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'SETTLED' } : j));

    const totalPayout = job.milestones.reduce((acc, m) => acc + m.amount, 0);

    // Add Escrow Release transaction
    const releaseTx: Transaction = {
      id: `tx-release-${Date.now()}`,
      title: `${job.title} Release`,
      type: 'ESCROW_RELEASE',
      amount: totalPayout,
      timestamp: 'Today • Just now',
      status: 'SETTLED',
      referenceId: job.id
    };

    setTransactions(prev => [releaseTx, ...prev]);
  };

  const handleRaiseDispute = (jobId: string) => {
    setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: 'DISPUTED' } : j));
  };

  const handleAddProof = (jobId: string, proof: ProofOfWork) => {
    setJobs(prev => prev.map(j => {
      if (j.id === jobId) {
        return {
          ...j,
          proofs: [...(j.proofs || []), proof]
        };
      }
      return j;
    }));
  };

  const handleTopUp = (amount: number) => {
    setLiquidBalance(prev => prev + amount);
    const topUpTx: Transaction = {
      id: `tx-topup-${Date.now()}`,
      title: 'USDC Token Top Up',
      type: 'INCOME',
      amount,
      timestamp: 'Today • Just now',
      status: 'SETTLED'
    };
    setTransactions(prev => [topUpTx, ...prev]);
  };

  const handleWithdraw = (amount: number) => {
    setLiquidBalance(prev => prev - amount);
    const withdrawTx: Transaction = {
      id: `tx-withdraw-${Date.now()}`,
      title: 'USDC Vault Withdrawal',
      type: 'EXPENSE',
      amount,
      timestamp: 'Today • Just now',
      status: 'SETTLED'
    };
    setTransactions(prev => [withdrawTx, ...prev]);
  };

  // Intake & Contract deployment loops
  const handleDeployIntakeSession = (sessionData: any) => {
    setLiquidBalance(prev => prev - sessionData.amount);
    
    const newSession: ClientSession = {
      id: `SESSION-${Math.floor(1000 + Math.random() * 9000)}-S`,
      clientId: 'user-aditya',
      clientName: 'Aditya Sheral',
      clientAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDOSs3rwbjhw8DsrLXLpyUdHP4fKUK-BwItpliioFe_g7yfxsoFNt8Y432a2qUMgGWvUiPuYKXf_YFBxIExe9cMOkAKCp_tmO_klQ8a4VMlEhJ1qXzTZCD4mle_qjQlh8-L6-MT2-1Ob2fct1yde6AY4RaFDMGkF7O4GbPyvc7ZEm7tgvbEnmjX9WlXb9qp085Orc6Q9R4v_Q8zL2Bjo9JmtUodAJnMbO4Ll6sfy8OfmJAi4taSfC43XtwIvKockS40rlsonAh8FMA0',
      providerId: sessionData.provider.id,
      providerName: sessionData.provider.name,
      providerAvatar: sessionData.provider.avatar,
      tierId: `tier-${Date.now()}`,
      tierName: sessionData.tier.name,
      amount: sessionData.amount,
      status: 'Pending',
      intake: {
        targetLocation: sessionData.location,
        notes: sessionData.notes,
        priority: sessionData.priority
      },
      createdAt: new Date().toISOString(),
      agoraChannelId: `AGORA-${Math.floor(10000 + Math.random() * 90000)}`,
      notes: ''
    };

    setSessions(prev => [newSession, ...prev]);

    // Create a transaction ledger record
    const newTx: Transaction = {
      id: `tx-intake-${Date.now()}`,
      title: `${sessionData.provider.name} Intake Hold`,
      type: 'ESCROW_HOLD',
      amount: sessionData.amount,
      timestamp: 'Today • Just now',
      status: 'HELD_IN_VAULT',
      referenceId: newSession.id,
      avatar: sessionData.provider.avatar
    };
    setTransactions(prev => [newTx, ...prev]);
  };

  const handleAcceptSession = (sessionId: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'Active' } : s));
  };

  const handleDeclineSession = (sessionId: string) => {
    setSessions(prev => prev.filter(s => s.id !== sessionId));
  };

  const handleLaunchAgora = (sessionId: string) => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status: 'In_Progress' } : s));
    setActiveWorkspaceSessionId(sessionId);
  };

  const handleJoinSession = (sessionId: string) => {
    setActiveWorkspaceSessionId(sessionId);
  };

  const handleUpdateSessionStatus = (sessionId: string, status: 'Completed' | 'Disputed') => {
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, status } : s));
    
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    if (status === 'Completed') {
      // Add ESCROW_RELEASE log
      const releaseTx: Transaction = {
        id: `tx-released-${Date.now()}`,
        title: `${session.providerName} Fulfillment`,
        type: 'ESCROW_RELEASE',
        amount: session.amount,
        timestamp: 'Today • Just now',
        status: 'SETTLED',
        referenceId: session.id,
        avatar: session.providerAvatar
      };
      setTransactions(prev => [releaseTx, ...prev]);
    }

    setActiveWorkspaceSessionId(null);
  };

  const handleAddPortfolioItem = (providerId: string, item: PortfolioItem) => {
    setProviders(prev => prev.map(p => {
      if (p.id === providerId) {
        return {
          ...p,
          portfolio: [item, ...(p.portfolio || [])]
        };
      }
      return p;
    }));
  };

  const activeWorkspaceSession = sessions.find(s => s.id === activeWorkspaceSessionId);

  return (
    <div className="bg-black text-white font-sans min-h-screen flex flex-col antialiased selection:bg-white selection:text-black">
      
      {/* Premium Unified Top Header (matching the mockup background visual elements) */}
      <header className="sticky top-0 left-0 w-full z-30 bg-black/85 backdrop-blur-md border-b border-white/10 shadow-sm text-white select-none">
        <div className="max-w-5xl mx-auto px-4 md:px-10 h-16 flex justify-between items-center gap-4">
          <div className="flex items-center gap-3 shrink-0" onClick={() => setCurrentTab('dashboard')}>
            <Shield className="text-white fill-white/10 cursor-pointer hover:scale-105 transition-transform" size={20} />
            <div className="flex flex-col cursor-pointer">
              <span className="font-sans font-black text-lg tracking-tighter text-white uppercase leading-none">Mazhetx</span>
              <span className="font-mono text-[8px] text-white/40 tracking-wider uppercase mt-1">Institutional Consensus Layer</span>
            </div>
          </div>

          {/* Portal Split High-Integrity Toggle Selector */}
          <div className="bg-white/5 border border-white/10 p-1 rounded-full flex items-center shrink-0">
            <button 
              onClick={() => {
                setPortalMode('client');
                setCurrentTab('dashboard');
              }}
              className={`px-3.5 py-1.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                portalMode === 'client' 
                  ? 'bg-white text-black font-black shadow-sm' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Client Mode
            </button>
            <button 
              onClick={() => {
                setPortalMode('provider');
                setCurrentTab('dashboard');
              }}
              className={`px-3.5 py-1.5 rounded-full text-[9px] font-mono font-black uppercase tracking-wider transition-all cursor-pointer ${
                portalMode === 'provider' 
                  ? 'bg-white text-black font-black shadow-sm' 
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Business Mode
            </button>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button className="relative p-2 text-white/60 hover:text-white transition-colors cursor-pointer hover:bg-white/5 rounded hidden sm:inline-block">
              <Bell size={16} />
              <span className="absolute top-1 right-1.5 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
            </button>
            <div 
              onClick={() => setCurrentTab('wallet')}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 p-1.5 pr-3 rounded cursor-pointer transition-all"
            >
              <div className="w-6 h-6 rounded overflow-hidden border border-white/20">
                <img 
                  className="w-full h-full object-cover" 
                  alt="User profile" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOSs3rwbjhw8DsrLXLpyUdHP4fKUK-BwItpliioFe_g7yfxsoFNt8Y432a2qUMgGWvUiPuYKXf_YFBxIExe9cMOkAKCp_tmO_klQ8a4VMlEhJ1qXzTZCD4mle_qjQlh8-L6-MT2-1Ob2fct1yde6AY4RaFDMGkF7O4GbPyvc7ZEm7tgvbEnmjX9WlXb9qp085Orc6Q9R4v_Q8zL2Bjo9JmtUodAJnMbO4Ll6sfy8OfmJAi4taSfC43XtwIvKockS40rlsonAh8FMA0"
                />
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="font-sans font-black text-[9px] text-white uppercase tracking-wider leading-none">Aditya Sheral</span>
                <span className="font-mono text-[7px] text-white/50 uppercase tracking-widest mt-0.5">Verified Entity</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main viewport canvas */}
      <main className="flex-1 w-full px-4 md:px-10 py-6 md:py-10 pb-36 min-h-[calc(100vh-64px)] overflow-y-auto">
        
        {/* CLIENT TABS */}
        {portalMode === 'client' && (
          <>
            {currentTab === 'dashboard' && (
              <ClientDashboard 
                sessions={sessions}
                liquidBalance={liquidBalance}
                escrowBalance={escrowBalance}
                setCurrentTab={setCurrentTab}
                onJoinSession={handleJoinSession}
                providers={providers}
                onDeployIntakeSession={handleDeployIntakeSession}
              />
            )}
            {currentTab === 'discover' && (
              <Discover 
                providers={providers} 
                setCurrentTab={setCurrentTab} 
                setPreloadedProvider={setPreloadedProvider}
                onDeployIntakeSession={handleDeployIntakeSession}
                liquidBalance={liquidBalance}
              />
            )}
            {currentTab === 'create_job' && (
              <CreateJob 
                onJobCreate={handleJobCreate} 
                preloadedProvider={preloadedProvider}
                setPreloadedProvider={setPreloadedProvider}
                liquidBalance={liquidBalance}
              />
            )}
            {currentTab === 'escrow' && (
              <EscrowDetails 
                jobs={jobs} 
                selectedJobId={selectedJobId} 
                setSelectedJobId={setSelectedJobId}
                onApprovePayout={handleApprovePayout}
                onRaiseDispute={handleRaiseDispute}
                onAddProof={handleAddProof}
              />
            )}
            {currentTab === 'wallet' && (
              <Wallet 
                transactions={transactions} 
                liquidBalance={liquidBalance} 
                escrowBalance={escrowBalance}
                onTopUp={handleTopUp}
                onWithdraw={handleWithdraw}
              />
            )}
            {currentTab === 'chats' && (
              <Chats />
            )}
          </>
        )}

        {/* PROVIDER TABS */}
        {portalMode === 'provider' && (
          <>
            {currentTab === 'dashboard' && (
              <ProviderDashboard 
                sessions={sessions}
                providers={providers}
                onAddPortfolioItem={handleAddPortfolioItem}
              />
            )}
            {currentTab === 'pipeline' && (
              <ProviderPipeline 
                sessions={sessions}
                onAcceptSession={handleAcceptSession}
                onDeclineSession={handleDeclineSession}
                onLaunchAgora={handleLaunchAgora}
                onJoinSession={handleJoinSession}
              />
            )}
            {currentTab === 'wallet' && (
              <Wallet 
                transactions={transactions} 
                liquidBalance={liquidBalance} 
                escrowBalance={escrowBalance}
                onTopUp={handleTopUp}
                onWithdraw={handleWithdraw}
              />
            )}
            {currentTab === 'chats' && (
              <Chats />
            )}
          </>
        )}

      </main>

      {/* Dynamic Workspace Gateway overlay */}
      {activeWorkspaceSession && (
        <AgoraRTCWorkspace 
          session={activeWorkspaceSession}
          portalMode={portalMode}
          onClose={() => setActiveWorkspaceSessionId(null)}
          onUpdateSessionStatus={handleUpdateSessionStatus}
        />
      )}

      {/* Fully Tactile Utility Knife Navigation Bar */}
      <UtilityKnifeNav 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        portalMode={portalMode}
      />
    </div>
  );
}

