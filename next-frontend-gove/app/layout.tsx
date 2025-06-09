import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import QueryProvider from "./_services/QueryProvider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gove Challenge",
  description: "A NextJS & Laravel integration test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster position="bottom-center" />
        <QueryProvider>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <div className="bg-gray-200 flex flex-col items-center justify-center min-h-screen min-w-full">
              {children}
            </div>
          </AppRouterCacheProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
