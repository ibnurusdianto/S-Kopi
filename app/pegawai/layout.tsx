"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";

export default function PegawaiLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const { pegawais } = useData();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isChecking, setIsChecking] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const pegawaiAuth = localStorage.getItem("isPegawaiLoggedIn");
        if (pegawaiAuth === "true") {
            setIsLoggedIn(true);
        }
        setIsChecking(false);
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        const validPegawai = pegawais.find(p => p.username === username && p.password === password && p.status === "Aktif");

        if (validPegawai) {
            localStorage.setItem("isPegawaiLoggedIn", "true");
            setIsLoggedIn(true);
            setError("");
        } else {
            setError("Username/password salah, atau akun nonaktif!");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("isPegawaiLoggedIn");
        setIsLoggedIn(false);
    };

    const navItems = [
        { name: "Live Orders", href: "/pegawai" },
        { name: "Kelola Stok Menu", href: "/pegawai/menu" },
    ];

    if (isChecking) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Memuat...</div>;
    }

    if (!isLoggedIn) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 font-sans">
                <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm border border-gray-100">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-black text-green-700">Pegawai Login</h1>
                        <p className="text-gray-500 text-sm mt-1">Sasa Kopi Dashboard</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-5">
                        {error && (
                            <div className="p-3 bg-red-50 text-red-600 text-sm font-semibold rounded-xl text-center border border-red-100">
                                {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Username</label>
                            <input 
                                type="text" 
                                required
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                                placeholder="Masukkan username"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500" 
                                placeholder="Masukkan password"
                            />
                        </div>
                        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md">
                            Masuk
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
                            ← Kembali ke Web Utama
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans text-gray-900">
            
            <aside className="w-full md:w-64 bg-white border-r border-gray-200 shrink-0 hidden md:block">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h1 className="text-xl font-black text-green-700">Pegawai Panel</h1>
                        <p className="text-xs text-gray-500 mt-1">Sasa Kopi Dashboard</p>
                    </div>
                </div>
                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"}`}>
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 mt-auto border-t border-gray-100 flex flex-col gap-2">
                    <Link href="/" className="block w-full text-center py-2 text-sm text-gray-500 hover:text-gray-900">
                        ← Kembali ke Web Utama
                    </Link>
                    <button onClick={handleLogout} className="block w-full text-center py-2 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors">
                        Keluar (Logout)
                    </button>
                </div>
            </aside>

            
            <header className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center">
                <h1 className="text-lg font-black text-green-700">Pegawai Panel</h1>
                <div className="flex gap-3 items-center">
                    <Link href="/" className="text-xs text-gray-500 hover:text-gray-900">Web Utama</Link>
                    <button onClick={handleLogout} className="text-xs font-semibold text-red-600">Logout</button>
                </div>
            </header>

            
            <div className="md:hidden bg-white border-b border-gray-200 overflow-x-auto">
                <div className="flex p-2 space-x-2 w-max">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.href} href={item.href} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${isActive ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600"}`}>
                                {item.name}
                            </Link>
                        );
                    })}
                </div>
            </div>

            
            <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50/50">
                <div className="max-w-5xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
