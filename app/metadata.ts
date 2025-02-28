import { Metadata } from "next";

// Default metadata for the entire application
export const defaultMetadata: Metadata = {
  title: {
    default: "PdfTool - PDF Summarizer",
    template: "%s | PdfTool",
  },
  description:
    "Instantly generate summaries of your PDF documents using AI technology",
  keywords: [
    "PDF",
    "summarize",
    "document analysis",
    "text extraction",
    "AI summarizer",
    "pdf summary",
    "document summary",
    "pdf tool",
    "pdf reader",
  ],
  authors: [{ name: "PdfTool Team" }],
  creator: "PdfTool",
  publisher: "PdfTool",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  themeColor: "#18181b",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pdftool.example.com/",
    siteName: "PdfTool",
    title: "PdfTool - PDF Summarizer",
    description:
      "Instantly generate summaries of your PDF documents using AI technology",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PdfTool - PDF Summarizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PdfTool - PDF Summarizer",
    description:
      "Instantly generate summaries of your PDF documents using AI technology",
    images: ["/twitter-image.png"],
    creator: "@pdftool",
    site: "@pdftool",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
      },
    ],
  },
  manifest: "/site.webmanifest",
  category: "productivity",
};

// Generate page-specific metadata
export function generateMetadata(
  title: string,
  description?: string,
  additionalKeywords: string[] = [],
): Metadata {
  return {
    title,
    description: description || defaultMetadata.description,
    keywords: [
      ...(defaultMetadata.keywords as string[]),
      ...additionalKeywords,
    ],
    openGraph: {
      ...defaultMetadata.openGraph,
      title,
      description: description || (defaultMetadata.description as string),
    },
    twitter: {
      ...defaultMetadata.twitter,
      title,
      description: description || (defaultMetadata.description as string),
    },
  };
}
