
# 🌍 Travelynk – Social Travel & Meetup Platform

[Frontend Live Demo](https://travelynk-mu.vercel.app) | [Frontend GitHub](https://github.com/Sushanto171/travelynk) | [Backend GitHub](https://github.com/Sushanto171/travelynk-server)

Travelynk is a subscription-based platform that connects travelers heading to similar destinations, enabling them to share trips, discover companions, and create memorable shared experiences.

The system blends **social networking**, **travel discovery**, and **secure monetization**, with a modern, responsive, and scalable architecture.

---

## 🚀 Project Vision

- Transform solo travel into shared experiences  
- Enable travelers to discover compatible companions  
- Build a trusted community through reviews, ratings, and verified profiles  
- Support subscription-based premium features  

---

## 🎯 Objectives

- Build a secure, scalable web platform  
- Enable trip sharing and traveler matching  
- Implement role-based authentication (User / Admin)  
- Integrate subscription and payment infrastructure  
- Provide a responsive, engaging UI/UX  

---

## 🧩 Core Features

### 1. Authentication & Authorization
- Email & password login  
- OTP-based email verification during registration  
- JWT-based session management  
- Role-based access control:
  - **User:** manage profiles, travel plans, reviews  
  - **Admin:** manage users, content, and subscriptions  

### 2. User Profile Management (CRUD)
- Full Name, Profile Image, Bio  
- Travel Interests, Visited Countries, Current Location  
- Public profile view for discovery  

### 3. Travel Plan Management (CRUD)
- Destination, Travel Dates, Budget, Travel Type  
- Short itinerary or description  
- Visibility for matching and discovery  

### 4. Search & Matching
- Filter travelers by destination, date, and interests  
- Discover compatible travel companions  

### 5. Review & Rating
- Post-trip review system  
- 1–5 star rating with editable reviews  
- Display average ratings and recent reviews on profiles  

### 6. Subscription & Payment
- Premium access (monthly/yearly subscriptions)  
- Verified badge purchase after subscription  
- Payment gateway integration: Stripe 
- Webhook handling for secure payment confirmation  

---

## 🔄 Registration & OTP Verification Flow

```mermaid
flowchart TD
    A[User Registration Form] --> B[Submit Email & Password]
    B --> C[System Generates OTP]
    C --> D[Send OTP to User Email]
    D --> E[Redirect to OTP Verification Page]
    E --> F[User Inputs OTP]
    F --> G{Is OTP Valid?}
    G -- No --> H[Show Error / Retry Option]
    G -- Yes --> I[Mark User as Verified]
    I --> J[Auto-login via JWT]
    J --> K[Redirect to Dashboard / Landing Page]
````

**Flow Summary:**

1. User registers with email and password.
2. OTP is sent to their email.
3. User is redirected to OTP verification page.
4. OTP is verified by the system.
5. On success, account is marked verified, and the user is auto-logged in.

**Security:**

* OTPs stored hashed, time-bound, and single-use
* Rate-limiting and retry controls prevent abuse
* Auto-login uses HTTP-only cookies with JWT

---

## 📋 User Interaction & Feature Flow

### 1. Create Travel Plan

1. User logs in.
2. Navigate to **Navbar → My Travel Plans**.
3. Click **“Create Plan”** button.
4. Fill in travel plan details:

   * Destination (city/country)
   * Start & end dates
   * Budget
   * Travel type (Solo, Friends, Family)
   * Short itinerary / description
5. Submit → Plan is saved and visible in **My Travel Plans** and for matching/discovery.

### 2. Subscription & Premium Access

1. Navigate to **Profile → Premium Subscription**.
2. Choose a subscription plan (Monthly / Yearly).
3. Proceed to payment:

   * **Success:** Redirect to `/success` → display confirmation → auto-redirect to profile after delay.
   * **Cancel:** Redirect to `/cancel` → display cancel message → auto-redirect to profile after delay.
4. Verified badge enabled and premium features unlocked on success.

### 3. Join Travel Plan

1. Explore trips under **Find Travels / Discover Travelers**.
2. Select a plan → open **Plan Details** page.
3. Click **“Join Request”** → request sent to plan host.
4. Request pending until host approves or rejects.

### 4. Request Management (as Host)

1. Go to **My Travel Plans → select a plan → View Details**.
2. Right side **Management Panel** shows join requests.
3. Host can:

   * Accept request → adds user to plan
   * Reject request → notifies user
   * View all participants

### 5. Post-Trip Review

1. After a travel plan is completed, participants can leave reviews.
2. Navigate to **Dashboard → Joined Plans → select completed plan → Write Review**.
3. Review includes star rating (1–5) and detailed feedback.
4. Reviews appear on:

   * Host’s plan page
   * User profiles → contributing to average rating

### 🔄 Summary Flow Diagram

```mermaid
flowchart TD
    A[Login] --> B[Navbar → My Travel Plans]
    B --> C[Click "Create Plan"]
    C --> D[Submit Plan Details] --> E[Plan Saved / Visible]
    
    F[Profile → Premium Subscription] --> G[Choose Plan & Payment]
    G --> H{Payment Result}
    H -- Success --> I[/success → Redirect Profile]
    H -- Cancel --> J[/cancel → Redirect Profile]
    
    K[Find Travels → Select Plan] --> L[Plan Details]
    L --> M[Click Join Request] --> N[Host Receives Request]
    N --> O{Host Action}
    O -- Accept --> P[User Added to Plan]
    O -- Reject --> Q[User Notified]
    
    R[Completed Plan → Dashboard → Joined Plans] --> S[Write Review]
    S --> T[Review Saved & Displayed on Profiles]
```

---

## 🛠️ Tech Stack

**Backend:** Node.js, Express.js, TypeScript, Prisma, JWT, Redis, Stripe
**Frontend:** Next.js 16, React 19, Radix UI, TailwindCSS, cmdk, sonner, date-fns
**Database:** PostgreSQL / MongoDB
**File Upload:** Multer + Cloudinary
**Validation:** Zod
**Email:** Nodemailer

---

## 📁 Project Structure

**Backend**

```bash
src/
 ├── modules/           # Feature modules (auth, travel, review, subscription)
 ├── middlewares/       # Auth, error handling, validation
 ├── utils/             # Helpers & shared utilities
 ├── config/            # Environment & service configs
 ├── routes/            # API routes
 ├── prisma/            # Prisma schema & migrations
 └── server.ts          # App bootstrap
```

**Frontend**

```bash
src/
 ├── components/       # Shared UI components
 ├── modules/          # Feature modules (auth, travel, reviews, subscriptions)
 ├── hooks/            # Custom React hooks
 ├── pages/            # Next.js pages & routing
 ├── services/         # API clients and utils
 ├── styles/           # TailwindCSS configurations
 ├── utils/            # Helpers (date formatting, validation)
 └── types/            # TypeScript interfaces & enums
```

---

## ⚙️ Environment Variables

**Backend (.env)**

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret
CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx
```

**Frontend (.env.local)**

```env
NEXT_PUBLIC_API_URL=https://api.travelynk.com
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxx
NEXT_PUBLIC_OTP_EXPIRATION=300
```

> **Security Note:** Never commit credentials, OTP secrets, or private keys to the repository. Use environment variables.

---

## 📦 Scripts

**Backend**

```bash
pnpm dev            # Run in development
pnpm build          # Build backend
pnpm start          # Start production
pnpm db:migrate     # Prisma migrations
pnpm stripe:webhook # Stripe webhook listener
```

**Frontend**

```bash
pnpm dev    # Run Next.js development server
pnpm build  # Build for production
pnpm start  # Start production server
pnpm lint   # Linting
```

---

## 🔐 Security & Best Practices

* JWT-based authentication with HTTP-only cookies
* OTP verification for secure registration
* Rate-limiting for OTP requests
* Input validation via Zod
* Modular and type-safe code architecture

---

## 📈 Deployment

* **Platform:** Vercel (Frontend & Backend can be deployed separately)
* **Frontend Live URL:** [https://travelynk-mu.vercel.app](https://travelynk-mu.vercel.app)
* **Backend Deployment URL:** TBD

---

## 🤝 Contribution Guidelines

* Maintain **type safety** and modular design
* Write clean, reusable components
* Handle credentials and OTP securely via environment variables
* Follow **TailwindCSS and Radix UI conventions**

---

## ✨ Final Notes

Travelynk provides a **scalable, secure, and user-friendly social travel experience**. Its architecture supports **future expansion**, including real-time chat, AI-based travel suggestions, and global subscription monetization.

```

