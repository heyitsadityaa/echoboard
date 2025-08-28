import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";

export const metadata: Metadata = {
  title: "Echoboard",
  description: "A modern, collaborative whiteboard application",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.className}`}>
      <body suppressHydrationWarning
        suppressContentEditableWarning
        className="overscroll-none dark"
      >
        {children}
      </body>
    </html>
  );
}
