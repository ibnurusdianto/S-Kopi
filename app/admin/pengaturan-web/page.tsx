"use client";
import { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";

export default function AdminPengaturanWebPage() {
    const { webSettings, setWebSettings, isLoaded } = useData();
    const [formData, setFormData] = useState({
        headerLogoText: "",
        footerText: "",
        address: "",
        phone: "",
        email: "",
        socialLinks: { instagram: "", facebook: "" }
    });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (webSettings) setFormData(webSettings);
    }, [webSettings]);

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setWebSettings(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kelola Pengaturan Web</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ubah teks header, footer, dan informasi umum Sasa Kopi.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 max-w-2xl space-y-6">
                {isSaved && (
                    <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl border border-green-200 dark:border-green-900/50 text-sm font-bold">
                        ✅ Pengaturan berhasil disimpan!
                    </div>
                )}
                
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-neutral-800 pb-2">Identitas Utama</h3>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Teks Logo Header</label>
                        <input 
                            required 
                            type="text" 
                            value={formData.headerLogoText} 
                            onChange={(e) => setFormData({...formData, headerLogoText: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Teks Footer (Copyright)</label>
                        <input 
                            required 
                            type="text" 
                            value={formData.footerText} 
                            onChange={(e) => setFormData({...formData, footerText: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                        />
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-neutral-800 pb-2">Informasi Kontak Bisnis</h3>
                    <div>
                        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Alamat Kedai</label>
                        <input 
                            required 
                            type="text" 
                            value={formData.address} 
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Telepon/WhatsApp</label>
                            <input 
                                required 
                                type="text" 
                                value={formData.phone} 
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Email</label>
                            <input 
                                required 
                                type="email" 
                                value={formData.email} 
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-neutral-800 pb-2">Media Sosial</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Username Instagram</label>
                            <input 
                                type="text" 
                                value={formData.socialLinks.instagram} 
                                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, instagram: e.target.value}})}
                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nama Halaman Facebook</label>
                            <input 
                                type="text" 
                                value={formData.socialLinks.facebook} 
                                onChange={(e) => setFormData({...formData, socialLinks: {...formData.socialLinks, facebook: e.target.value}})}
                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                        Simpan Pengaturan
                    </button>
                </div>
            </form>
        </div>
    );
}
