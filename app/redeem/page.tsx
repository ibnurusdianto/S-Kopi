"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function RedeemPage() {
    
    const [voucherCode, setVoucherCode] = useState("");
    
    
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");
    const { applyVoucher } = useCart();

    
    const handleRedeem = (e: React.FormEvent) => {
        e.preventDefault(); 
        
        if (!voucherCode.trim()) {
            setStatus("error");
            setMessage("Mohon masukkan kode voucher terlebih dahulu.");
            return;
        }

        
        setStatus("loading");
        setMessage("Sedang memeriksa kode voucher...");

        
        setTimeout(() => {
            const code = voucherCode.trim().toUpperCase();
            const isValid = applyVoucher(code);
            
            if (isValid) {
                setStatus("success");
                setMessage(`Berhasil! Kode ${code} telah diterapkan. Cek keranjang Anda.`);
                setVoucherCode(""); 
            } else {
                setStatus("error");
                setMessage("Maaf, kode voucher tidak valid atau sudah kadaluarsa.");
            }
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden flex flex-col justify-center pt-16">
            
            
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="absolute top-[10%] left-[10%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[#7c2d12]/10 dark:bg-[#7c2d12]/20 blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-[20%] right-[10%] w-[200px] sm:w-[350px] h-[200px] sm:h-[350px] rounded-full bg-[#f59e0b]/10 dark:bg-[#f59e0b]/15 blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            </div>

            <main className="relative z-10 w-full max-w-md mx-auto px-4 sm:px-6 mb-20">
                
                
                <Link href="/menu" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-amber-600 dark:hover:text-amber-500 mb-6 transition-colors">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Kembali ke Menu
                </Link>

                
                <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-amber-900/5 dark:shadow-black/50 border border-gray-100 dark:border-neutral-800 p-6 sm:p-8">
                    
                    
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-amber-50 dark:bg-amber-900/20 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight text-foreground mb-2">
                            Redeem <span className="text-amber-600">Voucher</span>
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Masukkan kode unik yang Anda miliki untuk mendapatkan diskon spesial atau minuman gratis!
                        </p>
                    </div>

                    
                    <form onSubmit={handleRedeem} className="space-y-4">
                        <div>
                            <label htmlFor="voucher" className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                                Kode Voucher
                            </label>
                            <input 
                                type="text" 
                                id="voucher"
                                value={voucherCode}
                                onChange={(e) => setVoucherCode(e.target.value)}
                                placeholder="Cth: SASA50"
                                className="w-full bg-gray-50 dark:bg-neutral-800 text-foreground border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 sm:py-3.5 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all uppercase placeholder:normal-case font-medium tracking-wide"
                                disabled={status === "loading"}
                            />
                        </div>

                        
                        {status !== "idle" && (
                            <div className={`p-4 rounded-xl text-sm font-medium border ${
                                status === "success" 
                                    ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800" 
                                    : status === "error"
                                        ? "bg-red-50 text-red-600 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
                                        : "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800"
                            }`}>
                                
                                {status === "loading" && (
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                )}
                                {message}
                            </div>
                        )}

                        <button 
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 dark:disabled:bg-amber-800 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-amber-600/30 active:scale-[0.98] mt-2"
                        >
                            {status === "loading" ? "Memproses..." : "Terapkan Voucher"}
                        </button>
                    </form>

                </div>
            </main>
        </div>
    );
}