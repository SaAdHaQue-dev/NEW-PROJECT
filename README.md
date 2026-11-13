# Spaciaz — Fullstack Real Estate & Architecture Platform

A fullstack web application inspired by luxury architectural design systems.
Built with **React 19**, **Tailwind CSS v4**, and **Lenis** smooth momentum
scrolling, powered by a modular **Node.js / Express** backend connected to
**MongoDB Atlas Cloud Database**, complete with a secure **Admin Management Console**.

---

## 🔐 Admin Panel Access & Credentials

Only the authorized administrator can log into the Admin Console to manage the
entire website (Hero text, stats, brand info, projects in MongoDB, and client leads).

- **Admin URL:** <http://localhost:5173/#admin>
  *(Or click "Admin Console 🔒" in the footer)*
- **Default Username:** `admin`
- **Default Password:** `admin123`
- **Security:** 256-bit JWT authentication with password hashing (bcrypt).
  Password can be updated anytime inside the Admin Settings tab or in `backend/.env`.

---

## 📁 Architecture Overview

```text
NEW PROJECT/
├── frontend/                       # React 19 + Tailwind CSS v4 + Vite
│   ├── src/
│   │   ├── admin/                  # Secure Admin Management Portal
│   │   │   ├── AdminLogin.jsx      # Luxury dark login screen
│   │   │   ├── AdminDashboard.jsx  # Main admin layout with tabs
│   │   │   ├── adminService.js     # JWT auth & API client
│   │   │   └── tabs/
│   │   │       ├── OverviewTab.jsx # Metrics & quick navigation
│   │   │       ├── ContentTab.jsx  # Hero, brand & stats live editor
│   │   │       ├── ProjectsTab.jsx # MongoDB projects CRUD manager
│   │   │       ├── InquiriesTab.jsx# Client leads & messages viewer
│   │   │       └── SettingsTab.jsx # Password updater & session
│   │   ├── components/             # Public website components
│   │   ├── services/               # Hero customizable services
│   │   ├── data/websiteData.js     # Fallback data
│   │   ├── App.jsx                 # View switcher (Site / Admin) & API sync
│   │   └── index.css               # Tailwind CSS & Lenis momentum scrolling
│   ├── .env                        # Client environment variables
│   └── package.json
│
├── backend/                        # Node.js + Express + Mongoose (ES Modules)
│   ├── config/
│   │   ├── db.js                   # MongoDB Atlas connection handler
│   │   └── seedAdmin.js            # Auto-seeds default admin into MongoDB
│   ├── middleware/
│   │   └── auth.js                 # JWT verification middleware
│   ├── models/
│   │   ├── Admin.js                # Admin credentials schema
│   │   ├── Project.js              # Projects collection schema
│   │   └── Inquiry.js              # Client leads collection schema
│   ├── routes/
│   │   ├── authRoutes.js           # /api/auth/login, /api/auth/me, password
│   │   ├── siteRoutes.js           # /api/site (GET public, PUT protected)
│   │   ├── projectRoutes.js        # /api/projects (CRUD protected)
│   │   └── inquiryRoutes.js        # /api/inquiries (GET protected)
│   ├── server.js                   # Main Express server
│   ├── .env                        # PORT, MONGO_URI, ADMIN credentials, JWT_SECRET
│   └── package.json
│
├── .gitignore                      # Protects environment credentials
└── README.md
```

---

## 🍃 Database (MongoDB Atlas)

- **Cluster:** `Cluster0` (`AWS / Mumbai ap-south-1`)
- **Database Name:** `spaciaz_db`
- **Collections:**
  - `admins`: Stores hashed admin credentials.
  - `projects`: Luxury developments with real-time CRUD via Admin Panel.
  - `inquiries`: Client leads submitted from the website 'Get In Touch' modal.

---

## 🚀 Getting Started

### 1. Run the Backend Server

```bash
cd backend
npm run dev
```

- **Base URL:** <http://localhost:5000>
- **Health Check:** <http://localhost:5000/api/health>

---

### 2. Run the Frontend Application

```bash
cd frontend
npm run dev
```

- **Website URL:** <http://localhost:5173>
- **Admin Console:** <http://localhost:5173/#admin>
