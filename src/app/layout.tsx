import React from 'react';
import { Poppins } from "next/font/google";
import { Toaster } from 'sonner';

import Navbar from '../components/navbar'; 
import "./globals.css";
import Footer from '../components/footer';
import { CartProvider } from '@/components/CartContext';
import { ClerkProvider } from '@clerk/nextjs';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800","900"], 
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
   <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <CartProvider>
          <Toaster />
          <Navbar />
          {children}
          <div className="w-full">
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
    </ClerkProvider>
  );
}






