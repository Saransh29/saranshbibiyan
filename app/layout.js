"use client";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ThemeProvider } from "next-themes";
import { AnalyticsWrapper } from "@/components/Analytics";
import { useRouter } from "next/navigation";

export default function RootLayout({ children }) {
  const router = useRouter();
  const showHeader = router.pathname === "/url" ? true : false;

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
