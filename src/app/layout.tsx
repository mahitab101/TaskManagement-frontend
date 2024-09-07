import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import QueryProvider from "./QueryProvider";
import Header from "@/components/Header";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template:'%s | Task management app',
    default:"Task management app"
  },
  description: "Generated by create next app",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <QueryProvider>
        <main className="container">
        <Header/>
        {children}
        </main>
        </QueryProvider>
        </body>
    </html>
  );
}
