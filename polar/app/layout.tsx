import { GeistSans } from "geist/font/sans";
import "./globals.css";
import ClientWalletProvider from "@/components/solana/contexts/ClientWalletProvider";
import UserContext from "@/components/context-provider";
import ContextProvider from "@/components/context-provider";


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
            <ContextProvider>

              {children}
            </ContextProvider>
          </ClientWalletProvider>


        </main>
      </body>
    </html >
  );
}
