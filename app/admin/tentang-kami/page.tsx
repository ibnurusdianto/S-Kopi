"use client";
import { useState, useEffect } from "react";
import { useData } from "../../context/DataContext";

export default function AdminTentangKamiPage() {
    const { aboutUs, setAboutUs, isLoaded } = useData();
    const [formData, setFormData] = useState({ title: "", content: "" });
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        if (aboutUs) setFormData(aboutUs);
    }, [aboutUs]);

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAboutUs(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kelola Tentang Kami</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ubah konten halaman Tentang Kami Sasa Kopi.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white dark:bg-neutral-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 max-w-2xl space-y-5">
                {isSaved && (
                    <div className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 p-4 rounded-xl border border-green-200 dark:border-green-900/50 text-sm font-bold">
                        ✅ Perubahan berhasil disimpan!
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Judul Halaman</label>
                    <input 
                        required 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Konten Deskripsi Cerita</label>
                    <textarea 
                        required 
                        rows={8} 
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-gray-900 dark:text-white" 
                    />
                </div>

                <div className="pt-2">
                    <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-xl font-bold transition-colors">
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
}
