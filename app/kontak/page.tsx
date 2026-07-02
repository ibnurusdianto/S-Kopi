"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "../context/DataContext";

export default function KontakPage() {
    const { webSettings, addContactMessage } = useData();
    
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        
        if (!formData.name || !formData.email || !formData.message) return;

        setStatus("loading");

        
        addContactMessage({
            id: `MSG-${Date.now()}`,
            name: formData.name,
            email: formData.email,
            message: formData.message,
            createdAt: new Date().toISOString()
        });

        
        setTimeout(() => {
            setStatus("success");
            setFormData({ name: "", email: "", message: "" }); 
            
            
            setTimeout(() => setStatus("idle"), 3000);
        }, 1500);
    };

    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-hidden pb-20">
            
            
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
                <div className="absolute top-[5%] left-[-5%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] rounded-full bg-[#7c2d12]/10 dark:bg-[#7c2d12]/20 blur-[80px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '5s' }} />
                <div className="absolute bottom-[10%] right-[-5%] w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] rounded-full bg-[#f59e0b]/10 dark:bg-[#f59e0b]/15 blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />
            </div>

            
            <main className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
                
                
                <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight mb-4">
                        Hubungi <span className="text-amber-600">Sasa Kopi</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
                        Punya pertanyaan, kritik, saran, atau ingin melakukan reservasi tempat? 
                        Jangan ragu untuk menghubungi tim kami. Kami siap melayani Anda dengan sepenuh hati.
                    </p>
                </div>

                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
                    
                    
                    <div className="lg:col-span-2 space-y-6">
                        
                        
                        <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-3xl p-6 sm:p-8 shadow-xl shadow-amber-900/5 dark:shadow-black/50 border border-gray-100 dark:border-neutral-800">
                            <h3 className="text-xl font-bold mb-6 text-foreground">Informasi Kontak</h3>
                            
                            <div className="space-y-6">
                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-foreground">Lokasi Kafe</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-relaxed whitespace-pre-line">
                                            {webSettings?.address || `Jl. Raya Jakarta Timur No. 123,\nMakasar, Jakarta Timur 13560`}
                                        </p>
                                    </div>
                                </div>

                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.896-1.596-5.48-4.18-7.074-7.07l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-foreground">WhatsApp / Telepon</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{webSettings?.phone || "+62 812-3456-7890"}</p>
                                    </div>
                                </div>

                                
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-sm text-foreground">Email</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{webSettings?.email || "halo@sasakopi.com"}</p>
                                    </div>
                                </div>
                            </div>

                            
                            <hr className="my-6 border-gray-100 dark:border-neutral-800" />

                            
                            <h4 className="font-semibold text-sm text-foreground mb-3">Jam Operasional</h4>
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-1">
                                <span>Senin - Jumat</span>
                                <span className="font-medium text-foreground">08:00 - 22:00</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                <span>Sabtu - Minggu</span>
                                <span className="font-medium text-foreground">09:00 - 23:00</span>
                            </div>

                        </div>
                    </div>

                    
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-neutral-900 rounded-3xl shadow-xl shadow-amber-900/5 dark:shadow-black/50 border border-gray-100 dark:border-neutral-800 p-6 sm:p-10">
                            <h2 className="text-2xl font-bold mb-2 text-foreground">Kirim Pesan</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                                Isi formulir di bawah ini dan kami akan membalas pesan Anda secepatnya.
                            </p>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                
                                
                                <div>
                                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Nama Lengkap</label>
                                    <input 
                                        type="text" 
                                        id="name"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        placeholder="Tulis nama Anda"
                                        className="w-full bg-gray-50 dark:bg-neutral-800 text-foreground border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                        disabled={status === "loading"}
                                    />
                                </div>

                                
                                <div>
                                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Email Aktif</label>
                                    <input 
                                        type="email" 
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        placeholder="nama@email.com"
                                        className="w-full bg-gray-50 dark:bg-neutral-800 text-foreground border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                                        disabled={status === "loading"}
                                    />
                                </div>

                                
                                <div>
                                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5">Pesan Anda</label>
                                    <textarea 
                                        id="message"
                                        rows={4}
                                        required
                                        value={formData.message}
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                        placeholder="Tuliskan pertanyaan, masukan, atau kebutuhan reservasi Anda di sini..."
                                        className="w-full bg-gray-50 dark:bg-neutral-800 text-foreground border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                                        disabled={status === "loading"}
                                    ></textarea>
                                </div>

                                
                                {status === "success" && (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-700 dark:text-green-400 text-sm font-medium flex items-start gap-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0 mt-0.5">
                                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                                        </svg>
                                        Pesan Anda berhasil dikirim! Tim kami akan segera menghubungi Anda kembali.
                                    </div>
                                )}

                                
                                <button 
                                    type="submit"
                                    disabled={status === "loading" || status === "success"}
                                    className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 dark:disabled:bg-amber-800 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg shadow-amber-600/30 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
                                >
                                    {status === "loading" && (
                                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                    )}
                                    {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
                                </button>

                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}