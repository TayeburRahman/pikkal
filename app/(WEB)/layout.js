import { Inter } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer/Footer'
import Navbar from '@/components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Podfolio',
  description: 'Podfolio is a podcast portfolio platform for podcasters to showcase their work and connect with potential clients.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={`${inter.className}`}>
        <Toaster />
        <Navbar />

        <div className='max-w-7xl mx-auto'>
          {children}
        </div>

        <Footer />
      </body>
    </html>

  )
}
