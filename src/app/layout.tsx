import type { Metadata } from "next";
import "./globals.css";
import AppBackground from "@/components/AppBackground";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "SAGA — Intelligent Automation Solutions for Your Business",
  description:
    "SAGA provides cutting-edge AI automation solutions to streamline workflows, boost productivity, and transform your business with intelligent machine learning capabilities.",
  keywords: [
    "AI",
    "SAGA",
    "automation",
    "machine learning",
    "artificial intelligence",
    "SaaS",
  ],
  openGraph: {
    title: "SAGA — Intelligent Automation Solutions",
    description:
      "Transform your business with AI-powered automation solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Michroma&family=Gugi&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/logo.png" />
      </head>
      <body style={{ cursor: "none", overflowX: "hidden" }}>
        <SmoothScroll>
          <AppBackground />
          <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
        </SmoothScroll>
      </body>
    </html>
  );
}
