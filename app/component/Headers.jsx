"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";

function Headers() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { webSettings } = useData();
    const { cart } = useCart();
    const cartCount = cart.reduce((acc, curr) => acc + curr.qty, 0);
    const { theme, mounted, toggleTheme } = useTheme();

    
    const navLinks = [
        { name: "Tentang Kami", href: "/tentang_kami" },
        { name: "Menu", href: "/menu" },
        { name: "Redeem Voucher", href: "/redeem" },
        { name: "Kontak", href: "/kontak" },
    ];

    return (
        <header className="bg-background text-foreground shadow-sm sticky top-0 z-50 border-b border-gray-200 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold font-sans tracking-tight flex items-center gap-3">
                            <Image
                                src="/logo/logo.png"
                                alt="Logo Sasa Kopi"
                                width={40}
                                height={40}
                                className="cursor-pointer object-contain"
                                style={{ width: 'auto', height: 'auto' }}
                            />
                            <span>{webSettings?.headerLogoText || "Sasa Kopi"}</span>
                        </Link>
                    </div>

                    
                    <nav className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium hover:opacity-70 transition-opacity duration-200"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>

                    
                    <div className="flex items-center gap-2 sm:gap-4">
                        
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
                            aria-label="Toggle Dark Mode"
                            title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
                            suppressHydrationWarning
                        >
                            {!mounted ? (
                                <svg className="w-6 h-6 opacity-0" viewBox="0 0 24 24" />
                            ) : theme === 'dark' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                                </svg>
                            )}
                        </button>

                        
                        <Link href="/keranjang" className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none" aria-label="Keranjang Belanja">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>

                            
                            {cartCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-amber-600 transform translate-x-1/4 -translate-y-1/4 rounded-full">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        
                        <div className="flex md:hidden items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
                                aria-expanded={isMobileMenuOpen}
                            >
                                <span className="sr-only">Buka menu utama</span>
                                {!isMobileMenuOpen ? (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                ) : (
                                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>

            
            {isMobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-background shadow-lg">
                    <nav className="px-4 pt-2 pb-4 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
}

export default Headers;