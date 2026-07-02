"use client";
import { useData } from "../../context/DataContext";

export default function PegawaiMenuPage() {
    const { menus, updateMenu, isLoaded } = useData();

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const handleToggleStock = (id: number, currentStock: string) => {
        const newStock = currentStock === "Tersedia" ? "Habis" : "Tersedia";
        updateMenu(id, { stock: newStock });
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Kelola Stok Menu</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ubah ketersediaan stok menu hari ini. Pegawai hanya dapat mengubah status stok.</p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-neutral-800">
                            <tr>
                                <th className="px-6 py-4">Menu</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Status Saat Ini</th>
                                <th className="px-6 py-4 text-right">Ubah Stok</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                            {menus.map(menu => (
                                <tr key={menu.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={menu.image} alt={menu.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-neutral-800" />
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{menu.name}</p>
                                                <p className="text-xs text-amber-700 dark:text-amber-500 font-semibold">Rp {menu.price.toLocaleString("id-ID")}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{menu.category}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${menu.stock === "Tersedia" ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400" : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"}`}>
                                            {menu.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        {menu.stock === "Tersedia" ? (
                                            <button 
                                                onClick={() => handleToggleStock(menu.id, menu.stock)} 
                                                className="bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-900/50 hover:bg-red-100 dark:hover:bg-red-900/50 font-bold px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Tandai Habis
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleToggleStock(menu.id, menu.stock)} 
                                                className="bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-900/50 hover:bg-green-100 dark:hover:bg-green-900/50 font-bold px-4 py-2 rounded-lg transition-colors"
                                            >
                                                Tandai Tersedia
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            {menus.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">Tidak ada menu.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
