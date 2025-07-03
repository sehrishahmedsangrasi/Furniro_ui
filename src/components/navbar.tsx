"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";


const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="flex items-center justify-between lg:px-8 py-4 px-2 text-white relative bg-white z-50">
      {/* Left Section: Logo */}
      <div className="flex items-center w-17 h-6 mr-3">
        <img src="logo.png" alt="Logo" className="w-full h-full pr-2" />
        <span className="lg:text-[1.5rem] font-semibold text-black text-[1.3rem]">Furniro</span>
      </div>

      {/* Middle Section: Navigation Links (Hidden on Mobile) */}
      <div className=" lg:space-x-14 space-x-5 text-black text-[0.9rem] font-semibold">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <Link href="/shop" className="hover:text-gray-700">Shop</Link>
        <Link href="/about" className="hover:text-gray-700">About</Link>
      </div>

      {/* Right Section: Icons (Hidden on Mobile) */}
      <div className="hidden md:flex items-center space-x-6">
        <Image src="/accAlert.png" alt="Alert" width={26} height={26} />
        <Image src="/heart.png" alt="Wishlist" width={26} height={26} />
        <Image src="/search.png" alt="Search" width={26} height={26} />
         <Link href="/cart">
            <Image src="/shoppingcart.png" alt="Cart" width={24} height={24} className="cursor-pointer" />
          </Link>

        <div>
          <SignedOut>
            <div className="text-white bg-black border border-black rounded-md py-1 px-4 cursor-pointer hover:bg-white hover:text-black transition duration-200">
              <SignInButton />
            </div>
          </SignedOut>

          <SignedIn>
            <UserButton showName />
          </SignedIn>
        </div>

      </div>
      

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="text-black"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/*  Mobile Dropdown Menu (FIXED) */}
     <div
        className={`fixed top-[4.1rem] right-0 w-[14rem] sm:w-64 bg-white shadow-lg p-6 flex flex-col items-center justify-center transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } z-50`}
        style={{ visibility: menuOpen ? "visible" : "hidden" }}
      >
        {/* Icons (Stacked Vertically) */}
        <div className="flex flex-col items-center space-y-4 ">
          <Image src="/accAlert.png" alt="Alert" width={24} height={24} />
          <Image src="/heart.png" alt="Wishlist" width={24} height={24} />
          <Image src="/search.png" alt="Search" width={24} height={24} />
          <Link href="/cart">
            <Image src="/shoppingcart.png" alt="Cart" width={24} height={24} className="cursor-pointer" />
          </Link>
            <div>
              <SignedOut>
                <div className="text-white bg-black border border-black rounded-md py-1 px-4 cursor-pointer hover:bg-white hover:text-black transition duration-200">
                  <SignInButton />
                </div>
              </SignedOut>

              <SignedIn>
                <UserButton showName />
              </SignedIn>
            </div>
        </div>
       
      </div>
    </nav>
  );
};

export default Navbar;
