"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const adminAuth = localStorage.getItem("isAdminLoggedIn");
        if (adminAuth === "true") {
            setIsLoggedIn(true);
        }
        setIsChecking(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            localStorage.setItem("isAdminLoggedIn", "true");
            setIsLoggedIn(true);
            setError("");
        } else {
            setError("Username atau password salah!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isAdminLoggedIn");
        setIsLoggedIn(false);
    };

    const navItems = [
        { name: "Dashboard", href: "/admin" },
        { name: "Kelola Menu", href: "/admin/menu" },
        { name: "Kelola Pegawai", href: "/admin/pegawai" },
        { name: "Kelola Tentang Kami", href: "/admin/tentang-kami" },
        { name: "Kelola Pengaturan Web", href: "/admin/pengaturan-web" },
        { name: "Kelola Redeem Voucher", href: "/admin/redeem" },
        { name: "Kelola Kontak & Pesan", href: "/admin/kontak" },
    ];

    if (isChecking) {
        return (
            <>
                <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center text-gray-500 dark:text-gray-400">Memuat...</div>
                <div className="hidden">{children}</div>
            </>
        );
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex items-center justify-center p-4 font-sans text-gray-900 dark:text-white">
                <div className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100 dark:border-neutral-800">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-amber-700 dark:text-amber-500">Admin Login</h1>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Sasa Kopi Dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-sm font-semibold rounded-xl text-center border border-red-100 dark:border-red-900">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Username</label>
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white" 
                                placeholder="Masukkan username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-white" 
                                placeholder="Masukkan password"
                            />
                        </div>
                        <button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md">
                            Masuk
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                            ← Kembali ke Web Utama
                        </Link>
                    </div>
                </div>
                <div className="hidden">{children}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 flex flex-col md:flex-row font-sans text-gray-900 dark:text-white">
            
            <aside className="w-full md:w-64 bg-white dark:bg-neutral-900 border-r border-gray-200 dark:border-neutral-800 shrink-0 hidden md:block">
                <div className="p-6 border-b border-gray-100 dark:border-neutral-800 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-black text-amber-700 dark:text-amber-500">Admin Panel</h1>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Sasa Kopi Dashboard</p>
                    </div>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-500" : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-neutral-800 dark:hover:text-white"}`}>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 mt-auto border-t border-gray-100 dark:border-neutral-800 flex flex-col gap-2">
                    <Link href="/" className="block w-full text-center py-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
                        ← Kembali ke Web Utama
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-center py-2 text-sm font-semibold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-colors">
                        Keluar (Logout)
                    </button>
                </div>
            </aside>

            
            <header className="md:hidden bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 p-4 flex justify-between items-center">
                <h1 className="text-lg font-black text-amber-700 dark:text-amber-500">Admin Panel</h1>
                <div className="flex gap-3 items-center">
                    <Link href="/" className="text-xs text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">Web Utama</Link>
                    <button onClick={handleLogout} className="text-xs font-semibold text-red-600 dark:text-red-500">Logout</button>
                </div>
            </header>

            
            <div className="md:hidden bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 overflow-x-auto">
                <div className="flex p-2 space-x-2 w-max">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${isActive ? "bg-amber-600 text-white" : "bg-gray-100 dark:bg-neutral-800 text-gray-600 dark:text-gray-300"}`}>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50 dark:bg-neutral-950">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
