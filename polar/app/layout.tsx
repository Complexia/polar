import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ClientWalletProvider from "@/components/solana/contexts/ClientWalletProvider";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="synthwave" className={GeistSans.className}>
      <body className=" ">
        <main className="w-screen h-screen">
          
                <ClientWalletProvider>

                  {children}
                </ClientWalletProvider>
              
        </main>
      </body>
    </html>
  );
}