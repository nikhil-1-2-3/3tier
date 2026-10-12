# Logicwind Company Website & Client Booking Portal

A modern, responsive, full-stack corporate web portal and consultation scheduling platform for **Logicwind** built with React, Vite, Tailwind CSS, Node.js, Express, PostgreSQL, and Prisma ORM.

---

## 1. Project Overview

- **Landing Page**: Modern corporate landing page featuring dynamic hero presentation, active capabilities/services cards, company story, core engineering principles, sample client testimonials, and direct contact CTAs.
- **Service Catalog**: Searchable and filterable technology services directory loaded directly from PostgreSQL.
- **Service Booking Portal**: Full booking workflow with validation (no past dates, restricted time slots), unique reference generation (`LW-BK-XXXXX`), status tracking (`REQUESTED`), and cancellation support.
- **Authentication**: Secure registration and login with bcrypt password hashing, HttpOnly cookies, and protected client routes (`/my-bookings`).
- **Help & Support**: Searchable and categorised FAQ accordion alongside a direct support enquiry form with database persistence.
- **API Security**: Request validation, rate limiting for auth and submission endpoints, CORS credentials handling, and centralized error handling.

---

## 2. Technology Stack

- **Frontend**: React 18, Vite, React Router 6, Tailwind CSS, Lucide React icons.
- **Backend**: Node.js, Express.js (ES Modules), cookie-parser, bcryptjs, jsonwebtoken, express-rate-limit.
- **Database**: PostgreSQL 16 with Prisma ORM and automated migrations.
- **Local Dev / Containerization**: Docker Compose with health checks and persistent storage.

---

## 3. Repository Structure

```text
railflow/ (workspace root)
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma        # Prisma models (User, Service, Booking, SupportEnquiry)
│   │   ├── migrations/          # Version-controlled SQL migrations
│   │   └── seed.js              # Seed script for initial services & demo user
│   ├── src/
│   │   ├── controllers/         # authController, bookingController, serviceController, supportController
│   │   ├── middleware/          # auth (HttpOnly JWT), rateLimiter
│   │   ├── routes/              # healthRoutes, authRoutes, serviceRoutes, bookingRoutes, supportRoutes
│   │   ├── utils/               # prisma client, referenceGenerator
│   │   └── app.js               # Express application setup, CORS, and error handlers
│   ├── test/                    # Integration test suite (Node.js test runner)
│   ├── Dockerfile
│   ├── server.js                # Server entry point (Port 5000)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/          # Navbar, Footer, Button, Input, Textarea, Select, FormField, Card, Modal, Spinner, Alert, StatusBadge, ProtectedRoute
│   │   │   ├── home/            # Hero, ServicesOverview, AboutSection, FeaturesSection, TestimonialsSection, ContactSection
│   │   │   ├── services/        # ServiceCard
│   │   │   └── help/            # FaqAccordion
│   │   ├── context/             # AuthContext (user session & auth actions)
│   │   ├── pages/               # HomePage, ServicesPage, AboutPage, BookPage, BookingSuccessPage, MyBookingsPage, HelpPage, LoginPage, SignupPage
│   │   ├── services/            # Universal API client wrapper
│   │   ├── App.jsx              # Routes & Layout
│   │   └── main.jsx
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
├── docker-compose.yml           # Multi-container orchestration (PostgreSQL, Backend, Frontend)
├── .env.example                 # Documented environment variables template
└── README.md
```

---

## 4. Local Quick Start Guide

### Prerequisites
- Node.js (v18 or v20+)
- npm (v9+)
- PostgreSQL 16 (Native or via Docker)

### Step 1: Clone and Configure Environment

```bash
cp .env.example backend/.env
```

Ensure `backend/.env` has:
```env
PORT=5000
NODE_ENV=development
DATABASE_URL="postgresql://logicwind_user@localhost:5433/logicwind_db?schema=public"
JWT_SECRET="logicwind_production_ready_jwt_secret_key_minimum_32_characters_2026"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:5173"
```

### Step 2: Install Dependencies

```bash
# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

### Step 3: Database Migration & Seeding

```bash
cd backend
npx prisma migrate dev
npm run prisma:seed
```

This populates 6 active Logicwind services, a demo user, and a system administrator:
- **Client Demo:** `demo@logicwind.com` / `DemoPass123!`
- **Admin Console:** `admin@logicwind.com` / `AdminPass123!` (Access at `/admin`)

### Step 4: Run Application

In terminal 1 (Backend API):
```bash
cd backend
npm run dev
# Running on http://localhost:5000
```

In terminal 2 (Frontend UI):
```bash
cd frontend
npm run dev
# Running on http://localhost:5173
```

---

## 5. Docker Compose Startup

To run the entire stack with Docker:

```bash
docker compose up --build -d
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5000`
- PostgreSQL: `localhost:5433`

---

## 6. Running Tests

Execute the automated test suite covering all health, authentication, booking, and support endpoints:

```bash
cd backend
npm test
```

---

## 7. REST API Documentation

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `GET` | `/api/health` | Public | System health & database connection status |
| `POST` | `/api/auth/signup` | Public | Register new user account |
| `POST` | `/api/auth/login` | Public | Authenticate user & issue HttpOnly cookie |
| `POST` | `/api/auth/logout` | Public | Invalidate authentication session |
| `GET` | `/api/auth/me` | Authenticated | Retrieve current user profile |
| `GET` | `/api/services` | Public | List all active services |
| `GET` | `/api/services/:id` | Public | Get single service detail |
| `POST` | `/api/bookings` | Public/Auth | Submit new consultation request |
| `GET` | `/api/bookings/mine` | Authenticated | View authenticated user's bookings |
| `GET` | `/api/bookings/:id` | Owner/Public Ref | Get booking detail |
| `PATCH`| `/api/bookings/:id/cancel` | Authenticated | Cancel user's booking request |
| `POST` | `/api/support` | Public | Submit support enquiry to database |
| `GET` | `/api/admin/stats` | Admin | Administrative analytics & counts |
| `GET` | `/api/admin/bookings` | Admin | Filter & search all system bookings |
| `PATCH`| `/api/admin/bookings/:id/status` | Admin | Update booking status (`CONFIRMED`, `COMPLETED`, `CANCELLED`) |
| `GET` | `/api/admin/enquiries` | Admin | Review support enquiry messages |
| `PATCH`| `/api/admin/enquiries/:id/status` | Admin | Update enquiry status (`RESOLVED`, `CLOSED`) |
| `POST` | `/api/admin/services` | Admin | Create new service offering |
| `PUT` | `/api/admin/services/:id` | Admin | Edit service or toggle active flag |
| `GET` | `/api/admin/users` | Admin | Registered user directory |
