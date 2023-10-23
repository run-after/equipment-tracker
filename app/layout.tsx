import { FirebaseProvider } from "@/app/contexts/firebase";
import { ReactElement } from "react";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Equipment tracker",
  description: "Track your equipment",
};

export default function RootLayout({ children }: { children: ReactElement }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className={inter.className}>
        <header className="h-24 border-b border-white p-4 flex jusfify-between">
          <a href="/" className="bg-red-500 w-12 h-12 mr-12 shrink-0"></a>
          <ul className="flex text-lg w-full justify-end">
            <li className="p-2">
              <a href="/sites" className="hover:underline">
                Sites
              </a>
            </li>
            <li className="p-2">
              <a href="/equipment" className="hover:underline">
                Equipment
              </a>
            </li>
            <li className="p-2">
              <a href="/parts" className="hover:underline">
                Parts
              </a>
            </li>
            <li className="p-2">
              <a href="/users" className="hover:underline">
                Users
              </a>
            </li>
          </ul>
        </header>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
