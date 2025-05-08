import { Navbar } from "components/layout/navbar";
import { GeistSans } from "geist/font/sans";
import { ReactNode } from "react";
import "./globals.css";
import {
  baseUrl,
  GOOGLE_SITE_VERIFICATION,
  ICON_IMAGE_URL,
  SITE_NAME,
} from "lib/utils";
import { ReduxProvider } from "./providers";
import "../styles/theme.scss";
import { Toaster } from "sonner";
import AccessibilityBar from "../components/accessibility-bar";
import { Analytics } from "@vercel/analytics/react";
import { ThemeClientProvider } from "../components/theme-provider";
import IntlClientProvider from "../components/IntlClientProvider";
import Footer from "../components/layout/Footer";
import { Box } from "@mui/material";
import {
  metadata_site_description,
  metadata_site_title,
} from "../lib/i18n/seo_heb";
import type { Viewport } from "next";

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  description: metadata_site_description,
  robots: {
    follow: true,
    index: true,
  },
  openGraph: {
    title: SITE_NAME!,
    description: metadata_site_description,
    url: baseUrl,
    siteName: SITE_NAME!,
    images: [
      {
        url: ICON_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: metadata_site_title,
      },
    ],
    locale: "he_IL",
    type: "website",
  },
  verification: {
    google: GOOGLE_SITE_VERIFICATION,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="he" dir="rtl" className={GeistSans.variable}>
      <body>
        <ReduxProvider>
          <IntlClientProvider>
            <ThemeClientProvider>
              <div
                id="font-scale-wrapper"
                className="bg-theme text-theme selection:bg-teal-300 dark:bg-theme-dark dark:text-theme dark:selection:bg-pink-500 dark:selection:text-white"
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                    bgcolor: "var(--color-bg)",
                  }}
                >
                  <Navbar />
                  <Box component="main" sx={{ flexGrow: 1 }}>
                    {children}
                  </Box>
                  <Footer />
                </Box>
                <Analytics />
                <Toaster richColors position="bottom-center" />
                <AccessibilityBar />
              </div>
            </ThemeClientProvider>
          </IntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
