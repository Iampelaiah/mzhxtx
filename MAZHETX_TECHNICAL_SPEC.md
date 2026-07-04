# Mazhetx Platform Technical Specification
## Gikspot Ecosystem Consensus Layer

---

### Section 6: Contractor Passport & Profile Optimization Vectors

#### 6.1 Compliance-First Philosophy
In previous iterations, the Gikspot ecosystem allowed for an `AUTO_APPROVED` state, permitting trustworthy contractors with high-quality profiles to bypass manual KYC checks through automated heuristics. To meet strict regulatory standards and establish a zero-trust computational environment, **the Gikspot Mazhetx platform has completely eliminated the auto-approval and queue-bypassing mechanisms**. 

Every Service Provider profile must undergo mandatory identity validation and compliance review. Rather than serving as a means to circumvent verification, the gamified **Contractor Passport** is now re-engineered as a mandatory trust enhancer and profile optimization sequence. The passport serves as a progressive onboarding loop that compiles and structured-binds a provider's data payload, preparing them for mandatory KYC submission and optimizing their geospatial discovery ranking once they are fully verified.

```
+-----------------------------------------------------------------------------------+
|                            CONTRACTOR PASSPORT LIFECYCLE                          |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|  [Register] -> [Passport Quests Active] -> [KYC Portal Unlocked] -> [KYC Review]  |
|                                                     |                     |       |
|                                                     v                     v       |
|                                             (Profile Visibility)    (Active Node) |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

#### 6.2 The 4-Checkpoint Trust Quest Framework
Service Providers build their reputational bedrock through four sequential "Trust Quests." Each checkpoint aggregates critical metadata, establishing their system trust metrics and verifying essential capability vectors.

##### Checkpoint 1: Core Profile Integrity
* **Functional Scope**: Completion of the primary profile schema, including service category, custom pricing tiers, a professional bio, and a geospatial hub reference (latitude/longitude center).
* **System Outcome**: Establishes the provider in the local system database with an `INCOMPLETE_PASSPORT` state. The profile is not yet broadcasted on the public discover map.
* **Compliance Vector**: Establishes initial contact logs and standardizes database fields for proper system auditing.

##### Checkpoint 2: Professional Credentials & Certificate Sync
* **Functional Scope**: Uploading certified professional documentation (e.g., ISO-9001 Structural Cable Cert, Agora RTC Systems Architect credentials, safety licenses).
* **System Outcome**: Binds verified credential ID records to the provider's passport ledger.
* **Compliance Vector**: Facilitates secondary validation checks by linking raw certification IDs directly to external cryptographic or authority registries.

##### Checkpoint 3: Escrow & Milestone Validation
* **Functional Scope**: Completion of platform training walk-throughs, simulated client interactions, or obtaining a verified client-node endorsement from a previously completed high-stasis escrow contract.
* **System Outcome**: Populates the "Trust Score Metrics Ledger" with initial positive performance records and sets a baseline reputation multiplier.
* **Compliance Vector**: Builds historical proof-of-performance metadata prior to actual high-value platform trade exposure.

##### Checkpoint 4: Google Identity OAuth Integration (KYC Portal Activation)
* **Functional Scope**: Seamless OAuth integration with Google Identity services to cross-reference account age, reputation, and basic authentication details.
* **System Outcome**: **Completely re-purposed from queue bypassing.** Completing Checkpoint 4 triggers the **KYC Portal Activation**. The provider is granted the **"Priority Verification Review"** badge, which appends a priority flag (`priorityReview: true`) to their record in the verification queue.
* **Compliance Vector**: Generates an authenticated identity token that secures the registration trail and prevents sybil-attacks, ensuring that the manual verification team handles authentic, verified Google-backed individuals first.

#### 6.3 Profile Visibility Optimization
Completing the Checkpoint Quests does not alter the provider's compliance lifecycle; instead, it directly optimizes their visibility and ranking within the Geospatial Specialist Grid. The aggregated progress across the 4 quests determines the provider's **Trust Score**, which acts as a direct multiplier in the search-and-sort discovery algorithm used by clients.

$$SearchScore = \left( \frac{Rating \times RatingCount}{Distance + \epsilon} \right) \times \left( 1 + \alpha \times \sum_{i=1}^{4} Checkpoint_i \right)$$

Where:
* $\alpha$ is the trust quest weight factor ($0.25$).
* $Checkpoint_i \in \{0, 1\}$ represents the completion state of each quest.
* $\epsilon$ is a small distance buffer to prevent division by zero.

Even with a high computed SearchScore, a profile is **strictly hidden** from client-side map queries until the compliance status transitions to `VERIFIED_ACTIVE`. This ensures that clients only interact with fully compliant, manual-audit-approved service nodes.

---

### Section 7: Verification Engine Pipeline & Flow Engine

#### 7.1 State Machine Specification
The verification engine manages a strict, non-bypassable workflow designed to prevent unverified nodes from entering the live contract-escrow pool.

```
       +--------------------+
       |  INITIAL_REGISTER  |
       +---------+----------+
                 |
                 v
       +--------------------+
       | PASSPORT_ACTIVE    | <--- Checkpoints 1, 2, 3 Active
       +---------+----------+
                 |
                 v
       +--------------------+
       | KYC_PORTAL_OPEN    | <--- Checkpoint 4 Completed (Oauth Sync)
       +---------+----------+
                 |
                 | (User submits KYC Docs: Passport, Address, Bio-data)
                 v
       +--------------------+
       | KYC_REVIEW_QUEUE   | <--- Handled by system reviewers (Priority badge applied)
       +----+-----------+----+
            |           |
            | (Pass)    | (Fail/Refuse)
            v           v
+--------------+     +--------------+
|VERIFIED_ACTIVE|    | REJECTED     |
+--------------+     +--------------+
```

#### 7.2 Engine Architecture & ASCII Flow
The diagram below details the processing flow of a Service Provider's credentials and passport metrics. Notice that the Checkpoint Quests and the Google OAuth checkpoint route exclusively to the **Trust Score Ledger** and **KYC Portal Activation**, converging on the mandatory verification review queue.

```
========================================================================================
                          GIKSPOT MAZHETX VERIFICATION PIPELINE
========================================================================================

 [Svc Provider Registration]
             |
             v
   +--------------------+
   |  PASSPORT ENGINE   |
   |                    |
   | Checkpoint 1 (Prf) |=====\
   | Checkpoint 2 (Crd) |======\====> [ TRUST SCORE METRICS LEDGER ]
   | Checkpoint 3 (Esc) |======/       - Pre-calculates Rank Multiplier
   | Checkpoint 4 (OAuth)=====/        - Pre-calculates Priority Status Badge
   +---------+----------+
             |
             | Completes Quests 1-4
             v
   +--------------------+
   | KYC PORTAL ACCESS  |
   | (Activated)        |
   +---------+----------+
             |
             | Provider Uploads ID Docs (Government ID, Proof of Address)
             v
   +--------------------+
   | VERIFICATION QUEUE | <===============================================+
   | (PENDING_KYC)      |                                                 |
   +---------+----------+                                                 |
             |                                                 Priority Queue
             | System reads "Priority Verification Review" status tag   Bypass Loop
             v                                                            |
   +-----------------------------------------------------+                |
   |           COMPLIANCE GATEWAY (KYC_REVIEW)           |                |
   |                                                     |                |
   |   [ If priorityReview == true ]                     |                |
   |   -> Route to High-Priority Human-Reviewer Queue    |<---------------+
   |                                                     |
   |   [ Else ]                                          |
   |   -> Route to Standard FIFO Reviewer Queue          |
   +-------------------------+---------------------------+
                             |
                   Manual & System Review
                             |
               +-------------+-------------+
               |                           |
         [Approved]                    [Declined]
               |                           |
               v                           v
     +-------------------+       +-------------------+
     |  VERIFIED_ACTIVE  |       |     REJECTED      |
     |                   |       |                   |
     | - Unlocks Map     |       | - Restricts Map   |
     | - Unlocks Escrow  |       | - Locks Escrow    |
     | - Visible on Grid |       | - Triggers Appeal |
     +-------------------+       +-------------------+
```

#### 7.3 Auditing & Verification SLAs
* **Standard Queue Verification**: Under standard operating parameters, standard registrations are validated within a 24-hour compliance window.
* **Priority Verification Queue**: Service Providers carrying the **Priority Verification Review** badge (unlocked via Google OAuth integration) are guaranteed audit processing within a 2-hour SLA window, minimizing operational downtime for premium nodes.

---

### Section 9: Prisma Database Schema Spec

The Prisma model structures have been modified to enforce a robust compliance cycle. The legacy `AUTO_APPROVED` state has been removed, and the `VerificationStatus` enum has been expanded to support a structured, mandatory KYC flow.

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

/// Verification status representing the compliance lifecycle of a Service Provider.
/// AUTO_APPROVED has been completely eliminated to satisfy zero-trust validation requirements.
enum VerificationStatus {
  INITIAL_REGISTER       // Account initialized, passport pending
  PASSPORT_QUESTS_ACTIVE // Checkpoint quests are active, profile not yet on public grid
  PENDING_KYC            // Passport quests completed, KYC portal activated, documents missing
  KYC_REVIEW             // KYC documents submitted, awaiting manual system operator review
  VERIFIED_ACTIVE        // Compliance audit complete, profile fully visible on geospatial grid
  REJECTED               // Failed compliance verification
}

/// Represents an authoritative Service Provider (Worker Node) within the Mazhetx cluster.
model ServiceProvider {
  id               String             @id @default(uuid())
  name             String
  email            String             @unique
  category         String             // e.g., "Electrical", "Plumbing"
  specialty        String             // e.g., "Industrial Structured Cabling"
  estRate          Decimal            // Hourly rate in USDC
  avatar           String
  lat              Float              // Geospatial coordinate: Latitude
  lng              Float              // Geospatial coordinate: Longitude
  
  // Compliance & Validation Metrics
  verification     VerificationStatus @default(INITIAL_REGISTER)
  priorityReview   Boolean            @default(false) // Triggered via Checkpoint 4 (Google OAuth)
  trustScore       Float              @default(0.0)   // Dynamic multiplier based on quest progress
  
  // Contractor Passport Quests Tracking
  checkpoint1Done  Boolean            @default(false) // Profile completion
  checkpoint2Done  Boolean            @default(false) // Credentials uploaded
  checkpoint3Done  Boolean            @default(false) // First escrow or simulator validation
  checkpoint4Done  Boolean            @default(false) // Google Identity OAuth link (Unlocks KYC Portal)

  // Associated Platform Data
  portfolio        PortfolioItem[]
  sessions         FulfillmentSession[]
  documents        KycDocument[]
  
  createdAt        DateTime           @default(now())
  updatedAt        DateTime           @updatedAt

  @@index([lat, lng])
  @@index([verification, priorityReview])
}

/// Appended document ledger for manual KYC review audits.
model KycDocument {
  id               String             @id @default(uuid())
  providerId       String
  provider         ServiceProvider    @relation(fields: [providerId], references: [id], onDelete: Cascade)
  documentType     String             // e.g., "GOVERNMENT_ID", "UTILITY_BILL"
  documentUri      String             // Cryptographically secured URL or IPFS hash
  checksum         String             // SHA-256 hash of the uploaded document file
  uploadedAt       DateTime           @default(now())

  @@index([providerId])
}

/// Sync-bound portfolio item illustrating historical proof-of-work
model PortfolioItem {
  id               String             @id @default(uuid())
  providerId       String
  provider         ServiceProvider    @relation(fields: [providerId], references: [id], onDelete: Cascade)
  title            String
  description      String             @db.Text
  category         String             // e.g., "Electrical", "Plumbing"
  imageUrl         String?
  tags             String[]           // Array of search keywords
  createdAt        DateTime           @default(now())

  @@index([providerId])
}

/// Dynamic record representing a secure client-provider escrow fulfillment session.
model FulfillmentSession {
  id               String             @id @default(uuid())
  clientId         String
  providerId       String
  provider         ServiceProvider    @relation(fields: [providerId], references: [id])
  amount           Decimal            // USDC locked amount
  status           String             // e.g., "PENDING", "IN_PROGRESS", "COMPLETED", "DISPUTED"
  createdAt        DateTime           @default(now())

  @@index([providerId])
}
```
