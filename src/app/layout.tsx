"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/redux/reduxProvider";
import QueryProviders from "@/server/provider";
import { AppNavbar } from "@/components/AppNavbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  const isLandingPage = path === "/";

  return (
    <html lang="en">
      <body className={`${inter.className} bg-black h-screen`}>
        <ReduxProvider>
          <QueryProviders>
            <div className="flex flex-col">
              {!isLandingPage && <AppNavbar />}
              {children}
            </div>
          </QueryProviders>
        </ReduxProvider>
      </body>
    </html>
  );
}
