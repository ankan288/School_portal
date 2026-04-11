# School Portal

Welcome to the **School Portal**! This is a modern, responsive web application designed to provide an interactive platform for students, parents, and administrators to communicate, view announcements, and manage school content.

## 🏗️ Project Structure

This project is organized as a monorepo setup:
- `/frontend` - The Next.js web application containing the UI and client-side logic.
- `/backend` - The Python backend (currently in its initial setup phase).
- A unified `.gitignore` at the project root manages ignore rules for both environments.

## ✨ Features

### 1. Modern Landing Page (`/`)
- A highly polished, responsive "Get Started" landing page featuring custom SVG masks and a locked single-viewport layout.
- Clean typography, yellow/green aesthetic accents, and premium UI design tailored for educational institutions.

### 2. Interactive Announcement Feed (`/announcements`)
- **Split Layout:** A sleek 2-column layout mimicking modern social media feeds. Includes a main feed for rich media (images/videos) and a sticky right sidebar for quick text notices.
- **Multimedia Support:** Posts beautifully display full-width images and video players.
- **Engagement:** Users can like and comment on posts with optimistic UI updates.
- **Bulletproof Styling:** Comprehensive word-wrapping explicitly handles long strings and unbroken text to maintain layout integrity.

### 3. Robust Authentication & User Profiles (`/profile`)
- **Secure Sign-In:** Users log in using a streamlined native Modal.
- **Dynamic Profiles:** A dedicated dashboard where users can view their email, role badge, and effortlessly update their Display Name.
- **Role-Based Access Control (RBAC):** Users hold either a standard `user` or an elevated `admin` role.

### 4. Admin Content & Moderation Dashboard (`/admin` & `/admin/content`)
- **Security Gated:** Strictly isolated to `"admin"` users.
- **Content Publishing:** Easily upload new text notices, event gallery images, or video highlights directly to Supabase storage.
- **Moderation Tools:** Manage all posts via a clean tabbed interface. Edit headlines, instantly delete abusive comments, or remove entire posts (which cascades to associated comments).

### 5. Dedicated Home Page & Responsive Navigation (`/home`)
- **Interactive Image Carousel:** A new dedicated homepage featuring a modern, auto-playing image slider with manual controls (dots and arrows) and rounded UI styling. Continuously loops through a diverse set of educational images.
- **Call-to-Action Center:** Includes a "Helping Each Other Can Make The World Better" showcase section with prominent "Donate Now" and "Know About Us" buttons.
- **Impact Story Preview:** A structured layout ready to display user impact stories.
- **Mobile-Responsive Navbar:** An updated navigation bar featuring a mobile-friendly "Hamburger" dropdown menu. Gracefully handles desktop (horizontal links) and smartphone (vertical drawer) views, including conditional rendering for User Profile, Admin Panel, and Logout actions.

## 🛠️ Tech Stack
- **Frontend Framework:** Next.js (React App Router)
- **UI/Styling:** Tailwind CSS (with custom scrollbar plugins and arbitrary values)
- **Backend Services:** Supabase (PostgreSQL Database, Authentication, and Storage Buckets)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) configured in your environment.
- A [Supabase](https://supabase.com/) project configured with `profiles`, `posts`, `comments`, and `likes` tables, alongside `images` and `videos` storage buckets.

### 1. Setup the Frontend
Navigate into the `frontend` directory and install the required dependencies:
```bash
cd frontend
npm install
```

### 2. Environment Variables
Create a new `.env.local` file inside the `frontend` folder with your Supabase keys:
```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 3. Start the Development Server
Run the local dev server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` to interact with the application.

### 4. Granting Admin Privileges
To grant an account full "Admin" access for the moderation tools:
1. Log into your Supabase Dashboard.
2. Open the `profiles` table.
3. Locate the targeted user record.
4. Update the `role` column to `"admin"`.
5. Have the user refresh the web app to instantly unlock the hidden admin views.
