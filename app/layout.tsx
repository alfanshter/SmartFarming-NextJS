import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { AuthProvider } from "@/shared/contexts/AuthContext";

const inter = Inter({
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Smart Farming - Modern Agriculture Solutions",
  description: "Manage your farm efficiently with our smart farming application.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
