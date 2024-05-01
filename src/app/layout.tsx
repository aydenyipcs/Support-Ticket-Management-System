import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navigation from "./components/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zealthy Exercise",
  description: "Ticket Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col max-w-5xl h-screen mx-auto">
        <Navigation />
        {children}
        </div>
        </body>
    </html>
  );
}
