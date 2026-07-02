"use client";
import { useData } from "../../context/DataContext";

export default function AdminKontakPage() {
    const { contactMessages, deleteContactMessage, isLoaded } = useData();

    if (!isLoaded) return <div className="p-8 text-center text-gray-500 dark:text-gray-400">Memuat data...</div>;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black text-gray-900 dark:text-white">Pesan dari Pelanggan</h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Daftar pesan yang dikirim melalui form Kontak Kami.</p>
            </div>

            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 dark:bg-neutral-900 text-gray-600 dark:text-gray-400 font-semibold border-b border-gray-200 dark:border-neutral-800 whitespace-nowrap">
                            <tr>
                                <th className="px-6 py-4">Tanggal</th>
                                <th className="px-6 py-4">Nama Pelanggan</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Isi Pesan</th>
                                <th className="px-6 py-4 text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                            {contactMessages.map(msg => (
                                <tr key={msg.id} className="hover:bg-gray-50/50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 text-gray-500 dark:text-gray-400 whitespace-nowrap" suppressHydrationWarning>{new Date(msg.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                                    <td className="px-6 py-4 font-bold text-gray-900 dark:text-white whitespace-nowrap">{msg.name}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">{msg.email}</td>
                                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 min-w-[300px]">{msg.message}</td>
                                    <td className="px-6 py-4 text-right whitespace-nowrap">
                                        <button onClick={() => { if(confirm("Hapus pesan ini?")) deleteContactMessage(msg.id) }} className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold">Hapus</button>
                                    </td>
                                </tr>
                            ))}
                            {contactMessages.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="text-gray-400 dark:text-gray-600 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                            </svg>
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400">Belum ada pesan masuk.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
