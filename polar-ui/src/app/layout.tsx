import Navbar from '@/components/navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'polar',
  description: 'polar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        
        
          <div className="w-screen h-screen bg-primaryBackgroundDark">
            <Navbar ></Navbar>
          
            {children}
          </div>
        
        
        </body>
    </html>
  )
}
