# NavMitra 🚀

> **Smart India Hackathon 2026**
> **Problem Statement ID:** 26136
> **Problem Statement Title:** Startup Friendly Public Procurement Mechanism – Government of Maharashtra
> **Team:** Ek Chutki Syntax (Team ID: 73)

Nav-Mitra is an AI-powered, end-to-end digital innovation pathway designed to solve the operational bottlenecks faced by government departments when procuring frontier technology from startups. It replaces rigid tendering with outcome-based challenges, automated AI screening, and secure milestone-based pilot execution.

---

## 🎯 The Problem
Currently, government procurement is rigid, relying on legacy tender documents (RFPs) that demand multi-year experience, massive prior turnover, and high Earnest Money Deposits (EMD). This system inadvertently disqualifies early-stage, highly innovative startups. Even when relaxations (like DPIIT exemptions) exist on paper, departments hesitate to use them due to evaluation overhead, risk of pilot failure, and complex legal compliance.

## 💡 Proposed Solution
Nav-Mitra encourages **Frictionless, Transparent Government Procurement** through a combination of:
1.  **AI-Driven Discovery:** Multimodal AI parses startup capabilities, matching them to outcome-based government challenges instantly.
2.  **Live Capture Verification:** Anti-fraud live media tracking prevents startups from faking milestone progress.
3.  **Human-in-the-Loop Safeguards:** Dedicated Field Verification Officers approve payouts, creating transparency and new government jobs.

---

## ✨ Core Features

### 1. Challenge Creation (Gov Side)
Government departments post outcome-based problem statements instead of rigid technical tenders. They define the budget, timeline, and exact problem (e.g., "AI for Traffic Violation Detection").

### 2. AI Startup Screener (The Matching Engine)
When startups apply with their DPIIT profiles and pitch decks, our **Multimodal Foundation Models** natively parse the massive context (text, images, PDFs) without retrieval lag. The AI instantly screens for eligibility, relevance, technical fit, and risk, ranking the top startups for the human official to select.

### 3. AI Pilot Structurer (The Sandbox)
Once a startup is accepted, the AI automatically divides their proposal into a structured pilot containing exactly 3 measurable checkpoints/milestones. It intelligently calculates the timeline and budget allocation for each phase to ensure accountability. **The platform features a fully interactive inline editing sandbox**, allowing government officials to tweak the AI's proposed budgets and timelines before finalization.

### 4. Live Camera Verification (Anti-Fraud)
Startups cannot upload old or fake photos to claim milestone completion. The platform mandates **Live Camera Capture**, ensuring authenticated, real-time proof of work is submitted to the department.

### 5. Standardized Legal & IP Sandboxes
The platform automatically generates strict, compliant legal templates for the pilot, explicitly detailing IP Ownership (Background vs. Foreground), Data Security (DPDP Act 2023 compliance), and strict Dos & Don'ts for the startup. **Includes native Print-to-PDF export functionality** for offline signing and direct contract attachment flows.

### 6. Field Verification & Milestone Payments
The AI pre-verifies the live progress, but the final authorization is handed to a **Field Verification Officer (Human Intervention)**. This ensures public funds are only released via the payment gateway after strict human validation, simultaneously creating monitoring jobs.

---

## 🛠️ Technical Stack

*   **Frontend:** React, Next.js (App Router), TailwindCSS (for modern, glassmorphic UI aesthetics).
*   **Backend:** Node.js (via Next.js Server Actions for seamless API routes and minimal latency).
*   **Database:** SQLite / PostgreSQL managed via Prisma ORM for robust relational data integrity (Crucial for financial milestones).
*   **AI Engine:** Multimodal LLMs (e.g., Gemini 1.5 Pro) for native, massive-context processing of pitch decks and structural planning without RAG overhead.
*   **APIs & Security:** Live MediaCapture Web APIs for fraud prevention.

---

## 📚 References & Integrations

Our solution is built upon and references the following real-world policies and frameworks:

*   **Maharashtra State Innovative Startup Policy 2018:** Specifically Rule 4.5.2 regarding procurement relaxations for recognized startups.
*   **Startup India (DPIIT):** Leveraging Department for Promotion of Industry and Internal Trade recognition guidelines for prior-experience and turnover exemptions. ([Startup India](https://www.startupindia.gov.in/))
*   **Government e-Marketplace (GeM):** Startup Runway Guidelines & API Framework for future scale-up integrations. ([GeM Portal](https://gem.gov.in/))
*   **General Financial Rules (GFR 2017):** Rule 170(i) & Rule 173(i) on Exemption from Prior Turnover and EMD for Startups.
*   **DPDP Act 2023:** Digital Personal Data Protection Act compliance for handling citizen data during government pilots.

---

*Built with ❤️ during BU-SIH 2026*
