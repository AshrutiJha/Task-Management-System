# 🚀 Task Manager - Full Stack Application

## 📌 Overview
A full-stack Task Management application built using Next.js (frontend) and Node.js + Prisma + PostgreSQL (backend).  
It allows users to register, login, and manage their tasks efficiently with search and filtering capabilities.

---

## 🛠 Tech Stack

### Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- Prisma ORM
- PostgreSQL (Supabase)
- JWT Authentication

---

## 🔐 Features

### Authentication
- User Registration
- Login with JWT
- Access & Refresh Token handling
- Logout functionality

### Task Management
- Create Task
- View Tasks
- Update Task (Toggle status)
- Delete Task

### Advanced Features
- 🔍 Search Tasks
- 🔽 Filter (All / Completed / Pending)
- ⚡ Optimistic UI updates
- 🔐 Protected routes

---

## 📁 Folder Structure


frontend/
src/
app/
components/
lib/

backend/
src/
controllers/
routes/
services/
middleware/
prisma/


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone <your-repo-link>
cd task-manager
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create .env:
```bash
DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
```

Run backend:
```bash
npx prisma migrate dev
npm run dev
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```


---

## 🌐 API Endpoints

### Auth

* POST /auth/register
* POST /auth/login
* POST /auth/refresh

### Tasks

* GET /tasks
* POST /tasks
* PATCH /tasks/:id/toggle
* DELETE /tasks/:id


---

## 🎯 Key Highlights

* Clean architectur (Controller-Service pattern)
* Secure authentication using JWT
* Optimized frontend with instant UI updates
* Responsive and modern UI design


---

## 👨‍💻 Author

Ashruti Jha