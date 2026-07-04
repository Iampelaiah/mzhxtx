import { Provider, Job, Transaction } from './types';

export const DEFAULT_PROVIDERS: Provider[] = [
  {
    id: '1',
    name: 'Elias Vance',
    category: 'Electrical',
    rating: 4.95,
    ratingCount: 142,
    distance: '1.2km away',
    specialty: 'Industrial Electrical',
    estRate: 85,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBmHdClsbCcmiAiYF97p0kpoRQoGoyl8seUmmFCr1B3OTT7Ic-1byRVqKEOcKsPGJ0zxHGgHZ-9vkuYocMhr-1JzkFytaU4kUd0wSHIbCle735Tngcsr3QXnj4WrVhVEsDnKOa8DcjBSSWjJy3m6BInf8S6Z5eJMLsI7vY92BtDfkn8hq0ntJosLoccyCpK-zf_jE-2kbc8xFH_A4KkeTIHF1bGbVVgb1ETG9_kKfjc2gU_jQAN7BJzdf4Jj_9f9c-3lTa_sHvTFo_J',
    verified: true,
    tier: 2,
    lat: 34.0522, // will be used to center or offset map coordinates
    lng: -118.2437,
    portfolio: [
      {
        id: 'port-e-1',
        title: 'Server Cluster Delta Wiring',
        description: 'Completed 3-phase structured wiring deployment for redundantly powered server cluster. Added custom surge protections and zero-trust hardware stasis controls.',
        category: 'Electrical',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLbFvn9nSzujkvpJJaIITYJJUDELk0YdHxjLzEpUFaiMzNEf5mLSzUYZ_erMju2LLfvKeMbzBpYc0LtQgROkLi1Z8JrXB01eR3M8CjRiEVVF1Yl9RvYpfSI3tnySQGwzu6fQ0znNdl8Z7y1I-IUn_3SKpLqSMbM8WkkglUnY4R-E2pJleX4mC2fOLflzx9gz7WR8HV7n0yiy6ris6f6Pp-Zctmeg0nnfSwej44X8ClFLstXjSxUpx1jNeh9QQ-4qyPOg7WGifQb_yZ',
        tags: ['wiring', 'delta', 'cluster', '3-phase', 'stasis'],
        createdAt: '2026-06-15T09:00:00Z'
      }
    ]
  },
  {
    id: '2',
    name: 'Sarah Jenkins',
    category: 'Plumbing',
    rating: 4.98,
    ratingCount: 204,
    distance: '2.4km away',
    specialty: 'Fiber Optics & Cabling',
    estRate: 110,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGVmtObE-uEVQzyQRXW6demQcYeeFRoOQs7ljgoeFO1MwTPD4aR_qjCw0cwP-xsvX6cey07QFbg2XOv_1V7ronSt_XspUGu8tAD-napYCDq4kduVQiWGK_QWqkz5XYZopsUmTjtWCCrnYQujIFjx7D-vrvIMeBTCZSrNQPzLbSa8n9bDj_QBCTFLZtLfr9wKeNCSk1BmzlHaJduw4lMyvxJa11RXK_SVJPyUpBxT7hHPZY0P-TLf-eftkyVCZUDxM4JTL9S0DOzHGs',
    verified: true,
    tier: 3,
    lat: 34.0622,
    lng: -118.2337,
    portfolio: [
      {
        id: 'port-s-1',
        title: '10Gbps Fiber Optic Splice Loop',
        description: 'Meticulous micro-fusion fiber optic splicing with OTDR confirmation, complete with low-attenuation protection caps.',
        category: 'Plumbing',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX_waz16XVupn3XSFtNg4H8et4_WNt5lUv7pvnE0d6Py_umEODtvIm3ja2OtJHYbXRKgVpKR4j7yscDbgytE7YxALZ49dJc-DxeTj39n1rHYE5LJArotKTPTYciAbXI5TC7-zoYRK0aUmF5p82dZFvQHAv4MWF2V6vpl9J4zBe8BQB6EcJ-P-wazVi92fuHcw4e1SLu4iKKCpFmQXl4fO-mf5ZzkEN-uU94YMxUiFx3OHb66ph36dcqJ6k0YfUF47Va7L47q_7VKgQ',
        tags: ['fiber', 'splice', 'loop', 'cabling', 'otdr'],
        createdAt: '2026-05-10T14:30:00Z'
      }
    ]
  },
  {
    id: '3',
    name: 'Marcus Thorne',
    category: 'Electrical',
    rating: 4.92,
    ratingCount: 88,
    distance: '3.1km away',
    specialty: 'Residential Installation',
    estRate: 70,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBBIbxZQqRwuFmKNljQZUDYH3kTdmLYNivFrZj1C1GwL7RQ1QVv1-rgZl9qnPpgtYeri__lvIdwSwx_pIESqT84V2bAzCDjRJhP6hAOPmHrctpS6nmiN-0kDEGAtTahuUCe45NBPYwcX0iKXTwnoVh83ptm-fs1EmmlBrRuThWzFvfU5BQWGx2QnRCwuRUlLpjmXvzNdd573pazSY_EL4hph3d4hAHchK2a7zk8gd7wnQZPtFKjwaduqn996u1FdWgwLba8hc4_A73K',
    verified: true,
    tier: 1,
    lat: 34.0422,
    lng: -118.2537,
    portfolio: [
      {
        id: 'port-m-1',
        title: 'Smart Vault Gateway Mount',
        description: 'Integrated biometric access gates and high-availability backup battery panels for private local stasis vaults.',
        category: 'Electrical',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnoibwkIaJtX4fHnqwgsHyRzjZ1Db_FO6pa5mFdvj994Vcu6Z0zEIEpiCJ5pXcE9WFNDtQMA9poHBh4jsZ_5FJmU9EPbMoNh1R7fuaDKbhw8Dm2Uuv8RdhAlWJ1PHLvdbyBmyabBsdC-lZEwuJGHqd_71VK9AKzDRA3X1jiEloMUd-aIJfbKrspV0FMXTTvSAvmn52CsfujXQJ7vvDTcu1oLqeoBmT5vCS5hmZ6ERPuZLlTGMKoWOp3e4nrzyNxTitzSkkiaYec6YD',
        tags: ['vault', 'biometric', 'gateway', 'battery', 'mount'],
        createdAt: '2026-06-20T11:15:00Z'
      }
    ]
  }
];

export const DEFAULT_JOBS: Job[] = [
  {
    id: 'TX-9824-A',
    title: 'Structured Cabling - Phase 1',
    category: 'technical',
    description: 'Provide state-of-the-art structured cabling installation and organization in server racks. Neat bundling, color coding, and Ethernet terminations required to complete milestone 1.',
    milestones: [
      {
        id: 'ms-1',
        title: 'Initial Assessment and Physical Cabling Layout',
        amount: 4500,
        dueDate: '2026-08-15'
      }
    ],
    mandatoryIdVerification: true,
    status: 'HELD_IN_ESCROW',
    createdAt: '2023-10-24T10:42:00',
    vaultId: '0x8A...3F92',
    txHash: 'TX-9824-A',
    broadcasted: true,
    proofs: [
      {
        id: 'proof-1',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDLbFvn9nSzujkvpJJaIITYJJUDELk0YdHxjLzEpUFaiMzNEf5mLSzUYZ_erMju2LLfvKeMbzBpYc0LtQgROkLi1Z8JrXB01eR3M8CjRiEVVF1Yl9RvYpfSI3tnySQGwzu6fQ0znNdl8Z7y1I-IUn_3SKpLqSMbM8WkkglUnY4R-E2pJleX4mC2fOLflzx9gz7WR8HV7n0yiy6ris6f6Pp-Zctmeg0nnfSwej44X8ClFLstXjSxUpx1jNeh9QQ-4qyPOg7WGifQb_yZ',
        description: 'Perfectly organized blue color-coded network cabling bundles',
        location: '40.7128° N, 74.0060° W'
      },
      {
        id: 'proof-2',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCX_waz16XVupn3XSFtNg4H8et4_WNt5lUv7pvnE0d6Py_umEODtvIm3ja2OtJHYbXRKgVpKR4j7yscDbgytE7YxALZ49dJc-DxeTj39n1rHYE5LJArotKTPTYciAbXI5TC7-zoYRK0aUmF5p82dZFvQHAv4MWF2V6vpl9J4zBe8BQB6EcJ-P-wazVi92fuHcw4e1SLu4iKKCpFmQXl4fO-mf5ZzkEN-uU94YMxUiFx3OHb66ph36dcqJ6k0YfUF47Va7L47q_7VKgQ',
        description: 'Meticulous wire termination into patch panels',
        location: '40.7128° N, 74.0060° W'
      },
      {
        id: 'proof-3',
        imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCnoibwkIaJtX4fHnqwgsHyRzjZ1Db_FO6pa5mFdvj994Vcu6Z0zEIEpiCJ5pXcE9WFNDtQMA9poHBh4jsZ_5FJmU9EPbMoNh1R7fuaDKbhw8Dm2Uuv8RdhAlWJ1PHLvdbyBmyabBsdC-lZEwuJGHqd_71VK9AKzDRA3X1jiEloMUd-aIJfbKrspV0FMXTTvSAvmn52CsfujXQJ7vvDTcu1oLqeoBmT5vCS5hmZ6ERPuZLlTGMKoWOp3e4nrzyNxTitzSkkiaYec6YD',
        description: 'Enterprise server room complete structured layout',
        location: '40.7128° N, 74.0060° W'
      }
    ]
  }
];

export const DEFAULT_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-1',
    title: 'TechCorp Escrow Release',
    type: 'ESCROW_RELEASE',
    amount: 4500,
    timestamp: 'Oct 24, 2023 • 14:32',
    status: 'SETTLED'
  },
  {
    id: 'tx-2',
    title: 'Design Services Contract',
    type: 'ESCROW_HOLD',
    amount: 1200,
    timestamp: 'Oct 22, 2023 • 09:15',
    status: 'HELD_IN_VAULT'
  },
  {
    id: 'tx-3',
    title: 'Payment to Sofia M.',
    type: 'EXPENSE',
    amount: 350,
    timestamp: 'Oct 20, 2023 • 11:45',
    status: 'SETTLED',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7QlRRG0Hs56brhNk-IYpAaZ9KOertjImhEF6y8hbFtcsVcBSODQoHRc6FHp8ExM_lN9vcrrTVrUQ158lxC0W3YLwsNbFli_TDkwW4C2IqNT32essodCIbeSdYOLLorF7vrTJwbg4981Y4yHtmUEsvJgNbGk88vzflvfcWE6cYOnFPJYXNmNuc-oW2friwrv8fyEwo7q6fw15GGjIcDvUMIuHVL3K2InpZCzD4KrtEJItkaMlHlP6n___tJeakQS4KHRa8XMj9hgHu'
  },
  {
    id: 'tx-4',
    title: 'API Integration Milestone',
    type: 'ESCROW_HOLD',
    amount: 850,
    timestamp: 'Oct 18, 2023 • 16:20',
    status: 'HELD_IN_VAULT'
  }
];
