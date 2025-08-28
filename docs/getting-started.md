# Getting Started

Follow these steps to set up and run Echoboard locally.

## Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

## Installation

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**
   
   Copy `.env.example` to `.env` and fill in the required values.

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/components/` – UI and canvas components
- `src/app/` – Next.js app directory (routing, pages, API)
- `src/hooks/` – Custom React hooks
- `src/lib/` – Utility functions
- `src/server/` – Server-side logic (DB, auth)
- `prisma/` – Prisma schema and migrations
- `styles/` – Global styles
