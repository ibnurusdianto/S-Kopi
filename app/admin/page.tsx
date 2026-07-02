"use client";
import { useData } from "../context/DataContext";

export default function AdminDashboardPage() {
    const { menus, orders, vouchers, contactMessages, isLoaded } = useData();

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    const totalMenu = menus.length;
    const activeOrders = orders.filter(o => o.status === "Baru" || o.status === "Diproses").length;
    const completedOrders = orders.filter(o => o.status === "Selesai").length;
    const totalVouchers = vouchers.length;
    const newMessages = contactMessages.length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Ikhtisar Admin</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Ringkasan data aplikasi Sasa Kopi</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Total Menu</p>
                    <p className="text-3xl font-black text-amber-700 dark:text-amber-500">{totalMenu}</p>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Pesanan Aktif</p>
                    <p className="text-3xl font-black text-amber-700 dark:text-amber-500">{activeOrders}</p>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Pesanan Selesai</p>
                    <p className="text-3xl font-black text-green-600 dark:text-green-500">{completedOrders}</p>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Pesan Kontak Baru</p>
                    <p className="text-3xl font-black text-blue-600 dark:text-blue-500">{newMessages}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 bg-amber-50 dark:bg-amber-950/30 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-amber-900 dark:text-amber-500">Pesanan Aktif</h2>
                        <span className="bg-amber-200 dark:bg-amber-900/50 text-amber-800 dark:text-amber-400 text-xs font-bold px-2 py-1 rounded-full">{activeOrders}</span>
                    </div>
                    <div className="p-0 overflow-y-auto max-h-96">
                        {orders.filter(o => o.status === "Baru" || o.status === "Diproses").length === 0 ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">Belum ada pesanan aktif.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
                                {orders.filter(o => o.status === "Baru" || o.status === "Diproses").map(order => (
                                    <li key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-gray-900 dark:text-white">{order.customerName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning>{order.id} • {new Date(order.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === "Baru" ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400" : "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-amber-700 dark:text-amber-500 mb-1">Rp {order.totalPrice.toLocaleString("id-ID")}</p>
                                        <div className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                                            {order.items.map((item, i) => (
                                                <span key={i}>{item.qty}x {item.name}{i < order.items.length - 1 ? ", " : ""}</span>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                
                <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 bg-green-50 dark:bg-green-950/30 border-b border-gray-200 dark:border-neutral-800 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-green-900 dark:text-green-500">Pesanan Selesai (Terbaru)</h2>
                        <span className="bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">{completedOrders}</span>
                    </div>
                    <div className="p-0 overflow-y-auto max-h-96">
                        {orders.filter(o => o.status === "Selesai").length === 0 ? (
                            <div className="p-8 text-center text-gray-500 dark:text-gray-400 text-sm">Belum ada pesanan selesai.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100 dark:divide-neutral-800">
                                {orders.filter(o => o.status === "Selesai").slice(0, 10).map(order => (
                                    <li key={order.id} className="p-4 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors opacity-75">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-gray-700 dark:text-gray-200">{order.customerName}</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400" suppressHydrationWarning>{order.id} • {new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
                                            </div>
                                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400">
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">Rp {order.totalPrice.toLocaleString("id-ID")}</p>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                            {order.items.map((item, i) => (
                                                <span key={i}>{item.qty}x {item.name}{i < order.items.length - 1 ? ", " : ""}</span>
                                            ))}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
