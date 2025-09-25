# 🚀 PrimeTrade AI - Task Management Application

A full-stack task management application built with React, Node.js, Express, and MongoDB. Features secure user authentication, comprehensive profile management, and full task CRUD operations with responsive design.

## 📋 Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Scaling Strategies](#scaling-strategies)

## ✨ Features

- **User Authentication** - Registration, login, logout with JWT
- **Task Management** - Create, view, update, delete tasks
- **Profile Management** - User profile updates
- **Responsive UI** - Modern design with Tailwind CSS

## 🛠 Tech Stack

**Frontend:** React, Vite, Redux Toolkit, React Router, Tailwind CSS

**Backend:** Node.js, Express.js, MongoDB, JWT, bcrypt

## 📁 Project Structure

```
primetrade-ai/
├── frontend/     # React app
├── backend/      # Express API
└── README.md
```

## 🚀 Setup Instructions

**Prerequisites:** Node.js, npm, MongoDB Atlas, Git

**Clone & Install:**
```bash
git clone https://github.com/suraj-kumarprajapati/primetradeai_assignment.git
cd primetrade-ai

# Backend
cd backend && npm install && npm run dev

# Frontend  
cd frontend && npm install && npm run dev
```

## 🔧 Environment Variables

**Backend (.env):**
```bash
# Server Configuration
PORT=
NODE_ENV=

# Database Configuration
MONGO_URI=

# JWT Configuration
JWT_SECRET=
JWT_EXPIRES_IN=7d

# Cookie Configuration
COOKIE_EXPIRES_TIME=7

# Frontend URL
FRONTEND_URL=
```

**Frontend (.env):**
```bash
# Backend API URL
VITE_API_URL=
```

## 📚 API Endpoints

**Auth:** `/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/auth/logout`

**Tasks:** `/api/v1/tasks` (GET, POST, PUT, DELETE)

**Users:** `/api/v1/users/profile` (GET, PUT)


## 📈 Scaling Strategies

We can scale our API efficiently using these approaches:

**Organize Controllers** - We can separate controllers by features (auth, tasks, users) to maintain clean code organization and easier maintenance.

**Use Service Layer** - We can create dedicated service files for business logic, keeping controllers lightweight and focused on request handling.

**Group Routes** - We can organize routes with proper versioning like /api/v1/ to support future updates while maintaining backward compatibility.
