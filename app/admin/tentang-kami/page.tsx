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

    if (!isLoaded) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAboutUs(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Kelola Tentang Kami</h1>
                <p className="text-gray-500 text-sm mt-1">Ubah konten halaman Tentang Kami Sasa Kopi.</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-2xl space-y-5">
                {isSaved && (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-sm font-bold">
                        ✅ Perubahan berhasil disimpan!
                    </div>
                )}
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Judul Halaman</label>
                    <input 
                        required 
                        type="text" 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Konten Deskripsi Cerita</label>
                    <textarea 
                        required 
                        rows={8} 
                        value={formData.content} 
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
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
