"use client";
import { useState } from "react";
import { useData, PaymentMethod } from "../../context/DataContext";

export default function AdminPembayaranPage() {
    const { paymentMethods, addPaymentMethod, updatePaymentMethod, deletePaymentMethod, isLoaded } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentMethod, setCurrentMethod] = useState<Partial<PaymentMethod>>({});

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const handleEdit = (method: PaymentMethod) => {
        setCurrentMethod(method);
        setIsEditing(true);
    };

    const handleAddNew = () => {
        setCurrentMethod({ name: "", provider: "", account_details: "", instructions: "", is_active: true });
        setIsEditing(true);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentMethod.id) {
            updatePaymentMethod(currentMethod.id, currentMethod);
        } else {
            addPaymentMethod(currentMethod as Omit<PaymentMethod, "id">);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 max-w-xl text-gray-900 dark:text-white">
                <h2 className="text-xl font-bold mb-6">{currentMethod.id ? "Edit Metode Pembayaran" : "Tambah Metode Pembayaran"}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nama Metode (Kategori)</label>
                        <select required value={currentMethod.name || "cash"} onChange={e => {
                            const newName = e.target.value;
                            let newProvider = "";
                            if (newName === "cash") newProvider = "Tunai";
                            if (newName === "qris") newProvider = "QRIS";
                            setCurrentMethod({...currentMethod, name: newName, provider: newProvider, account_details: ""});
                        }} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 dark:bg-neutral-900">
                            <option value="cash">Cash / Tunai</option>
                            <option value="qris">QRIS</option>
                            <option value="bank">Transfer Bank</option>
                            <option value="ewallet">E-Wallet</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Kategori ini digunakan untuk ikon & pengelompokan di halaman kasir.</p>
                    </div>

                    {currentMethod.name === "bank" && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">Pilih Bank</label>
                            <select required value={currentMethod.provider || ""} onChange={e => setCurrentMethod({...currentMethod, provider: e.target.value})} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 dark:bg-neutral-900">
                                <option value="" disabled>-- Pilih Bank --</option>
                                <option value="BCA">BCA</option>
                                <option value="Mandiri">Mandiri</option>
                                <option value="BNI">BNI</option>
                                <option value="BRI">BRI</option>
                                <option value="BSI">BSI</option>
                                <option value="CIMB Niaga">CIMB Niaga</option>
                                <option value="Permata">Permata</option>
                            </select>
                        </div>
                    )}

                    {currentMethod.name === "ewallet" && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">Pilih E-Wallet</label>
                            <select required value={currentMethod.provider || ""} onChange={e => setCurrentMethod({...currentMethod, provider: e.target.value})} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500 dark:bg-neutral-900">
                                <option value="" disabled>-- Pilih E-Wallet --</option>
                                <option value="GoPay">GoPay</option>
                                <option value="OVO">OVO</option>
                                <option value="DANA">DANA</option>
                                <option value="ShopeePay">ShopeePay</option>
                                <option value="LinkAja">LinkAja</option>
                            </select>
                        </div>
                    )}

                    {(currentMethod.name === "cash" || !currentMethod.name) && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">Nama Provider (Opsional)</label>
                            <input type="text" value={currentMethod.provider || ""} onChange={e => setCurrentMethod({...currentMethod, provider: e.target.value})} placeholder="Misal: Tunai" className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500" />
                        </div>
                    )}

                    {currentMethod.name === "qris" && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">Upload Gambar QRIS</label>
                            <input type="file" accept="image/*" onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        setCurrentMethod({...currentMethod, account_details: reader.result as string});
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500" />
                            {currentMethod.account_details && currentMethod.account_details.startsWith("data:image") && (
                                <div className="mt-2">
                                    <img src={currentMethod.account_details} alt="QRIS Preview" className="h-32 object-contain rounded-lg border border-gray-200 dark:border-neutral-700" />
                                </div>
                            )}
                        </div>
                    )}

                    {(currentMethod.name === "bank" || currentMethod.name === "ewallet") && (
                        <div>
                            <label className="block text-sm font-semibold mb-1">
                                {currentMethod.name === "bank" ? "Nomor Rekening" : "Nomor Akun E-Wallet"}
                            </label>
                            <input required type="text" value={currentMethod.account_details || ""} onChange={e => setCurrentMethod({...currentMethod, account_details: e.target.value})} placeholder={currentMethod.name === "bank" ? "Misal: 1234567890 (A.N. Sasa Coffee)" : "Misal: 081234567890 (A.N. Sasa Coffee)"} className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 focus:outline-none focus:border-amber-500" />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-semibold mb-1">Instruksi Pembayaran (Opsional)</label>
                        <textarea rows={2} value={currentMethod.instructions || ""} onChange={e => setCurrentMethod({...currentMethod, instructions: e.target.value})} placeholder="Misal: Harap transfer tepat hingga 3 digit terakhir." className="w-full bg-transparent border border-gray-200 dark:border-neutral-700 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-amber-500"></textarea>
                    </div>
                    <div>
                        <label className="flex items-center gap-2 cursor-pointer mt-2">
                            <input type="checkbox" checked={currentMethod.is_active !== false} onChange={e => setCurrentMethod({...currentMethod, is_active: e.target.checked})} className="w-4 h-4 accent-amber-600" />
                            <span className="text-sm font-semibold">Aktif (Bisa digunakan oleh pelanggan)</span>
                        </label>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg font-bold transition-colors">Simpan</button>
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
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kelola Pembayaran</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Atur opsi metode pembayaran yang tersedia di sistem kasir dan pesanan online.</p>
                </div>
                <button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-colors">
                    + Tambah Pembayaran
                </button>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-neutral-800">
                            <tr>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Provider</th>
                                <th className="px-6 py-4">Detail Akun</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                            {paymentMethods.map(method => (
                                <tr key={method.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white uppercase">{method.name}</td>
                                    <td className="px-6 py-4 font-semibold text-gray-700 dark:text-gray-300">{method.provider}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{method.account_details || "-"}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${method.is_active ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}>
                                            {method.is_active ? "Aktif" : "Nonaktif"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button onClick={() => handleEdit(method)} className="text-amber-600 hover:text-amber-700 font-bold px-2 py-1 bg-amber-50 dark:bg-amber-900/30 rounded-lg">Edit</button>
                                        <button onClick={() => {
                                            if (confirm(`Yakin menghapus metode pembayaran ${method.provider}?`)) {
                                                deletePaymentMethod(method.id);
                                            }
                                        }} className="text-red-500 hover:text-red-700 font-bold px-2 py-1 bg-red-50 dark:bg-red-900/30 rounded-lg">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {paymentMethods.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">Belum ada metode pembayaran. Silakan tambah baru.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
