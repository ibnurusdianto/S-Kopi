"use client";
import { useData } from "../context/DataContext";

export default function PegawaiOrdersPage() {
    const { orders, updateOrderStatus, isLoaded } = useData();

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const handleStatusChange = (id: string, newStatus: string) => {
        updateOrderStatus(id, newStatus as any);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Live Orders</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Kelola pesanan yang masuk secara real-time.</p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-neutral-800 whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-4">ID Pesanan</th>
                                <th className="px-6 py-4">Waktu</th>
                                <th className="px-6 py-4">Pelanggan</th>
                                <th className="px-6 py-4">Menu & Jumlah</th>
                                <th className="px-6 py-4">Total Harga</th>
                                <th className="px-6 py-4">Status & Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                            {orders.map(order => (
                                <tr key={order.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 align-top transition-colors">
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">#{order.id.slice(-6)}</td>
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap" suppressHydrationWarning>
                                        {new Date(order.createdAt).toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' })}<br/>
                                        <span className="text-xs">{new Date(order.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}</span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <p className="font-bold text-gray-900 dark:text-white">{order.customerName}</p>
                                        <p className="text-gray-500 dark:text-gray-400 text-xs">{order.phone}</p>
                                        <p className="text-amber-700 dark:text-amber-500 text-xs font-semibold mt-1">Via {order.paymentMethod.toUpperCase()}</p>
                                    </td>
                                    <td className="px-6 py-4 min-w-[200px]">
                                        <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                                            {order.items.map((item: any, idx: number) => (
                                                <li key={idx}><span className="font-semibold">{item.qty}x</span> {item.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="px-6 py-4 font-bold text-amber-700 dark:text-amber-500 whitespace-nowrap">
                                        Rp {order.totalPrice.toLocaleString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap space-y-2">
                                        <select 
                                            value={order.status} 
                                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                            className={`w-full text-xs font-bold border rounded-lg px-3 py-2 cursor-pointer
                                                ${order.status === "Baru" ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50" : ""}
                                                ${order.status === "Diproses" ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-900/50" : ""}
                                                ${order.status === "Selesai" ? "bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-900/50" : ""}
                                                ${order.status === "Dibatalkan" ? "bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-900/50" : ""}
                                            `}
                                        >
                                            <option value="Baru">Baru</option>
                                            <option value="Diproses">Diproses</option>
                                            <option value="Selesai">Selesai</option>
                                            <option value="Dibatalkan">Dibatalkan</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">Belum ada pesanan masuk hari ini.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
