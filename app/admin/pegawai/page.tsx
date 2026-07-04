"use client";
import { useState } from "react";
import { useData, Pegawai } from "../../context/DataContext";

export default function AdminPegawaiPage() {
    const { pegawais, addPegawai, updatePegawai, deletePegawai, isLoaded } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPegawai, setCurrentPegawai] = useState<Partial<Pegawai>>({});
    const [showPassword, setShowPassword] = useState(false);

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const handleEdit = (pegawai: Pegawai) => {
        setCurrentPegawai(pegawai);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentPegawai({ name: "", username: "", password: "", status: "Aktif" });
        setIsEditing(true);
        setShowPassword(false);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentPegawai.id) {
            updatePegawai(currentPegawai.id, currentPegawai);
        } else {
            addPegawai({ ...currentPegawai, id: `P-${Date.now()}` } as Pegawai);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 max-w-xl text-gray-900 dark:text-white">
                <h2 className="text-xl font-bold mb-6">{currentPegawai.id ? "Edit Pegawai" : "Tambah Pegawai Baru"}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nama Pegawai</label>
                        <input required type="text" value={currentPegawai.name || ""} onChange={e => setCurrentPegawai({...currentPegawai, name: e.target.value})} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Username</label>
                        <input required type="text" value={currentPegawai.username || ""} onChange={e => setCurrentPegawai({...currentPegawai, username: e.target.value})} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <div className="relative">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                value={currentPegawai.password || ""} 
                                onChange={e => setCurrentPegawai({...currentPegawai, password: e.target.value})} 
                                className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 pr-10 focus:outline-none focus:border-amber-500" 
                                placeholder="Kosongkan jika tidak diubah" 
                            />
                            <button 
                                type="button" 
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                                )}
                            </button>
                        </div>
                        {!currentPegawai.id && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Harus diisi untuk pegawai baru.</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Status</label>
                        <select value={currentPegawai.status || "Aktif"} onChange={e => setCurrentPegawai({...currentPegawai, status: e.target.value as "Aktif" | "Nonaktif"})} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 dark:bg-neutral-900">
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold transition-colors" disabled={!currentPegawai.id && !currentPegawai.password}>Simpan</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg font-bold transition-colors">Batal</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kelola Pegawai</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Kelola akun pegawai Sasa Kopi.</p>
                </div>
                <button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
                    + Tambah Pegawai
                </button>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-neutral-800">
                        <tr>
                            <th className="px-6 py-4">Nama Pegawai</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                        {pegawais.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                <td className="px-6 py-4 font-bold text-gray-900 dark:text-white">{p.name}</td>
                                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">@{p.username}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === "Aktif" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button onClick={() => handleEdit(p)} className="text-amber-600 hover:text-amber-800 dark:hover:text-amber-400 font-bold">Edit</button>
                                    <button onClick={() => { if(confirm("Hapus pegawai ini?")) deletePegawai(p.id) }} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold">Hapus</button>
                                </td>
                            </tr>
                        ))}
                        {pegawais.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">Tidak ada data pegawai.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
