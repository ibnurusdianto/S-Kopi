"use client";
import { useState } from "react";
import { useData, Voucher } from "../../context/DataContext";

export default function AdminRedeemPage() {
    const { vouchers, addVoucher, updateVoucher, deleteVoucher, isLoaded } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentVoucher, setCurrentVoucher] = useState<Partial<Voucher>>({});

    if (!isLoaded) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

    const handleEdit = (v: Voucher) => {
        setCurrentVoucher(v);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentVoucher({ code: "", type: "percent", value: 0, isActive: true });
        setIsEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentVoucher.id) {
            updateVoucher(currentVoucher.id, currentVoucher);
        } else {
            addVoucher({ ...currentVoucher, id: "v" + Date.now() } as Voucher);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-xl">
                <h2 className="text-xl font-bold mb-6">{currentVoucher.id ? "Edit Voucher" : "Buat Voucher Baru"}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Kode Voucher</label>
                        <input required type="text" value={currentVoucher.code || ""} onChange={e => setCurrentVoucher({...currentVoucher, code: e.target.value.toUpperCase()})} placeholder="Misal: DISKON50" className="w-full border rounded-lg px-3 py-2 uppercase" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Tipe Diskon</label>
                        <select value={currentVoucher.type || "percent"} onChange={e => setCurrentVoucher({...currentVoucher, type: e.target.value as "percent" | "fixed"})} className="w-full border rounded-lg px-3 py-2">
                            <option value="percent">Persentase (%)</option>
                            <option value="fixed">Nominal Rupiah (Rp)</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nilai Diskon</label>
                        <input required type="number" value={currentVoucher.value || 0} onChange={e => setCurrentVoucher({...currentVoucher, value: Number(e.target.value)})} placeholder={currentVoucher.type === "percent" ? "Misal: 50" : "Misal: 10000"} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={currentVoucher.isActive !== false} onChange={e => setCurrentVoucher({...currentVoucher, isActive: e.target.checked})} className="w-4 h-4" />
                            <span className="text-sm font-semibold">Aktif (Bisa digunakan)</span>
                        </label>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="bg-amber-600 text-white px-6 py-2 rounded-lg font-bold">Simpan</button>
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
                    <h1 className="text-2xl font-black text-gray-900">Kelola Redeem Voucher</h1>
                    <p className="text-gray-500 text-sm mt-1">Buat dan atur kode promo untuk pelanggan.</p>
                </div>
                <button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm">
                    + Buat Voucher
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Kode Voucher</th>
                                <th className="px-6 py-4">Tipe Diskon</th>
                                <th className="px-6 py-4">Nilai Potongan</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {vouchers.map(v => (
                                <tr key={v.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4 font-black text-amber-700 tracking-wider">{v.code}</td>
                                    <td className="px-6 py-4 text-gray-600">{v.type === "percent" ? "Persentase" : "Nominal Rupiah"}</td>
                                    <td className="px-6 py-4 font-semibold">
                                        {v.type === "percent" ? `${v.value}%` : `Rp ${v.value.toLocaleString("id-ID")}`}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${v.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            {v.isActive ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button onClick={() => handleEdit(v)} className="text-amber-600 hover:text-amber-800 font-bold">Edit</button>
                                        <button onClick={() => { if(confirm("Hapus voucher ini?")) deleteVoucher(v.id) }} className="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {vouchers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Belum ada voucher.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
