import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { DataProvider } from "@/contexts/data-context";
import { ReactNode } from "react"; // Add this import

const inter = Inter({ subsets: ["latin"] });

// Add proper type for the children prop
interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <DataProvider>
            {children}
          </DataProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}