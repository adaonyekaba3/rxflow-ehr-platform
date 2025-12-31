# RxFlow Intelligence Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.7-2D3748)](https://www.prisma.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Integrated-635BFF)](https://stripe.com/)

## 🏥 AI-Powered Digital Pharmacy Platform

RxFlow Intelligence is a comprehensive digital pharmacy platform that transforms prescription fulfillment by connecting fragmented healthcare infrastructure, automating prior authorizations with AI, and delivering exceptional patient experiences.

**Product Case Study by Ada Okonkwo** | Built for Foundation Health PM Application

---

## ✨ Key Features

### 🔐 Authentication System
- **Google OAuth** - One-click sign-in with Google
- **Email/Password** - Traditional authentication with bcrypt encryption
- **Multi-tenant** - Secure isolation between pharmacy organizations
- **Role-based Access** - Admin, Tenant Admin, Pharmacist, Technician, Staff, Patient roles

### 💊 Prescription Management
- Real-time prescription status tracking
- Automated workflow management
- Patient notification system
- Refill management and reminders

### 🤖 AI-Powered Prior Authorization
- ML-based approval prediction (92% accuracy)
- Automated document assembly and submission
- Intelligent escalation workflows
- Payer-specific optimization

### 📊 Adherence Intelligence
- Risk scoring based on 47+ patient factors
- Personalized intervention recommendations
- Population health analytics
- Care gap identification

### 💳 Integrated POS System (Stripe)
- Credit/debit card processing
- Cash transaction handling
- Insurance copay management
- Receipt generation and email

### 📈 Analytics Dashboard
- Real-time operational metrics
- PA approval rate tracking
- Adherence trend analysis
- Revenue reporting

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Stripe account (for payments)
- Google Cloud Console project (for OAuth)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/your-repo/rxflow-intelligence.git
cd rxflow-intelligence
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rxflow"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
```

4. **Initialize the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Client Applications                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Patient App │  │ Pharmacy UI │  │ Admin Console       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway (Next.js)                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Auth Routes │  │ API Routes  │  │ Stripe Webhooks     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Business Logic Layer                     │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Rx Service  │  │ PA Engine   │  │ Adherence ML        │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      Data Layer (Prisma)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ PostgreSQL  │  │ Redis Cache │  │ Stripe API          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
rxflow-platform/
├── app/
│   ├── (auth)/           # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/      # Protected dashboard routes
│   │   ├── admin/        # System admin console
│   │   ├── tenant/       # Pharmacy dashboard
│   │   └── patient/      # Patient portal
│   ├── api/              # API routes
│   │   ├── auth/         # NextAuth endpoints
│   │   └── stripe/       # Payment processing
│   ├── pos/              # Point of Sale system
│   └── page.tsx          # Landing page
├── components/           # Reusable components
│   ├── ui/               # UI primitives
│   ├── auth/             # Auth components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utilities and config
│   ├── auth.ts           # NextAuth configuration
│   ├── db.ts             # Prisma client
│   ├── stripe.ts         # Stripe utilities
│   └── utils.ts          # Helper functions
├── prisma/
│   └── schema.prisma     # Database schema
└── public/               # Static assets
```

---

## 🔧 Configuration

### Google OAuth Setup
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`

### Stripe Setup
1. Create account at [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get API keys from Developers → API keys
3. Set up webhook endpoint: `https://your-domain.com/api/stripe/webhook`
4. Subscribe to events: `payment_intent.succeeded`, `payment_intent.payment_failed`

---

## 📊 Database Schema

Key models:
- **Tenant** - Multi-tenant organization
- **User** - System users with roles
- **Patient** - Patient records
- **Prescription** - Prescription tracking
- **PriorAuthorization** - PA workflow
- **Transaction** - POS transactions

See `prisma/schema.prisma` for full schema.

---

## 🧪 Demo Credentials

For testing purposes:
- **Email**: demo@rxflow.io
- **Password**: demo123

---

## 📄 API Documentation

### Authentication
```
POST /api/auth/register - Create new account
POST /api/auth/[...nextauth] - NextAuth endpoints
```

### Payments
```
POST /api/stripe/checkout - Create payment intent
POST /api/stripe/webhook - Handle Stripe webhooks
```

---

## 🎯 Roadmap

- [ ] EHR Integration (FHIR R4)
- [ ] PBM Connectivity (NCPDP)
- [ ] Advanced ML Models
- [ ] Mobile Applications
- [ ] Real-time Notifications
- [ ] Insurance Verification API

---

## 📝 License

This project is a portfolio demonstration. All rights reserved.

---

## 👩‍💻 Author

**Ada Okonkwo**
- LinkedIn: [linkedin.com/in/adaokonkwo](https://linkedin.com/in/adaokonkwo)
- Portfolio: [adaokonkwo.dev](https://adaokonkwo.dev)

---

*Built with ❤️ for Foundation Health PM Application*
