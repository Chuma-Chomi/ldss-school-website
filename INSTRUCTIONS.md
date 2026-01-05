# Lukulu Day Secondary School Portal - Setup Guide

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database

## Installation

1. **Clone/Unzip** the project.
2. **Install Dependencies**:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```

## Configuration

1. **Database**:
   Ensure your `.env` file in `server/` has the correct `DATABASE_URL`.
   ```env
   DATABASE_URL="postgresql://postgres:password@localhost:5432/ldss_rebuild?schema=public"
   JWT_SECRET="your_secret_key"
   ```

2. **Database Schema**:
   Apply the schema to your database.
   ```bash
   cd server
   npx prisma db push
   npx prisma generate
   ```

3. **Seeding Data** (Optional):
   Populate the database with initial admin and sample data.
   ```bash
   # While server is running
   curl -X POST http://localhost:5000/api/seed
   # Or via browser: http://localhost:5000/api/seed
   ```
   **Default Admin Credentials:**
   - Email: `admin@ldss.edu.zm`
   - Password: `admin123`

## Running the Application

1. **Start the Backend**:
   ```bash
   cd server
   npm run dev
   ```
   (Server runs on port 5000)

2. **Start the Frontend**:
   ```bash
   cd client
   npm run dev
   ```
   (Client runs on port 5173 or similar)

3. **Access**:
   Open your browser to `http://localhost:5173`.

## Features
- **User Portals**: Admin, Staff, Learner.
- **Academics**: Class management, Subject allocation, Grading.
- **Scheduling**: Timetables, School Calendar.
- **Communication**: Internal messaging, Announcements.
- **Reporting**: Printable PDF Report Cards.

## Troubleshooting
- **Prisma Errors**: Run `npx prisma generate` in `server/` if you change the schema.
- **Connection Refused**: Ensure PostgreSQL service is running.
