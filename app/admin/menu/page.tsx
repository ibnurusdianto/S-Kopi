"use client";
import { useState } from "react";
import { useData, Menu } from "../../context/DataContext";

export default function AdminMenuPage() {
    const { menus, addMenu, updateMenu, deleteMenu, isLoaded } = useData();
    const [isEditing, setIsEditing] = useState(false);
    const [currentMenu, setCurrentMenu] = useState<Partial<Menu>>({});

    if (!isLoaded) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

    const [imageError, setImageError] = useState("");

    const handleEdit = (menu: Menu) => {
        setCurrentMenu(menu);
        setIsEditing(true);
        setImageError("");
    };

    const handleAddNew = () => {
        setCurrentMenu({ name: "", description: "", price: 0, image: "", category: "Kopi", stock: "Tersedia" });
        setIsEditing(true);
        setImageError("");
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        
        const validTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!validTypes.includes(file.type)) {
            setImageError("Hanya format JPG dan PNG yang diperbolehkan.");
            return;
        }

        
        if (file.size > 10 * 1024 * 1024) {
            setImageError("Ukuran maksimal file adalah 10 MB.");
            return;
        }

        setImageError("");

        
        const reader = new FileReader();
        reader.onloadend = () => {
            setCurrentMenu({ ...currentMenu, image: reader.result as string });
        };
        reader.readAsDataURL(file);
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        if (imageError) return; 

        if (currentMenu.id) {
            updateMenu(currentMenu.id, currentMenu);
        } else {
            addMenu({ ...currentMenu, id: Date.now() } as Menu);
        }
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 max-w-2xl">
                <h2 className="text-xl font-bold mb-6">{currentMenu.id ? "Edit Menu" : "Tambah Menu Baru"}</h2>
                <form onSubmit={handleSave} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold mb-1">Nama Menu</label>
                        <input required type="text" value={currentMenu.name || ""} onChange={e => setCurrentMenu({...currentMenu, name: e.target.value})} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Kategori</label>
                        <select value={currentMenu.category || "Kopi"} onChange={e => setCurrentMenu({...currentMenu, category: e.target.value})} className="w-full border rounded-lg px-3 py-2">
                            <option value="Kopi">Kopi</option>
                            <option value="Non-Kopi">Non-Kopi</option>
                            <option value="Cemilan">Cemilan</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Harga (Rp)</label>
                        <input required type="number" value={currentMenu.price || 0} onChange={e => setCurrentMenu({...currentMenu, price: Number(e.target.value)})} className="w-full border rounded-lg px-3 py-2" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Deskripsi</label>
                        <textarea required rows={3} value={currentMenu.description || ""} onChange={e => setCurrentMenu({...currentMenu, description: e.target.value})} className="w-full border rounded-lg px-3 py-2"></textarea>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Gambar Menu (Max 10MB, JPG/PNG)</label>
                        <input type="file" accept=".jpg, .jpeg, .png" onChange={handleImageUpload} className="w-full border rounded-lg px-3 py-2 text-sm" />
                        {imageError && <p className="text-red-500 text-xs mt-1">{imageError}</p>}
                        {currentMenu.image && (
                            <div className="mt-2">
                                <img src={currentMenu.image} alt="Preview" className="w-20 h-20 object-cover rounded-lg border bg-gray-50" />
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-semibold mb-1">Stok</label>
                        <select value={currentMenu.stock || "Tersedia"} onChange={e => setCurrentMenu({...currentMenu, stock: e.target.value as "Tersedia" | "Habis"})} className="w-full border rounded-lg px-3 py-2">
                            <option value="Tersedia">Tersedia</option>
                            <option value="Habis">Habis</option>
                        </select>
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
                    <h1 className="text-2xl font-black text-gray-900">Kelola Menu</h1>
                    <p className="text-gray-500 text-sm mt-1">Daftar semua menu yang tersedia.</p>
                </div>
                <button onClick={handleAddNew} className="bg-amber-600 hover:bg-amber-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm">
                    + Tambah Menu
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-gray-50 text-gray-600 font-semibold border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4">Menu</th>
                                <th className="px-6 py-4">Kategori</th>
                                <th className="px-6 py-4">Harga</th>
                                <th className="px-6 py-4">Stok</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
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
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{menu.category}</td>
                                    <td className="px-6 py-4 font-semibold text-amber-700">Rp {menu.price.toLocaleString("id-ID")}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${menu.stock === "Tersedia" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                            {menu.stock}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <button onClick={() => handleEdit(menu)} className="text-amber-600 hover:text-amber-800 font-bold">Edit</button>
                                        <button onClick={() => { if(confirm("Hapus menu ini?")) deleteMenu(menu.id) }} className="text-red-500 hover:text-red-700 font-bold">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {menus.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Tidak ada menu.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
