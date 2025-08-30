
# Echoboard

<p align="center">
    <img src="https://img.shields.io/badge/Next.js-000?logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-20232a?logo=react&logoColor=61dafb" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Prisma-2d3748?logo=prisma&logoColor=white" alt="Prisma" />
    <img src="https://img.shields.io/badge/NextAuth.js-3b82f6?logo=nextdotjs&logoColor=white" alt="NextAuth.js" />
    <img src="https://img.shields.io/badge/Liveblocks-7c3aed?logo=liveblocks&logoColor=white" alt="Liveblocks" />
</p>

---

## Project Overview

**Echoboard** is a modern, collaborative whiteboard application built with the latest web technologies. It enables real-time drawing, annotation, and communication for teams and individuals. Designed for seamless collaboration, Echoboard supports live multi-user editing, voice chat, and a variety of drawing tools, making it ideal for brainstorming, teaching, and remote teamwork.

## Project Demo

[echoboard-demo](https://github.com/user-attachments/assets/98151c07-8acb-4579-a290-163d213149f1)

## Key Features

- 🎨 **Multi-layer Canvas**: Draw rectangles, ellipses, freehand paths, and text. Each layer is independently editable.
- 🖌️ **Color Picker**: (Upcoming) Easily select fill and stroke colors for every layer type.
- 👥 **Real-time Collaboration**: See other users' cursors and edits instantly using Liveblocks.
- 🔒 **Authentication**: Secure sign-in and sign-up with NextAuth.js, supporting multiple providers.
- 🗂️ **Room Management**: Create, join, and manage collaborative rooms.
- 🗣️ **Voice Chat**: (Upcoming) Communicate with collaborators directly within the app.
- 🧩 **Component-based Architecture**: Built with reusable React and shadcn UI components.
- ⚡ **Performance**: Optimized for low-latency updates and smooth drawing experience.
- 🛡️ **Type Safety**: End-to-end type safety with TypeScript and Zod.
- 🌈 **Modern UI**: Styled with Tailwind CSS for a clean, responsive interface.

## Technology Stack

- **Next.js**: React framework for server-side rendering and routing
- **React**: Component-based UI
- **TypeScript**: Type safety across the stack
- **Tailwind CSS**: Utility-first CSS framework
- **Prisma**: Type-safe ORM for database access
- **NextAuth.js**: Authentication and session management
- **Liveblocks**: Real-time collaboration and presence
- **shadcn UI**: Accessible UI primitives
- **Zod**: Schema validation

## Project Structure

- `src/components/` – UI and canvas components
- `src/app/` – Next.js app directory (routing, pages, API)
- `src/hooks/` – Custom React hooks
- `src/lib/` – Utility functions
- `src/server/` – Server-side logic (DB, auth)
- `prisma/` – Prisma schema and migrations
- `styles/` – Global styles

## Contributing & Roadmap

- For setup instructions, see [docs/getting-started.md](./docs/getting-started.md).
- For contribution guidelines, see [docs/contributing.md](./docs/contributing.md).

## Planned Features

- Color picker for all layer types
- Export/import board as image or file
- More drawing tools and integrations

See the [issues page](../../issues) for the full roadmap and to track progress. If you have an idea for a new feature, feel free to [create an issue](../../issues/new) to suggest it!

---

For more details or to contribute, please visit the repository or contact the maintainer.
