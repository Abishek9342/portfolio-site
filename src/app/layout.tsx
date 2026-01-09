import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abishek Sridharan | AI Engineer & ML Specialist",
  description: "AI Engineer specializing in production-grade AI systems, embeddings, knowledge graphs, and multi-modal AI. Building intelligent solutions that transform how businesses operate.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "LangChain",
    "Neo4j",
    "Knowledge Graphs",
    "Python",
    "FastAPI",
    "AWS",
    "RAG",
    "Embeddings",
    "AI SaaS"
  ],
  authors: [{ name: "Abishek Sridharan" }],
  creator: "Abishek Sridharan",
  openGraph: {
    title: "Abishek Sridharan | AI Engineer & ML Specialist",
    description: "Building production-grade AI systems and intelligent SaaS platforms",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abishek Sridharan | AI Engineer",
    description: "Building production-grade AI systems and intelligent SaaS platforms",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme) {
                    document.documentElement.setAttribute('data-theme', theme);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
