export interface Milestone {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
}

export type JobStatus = 'DRAFT' | 'BROADCASTED' | 'HELD_IN_ESCROW' | 'RELEASE_PENDING' | 'SETTLED' | 'DISPUTED';

export interface Job {
  id: string;
  title: string;
  category: string;
  description: string;
  milestones: Milestone[];
  mandatoryIdVerification: boolean;
  status: JobStatus;
  createdAt: string;
  vaultId: string;
  txHash: string;
  broadcasted: boolean;
  proofs?: ProofOfWork[];
}

export interface ProofOfWork {
  id: string;
  imageUrl: string;
  description: string;
  location: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl?: string;
  tags?: string[];
  createdAt: string;
}

export interface Provider {
  id: string;
  name: string;
  category: string;
  rating: number;
  ratingCount: number;
  distance: string;
  specialty: string;
  estRate: number;
  avatar: string;
  verified: boolean;
  tier: number;
  lat: number;
  lng: number;
  portfolio?: PortfolioItem[];
}

export interface Transaction {
  id: string;
  title: string;
  type: 'INCOME' | 'EXPENSE' | 'ESCROW_HOLD' | 'ESCROW_RELEASE';
  amount: number;
  timestamp: string;
  status: 'SETTLED' | 'HELD_IN_VAULT' | 'RELEASE_PENDING';
  referenceId?: string;
  avatar?: string;
}

export interface ClientSession {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  providerId: string;
  providerName: string;
  providerAvatar: string;
  tierId: string;
  tierName: string;
  amount: number;
  status: 'Pending' | 'Active' | 'In_Progress' | 'Completed' | 'Disputed';
  intake: {
    targetLocation: string;
    notes: string;
    priority: 'low' | 'medium' | 'high';
  };
  createdAt: string;
  agoraChannelId: string;
  notes?: string;
}

