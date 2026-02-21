"use client"
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, getCartCount } = useAppContext();
  const { isSignedIn } = useUser();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
        {/* Hamburger - mobile only */}
        <button onClick={() => setSidebarOpen(true)} className="md:hidden">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Image
          className="cursor-pointer w-28 md:w-32"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop nav links */}
        <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
          <Link href="/" className="hover:text-gray-900 transition">
            Home
          </Link>
          <Link href="/all-products" className="hover:text-gray-900 transition">
            Shop
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            About Us
          </Link>
          <Link href="/" className="hover:text-gray-900 transition">
            Contact
          </Link>

          {isSeller && <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">Seller Dashboard</button>}

        </div>

        {/* Desktop right icons */}
        <ul className="hidden md:flex items-center gap-4 ">
          <Image className="w-4 h-4" src={assets.search_icon} alt="search icon" />
          <button onClick={() => router.push('/cart')} className="relative cursor-pointer">
            <Image src={assets.cart_icon} alt="cart icon" className="w-6 opacity-80" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </button>
          {isSignedIn ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link label="My Orders" labelIcon={<span>📦</span>} href="/my-orders" />
                <UserButton.Link label="Wishlist" labelIcon={<span>❤️</span>} href="/wishlist" />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image src={assets.user_icon} alt="user icon" />
                Account
              </button>
            </SignInButton>
          )}
        </ul>

        {/* Mobile right icons */}
        <div className="flex items-center md:hidden gap-3">
          <button onClick={() => router.push('/cart')} className="relative cursor-pointer">
            <Image src={assets.cart_icon} alt="cart icon" className="w-6 opacity-80" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-3 text-xs bg-orange-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
                {getCartCount()}
              </span>
            )}
          </button>
          {isSignedIn ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link label="My Orders" labelIcon={<span>📦</span>} href="/my-orders" />
                <UserButton.Link label="Wishlist" labelIcon={<span>❤️</span>} href="/wishlist" />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image src={assets.user_icon} alt="user icon" />
                Account
              </button>
            </SignInButton>
          )}
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out md:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <Image
            className="w-24 cursor-pointer"
            onClick={() => { router.push('/'); setSidebarOpen(false); }}
            src={assets.logo}
            alt="logo"
          />
          <button onClick={() => setSidebarOpen(false)}>
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col px-5 py-4 gap-1">
          <Link href="/" onClick={() => setSidebarOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium">
            Home
          </Link>
          <Link href="/all-products" onClick={() => setSidebarOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium">
            Shop
          </Link>
          <Link href="/" onClick={() => setSidebarOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium">
            About Us
          </Link>
          <Link href="/" onClick={() => setSidebarOpen(false)} className="py-3 px-2 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium">
            Contact
          </Link>

          {isSeller && (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              <button onClick={() => { router.push('/seller'); setSidebarOpen(false); }} className="py-3 px-2 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium text-left">
                Seller Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;