"use client";
import { useData } from "../context/DataContext";

export default function AdminDashboardPage() {
    const { menus, orders, vouchers, contactMessages, isLoaded } = useData();

    if (!isLoaded) return <div className="p-8 text-center text-gray-500">Memuat data...</div>;

    const totalMenu = menus.length;
    const activeOrders = orders.filter(o => o.status === "Baru" || o.status === "Diproses").length;
    const completedOrders = orders.filter(o => o.status === "Selesai").length;
    const totalVouchers = vouchers.length;
    const newMessages = contactMessages.length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900">Ikhtisar Admin</h1>
                <p className="text-gray-500 text-sm mt-1">Ringkasan data aplikasi Sasa Kopi</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Total Menu</p>
                    <p className="text-3xl font-black text-amber-700">{totalMenu}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Pesanan Aktif</p>
                    <p className="text-3xl font-black text-amber-700">{activeOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Pesanan Selesai</p>
                    <p className="text-3xl font-black text-green-600">{completedOrders}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                    <p className="text-sm font-semibold text-gray-500 mb-1">Pesan Kontak Baru</p>
                    <p className="text-3xl font-black text-blue-600">{newMessages}</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 bg-amber-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-amber-900">Pesanan Aktif</h2>
                        <span className="bg-amber-200 text-amber-800 text-xs font-bold px-2 py-1 rounded-full">{activeOrders}</span>
                    </div>
                    <div className="p-0 overflow-y-auto max-h-96">
                        {orders.filter(o => o.status === "Baru" || o.status === "Diproses").length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">Belum ada pesanan aktif.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {orders.filter(o => o.status === "Baru" || o.status === "Diproses").map(order => (
                                    <li key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-gray-900">{order.customerName}</p>
                                                <p className="text-xs text-gray-500">{order.id} • {new Date(order.createdAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${order.status === "Baru" ? "bg-blue-100 text-blue-700" : "bg-amber-100 text-amber-700"}`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-amber-700 mb-1">Rp {order.totalPrice.toLocaleString("id-ID")}</p>
                                        <div className="text-xs text-gray-600 line-clamp-2">
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

                
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 bg-green-50 border-b border-gray-200 flex justify-between items-center">
                        <h2 className="text-lg font-bold text-green-900">Pesanan Selesai (Terbaru)</h2>
                        <span className="bg-green-200 text-green-800 text-xs font-bold px-2 py-1 rounded-full">{completedOrders}</span>
                    </div>
                    <div className="p-0 overflow-y-auto max-h-96">
                        {orders.filter(o => o.status === "Selesai").length === 0 ? (
                            <div className="p-8 text-center text-gray-500 text-sm">Belum ada pesanan selesai.</div>
                        ) : (
                            <ul className="divide-y divide-gray-100">
                                {orders.filter(o => o.status === "Selesai").slice(0, 10).map(order => (
                                    <li key={order.id} className="p-4 hover:bg-gray-50 transition-colors opacity-75">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <p className="font-bold text-gray-700">{order.customerName}</p>
                                                <p className="text-xs text-gray-500">{order.id} • {new Date(order.createdAt).toLocaleDateString("id-ID")}</p>
                                            </div>
                                            <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                                                {order.status}
                                            </span>
                                        </div>
                                        <p className="text-sm font-semibold text-gray-700 mb-1">Rp {order.totalPrice.toLocaleString("id-ID")}</p>
                                        <div className="text-xs text-gray-500 truncate">
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
