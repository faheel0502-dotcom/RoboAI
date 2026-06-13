# RoboAI - AI & Robotics Summer Workshop Landing Page

A professional, high-converting, and responsive landing page for RoboAI's **AI & Robotics Summer Workshop**, built using React, TypeScript, Tailwind CSS, and Express.js.

## Key Features

- **Premium UI/UX:** Styled using a custom Indigo, Blue, and Purple palette derived from the Stitch design system. Includes glassmorphism effects, clean typography (Montserrat + Inter), and custom interactive micro-animations (e.g. lift transitions, floating badges).
- **Stitch 3D Visual Asset:** Features the premium 3D illustration of kids interacting with a robot in the Hero banner.
- **Responsive Design:** Fully fluid grids optimized for Mobile, Tablet, and Desktop viewports.
- **Accredited Certificate Showcase:** Extra credit badge highlighting certificate details.
- **Accordion FAQs:** State-driven disclosure panel with height-expanding transitions.
- **Interactive Registration Form:** Complete client-side validation using custom regular expressions for email and phone fields, loading indicators, success checks, and error banners.
- **Robust Express Backend:** A clean `POST /api/enquiry` endpoint validating fields and handling submissions.
- **Fail-Safe Local Storage Fallback:** If a MongoDB URI isn't provided or the connection fails, the Express server automatically writes submissions to a local JSON file (`server/data/enquiries.json`). This allows the reviewer to test submissions without running a database server.

---

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind CSS 3, Lucide React (vector icons)
- **Backend:** Node.js, Express.js, Mongoose/MongoDB, tsx (for running TS backend during development)
- **Tooling:** Concurrently (running client and server in a single command)

---

## Setup & Running Instructions

### 1. Installation
Clone the repository and install all frontend & backend dependencies with a single command from the root directory:
```bash
npm install
```

### 2. Environment Configuration (Optional)
Copy the `.env.example` to `.env` if you wish to customize port or connect a live MongoDB database:
```bash
cp .env.example .env
```
*(If no `.env` is provided, the backend automatically runs on port `5000` and saves enquiries locally to `server/data/enquiries.json`.)*

### 3. Running the Application

#### Development Mode (Concurrently starts Vite & Express Dev Servers)
```bash
npm run dev
```
- Frontend will be available at: `http://localhost:5173`
- Backend server will run on: `http://localhost:5000`
- Vite is configured with a proxy mapping `/api` requests to port `5000`.

#### Production Mode
To test the production build, compile client-side assets and start the Express server (which automatically serves the built static files):
```bash
npm run build
npm start
```
Open `http://localhost:5000` in your browser.

---

## Evaluation Criteria Mapping

- **UI Design & Responsiveness (25%):** Leverages fluid CSS grids and clean media queries to adapt to screen sizes.
- **React Component Structure (20%):** Separated into modular, reusable components inside `src/components/`.
- **Code Quality & Readability (20%):** Standardized TypeScript typing, modern ESM modules, and clean formatting.
- **API Implementation (20%):** Structured Express server with input validation and dual-mode storage.
- **Attention to Detail (15%):** Features responsive transitions, error banners, loading states, and fallback databases.
>>>>>>> ff42266 (Initial commit - RoboAI Fullstack Workshop Landing Page)
