import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/header';
import { cn } from '@/lib/utils';

// Configure font with more conservative options
const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: false, // Disable preloading to reduce initial load
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false // Disable automatic font fallback adjustment
});

export const metadata: Metadata = {
  title: 'RecruiTech - Digitalisation du Processus de Recrutement',
  description: 'Plateforme de gestion du processus de recrutement',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}