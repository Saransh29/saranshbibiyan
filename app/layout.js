"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import { AnalyticsWrapper } from "@/components/Analytics";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showHeader = pathname === "/url" ? false : true;

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeProvider enableSystem={true} attribute="class">
          {showHeader && <Navbar />} {children}
        </ThemeProvider>
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
