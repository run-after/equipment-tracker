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
    <html lang="en">
      <body className={inter.className}>
        <FirebaseProvider>{children}</FirebaseProvider>
      </body>
    </html>
  );
}
