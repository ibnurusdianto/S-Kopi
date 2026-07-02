"use client";
import { useState } from "react";
import { useData, Pegawai } from "../../context/DataContext";

export default function AdminPegawaiPage() {
    const { pegawais, addPegawai, updatePegawai, deletePegawai, isLoaded } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentPegawai, setCurrentPegawai] = useState<Partial<Pegawai>>({});

    if (!isLoaded) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

    const handleEdit = (pegawai: Pegawai) => {
        setCurrentPegawai(pegawai);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentPegawai({ name: "", username: "", password: "", status: "Aktif" });
        setIsEditing(true);
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
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-xl">
                <h2 className="text-xl font-bold mb-6">{currentPegawai.id ? "Edit Pegawai" : "Tambah Pegawai Baru"}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nama Pegawai</label>
                        <input required type="text" value={currentPegawai.name || ""} onChange={e => setCurrentPegawai({...currentPegawai, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Username</label>
                        <input required type="text" value={currentPegawai.username || ""} onChange={e => setCurrentPegawai({...currentPegawai, username: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Password</label>
                        <input type="text" value={currentPegawai.password || ""} onChange={e => setCurrentPegawai({...currentPegawai, password: e.target.value})} className="w-full border rounded-lg px-3 py-2" placeholder="Kosongkan jika tidak diubah" />
                        {!currentPegawai.id && <p className="text-xs text-gray-500 mt-1">Harus diisi untuk pegawai baru.</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Status</label>
                        <select value={currentPegawai.status || "Aktif"} onChange={e => setCurrentPegawai({...currentPegawai, status: e.target.value as "Aktif" | "Nonaktif"})} className="w-full border rounded-lg px-3 py-2">
                            <option value="Aktif">Aktif</option>
                            <option value="Nonaktif">Nonaktif</option>
                        </select>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold" disabled={!currentPegawai.id && !currentPegawai.password}>Simpan</button>
                        <button type="button" onClick={() => setIsEditing(false)} className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-bold">Batal</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-gray-900">Kelola Pegawai</h1>
                    <p className="text-gray-500 text-sm mt-1">Kelola akun pegawai Sasa Kopi.</p>
                </div>
                <button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm">
                    + Tambah Pegawai
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left text-sm whitespace-nowrap">
                    <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Nama Pegawai</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {pegawais.map(p => (
                            <tr key={p.id} className="hover:bg-gray-50/50">
                                <td className="px-6 py-4 font-bold text-gray-900">{p.name}</td>
                                <td className="px-6 py-4 text-gray-600">@{p.username}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${p.status === "Aktif" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-3">
                                    <button onClick={() => handleEdit(p)} className="text-amber-600 hover:text-amber-800 font-bold">Edit</button>
                                    <button onClick={() => { if(confirm("Hapus pegawai ini?")) deletePegawai(p.id) }} className="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                                </td>
                            </tr>
                        ))}
                        {pegawais.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Tidak ada data pegawai.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
