"use client";
import { useData } from "../../context/DataContext";

export default function PegawaiMenuPage() {
    const { menus, updateMenu, isLoaded } = useData();

    if (!isLoaded) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

    const handleToggleStock = (id: number, currentStock: string) => {
        const newStock = currentStock === "Tersedia" ? "Habis" : "Tersedia";
        updateMenu(id, { stock: newStock });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Kelola Stok Menu</h1>
                <p className="text-gray-500 text-sm mt-1">Ubah ketersediaan stok menu hari ini. Pegawai hanya dapat mengubah status stok.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Menu</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Status Saat Ini</th>
                                <th className="px-6 py-4 text-right">Ubah Stok</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {menus.map(menu => (
                                <tr key={menu.id} className="hover:bg-gray-50/50">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={menu.image} alt={menu.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100" />
                                            <div>
                                                <p className="font-bold text-gray-900">{menu.name}</p>
                                                <p className="text-xs text-amber-700 font-semibold">Rp {menu.price.toLocaleString("id-ID")}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{menu.category}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${menu.stock === "Tersedia" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {menu.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        {menu.stock === "Tersedia" ? (
                                            <button 
                                                onClick={() => handleToggleStock(menu.id, menu.stock)} 
                                                className="bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 font-bold px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Tandai Habis
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleToggleStock(menu.id, menu.stock)} 
                                                className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 font-bold px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Tandai Tersedia
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {menus.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Tidak ada menu.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
