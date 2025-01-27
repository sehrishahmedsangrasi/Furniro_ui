import React from 'react';
import { Poppins, Geist_Mono } from "next/font/google";

import Navbar from '../components/navbar'; 
import "./globals.css";
import Footer from '../components/footer';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800","900"], 
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <Navbar />
        {children}
        <div className='w-full '>
          <Footer />
        </div>
      </body>
    </html>
  );
}






