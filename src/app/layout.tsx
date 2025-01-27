import React from 'react';
import { Poppins } from "next/font/google";

import Navbar from '../components/navbar'; 
import "./globals.css";
import Footer from '../components/footer';

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






