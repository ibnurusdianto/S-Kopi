"use client";

import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};

export default function KeranjangPage() {
    const { addOrder, paymentMethods, isLoaded } = useData();
    const { cart, setCart, voucher, applyVoucher, removeVoucher, discountAmount } = useCart();
    const [voucherInput, setVoucherInput] = useState("");
    const [voucherMessage, setVoucherMessage] = useState("");
    const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", notes: "", payment: "qris" });
    const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "success">("idle");
    const [queueNumber, setQueueNumber] = useState("");

    const totalCartPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const totalCartItems = cart.reduce((acc, curr) => acc + curr.qty, 0);

    const handleDecreaseFromCart = (cartItemId: string) => {
        const item = cart.find(c => c.cartItemId === cartItemId);
        if (item) {
            if (item.qty > 1) {
                setCart(cart.map(c => c.cartItemId === cartItemId ? { ...c, qty: c.qty - 1, totalPrice: c.unitPrice * (c.qty - 1) } : c));
            } else {
                setCart(cart.filter(c => c.cartItemId !== cartItemId));
            }
        }
    };

    const handleIncreaseFromCart = (cartItemId: string) => {
        setCart(cart.map(c => c.cartItemId === cartItemId ? { ...c, qty: c.qty + 1, totalPrice: c.unitPrice * (c.qty + 1) } : c));
    };

    const handleSubmitOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStatus("loading");

        const orderItems = cart.map(item => ({
            product_id: item.product.id,
            name: `${item.product.name} ${item.size !== "Regular" ? "("+item.size+")" : ""}`,
            qty: item.qty,
            subtotal: item.totalPrice
        }));
        
        const newOrder = {
            id: `ORD-${Date.now()}`,
            customerName: checkoutForm.name,
            phone: checkoutForm.phone,
            items: orderItems,
            totalPrice: finalPrice,
            paymentMethod: checkoutForm.payment,
            status: "Baru" as const,
            createdAt: new Date().toISOString()
        };
        const created = await addOrder(newOrder);

        setTimeout(() => {
            if (created && created.queueNumber) {
                setQueueNumber(created.queueNumber);
            }
            setCheckoutStatus("success");
            setCart([]); 
            removeVoucher(); 
        }, 500);
    };

    const handleApplyVoucher = () => {
        if (!voucherInput.trim()) {
            setVoucherMessage("Masukkan kode voucher terlebih dahulu.");
            return;
        }
        const isValid = applyVoucher(voucherInput);
        if (isValid) {
            setVoucherMessage("");
            setVoucherInput("");
        } else {
            setVoucherMessage("Voucher tidak valid atau sudah kadaluarsa.");
        }
    };

    const finalPrice = Math.max(0, totalCartPrice - discountAmount);

    return (
        <div className="relative min-h-screen bg-background text-foreground pb-24">
            
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full bg-[#7c2d12]/10 dark:bg-[#7c2d12]/20 blur-[80px] sm:blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute top-[30%] right-[-10%] w-[220px] sm:w-[400px] h-[220px] sm:h-[400px] rounded-full bg-[#f59e0b]/5 dark:bg-[#f59e0b]/15 blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12">
                <div className="flex items-center gap-3 mb-6 sm:mb-8">
                    <Link href="/menu" className="p-2 rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors">
                        ←
                    </Link>
                    <h1 className="text-2xl sm:text-3xl font-black font-sans tracking-tight">Keranjang <span className="text-amber-700 dark:text-amber-500">Belanja</span></h1>
                </div>

                {checkoutStatus === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center p-6 sm:p-10 bg-white dark:bg-neutral-900 rounded-3xl shadow-xl border border-gray-100 dark:border-neutral-800">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                            </svg>
                        </div>
                        <h3 className="text-2xl font-black text-foreground mb-2">Pesanan Berhasil!</h3>
                        <p className="text-gray-500 text-sm mb-6">Harap tunjukkan layar ini atau sebutkan nomor antrian ke kasir.</p>
                        <div className="bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 w-full max-w-xs shadow-sm">
                            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Nomor Antrian Anda</p>
                            <p className="text-5xl font-black text-amber-600 tracking-tighter mb-4">{queueNumber}</p>
                            <div className="text-left border-t border-dashed border-gray-300 dark:border-neutral-600 pt-4 mt-4">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Nama</span>
                                    <span className="font-bold text-foreground">{checkoutForm.name}</span>
                                </div>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-500">Metode</span>
                                    <span className="font-bold uppercase text-foreground">{checkoutForm.payment}</span>
                                </div>
                            </div>
                        </div>

                        
                        <div className="mt-4 w-full max-w-xs text-left bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5">
                            <p className="text-sm font-bold text-amber-800 dark:text-amber-500 mb-3">Selesaikan Pembayaran Anda:</p>
                            {(() => {
                                const activeMethods = paymentMethods?.filter(p => p.name === checkoutForm.payment) || [];
                                if (activeMethods.length === 0) return null;

                                return (
                                    <div className="space-y-3">
                                        {activeMethods.map((method, idx) => (
                                            <div key={idx} className="bg-white dark:bg-neutral-900 border border-amber-200 dark:border-amber-800/50 rounded-xl p-3">
                                                {method.name === "qris" ? (
                                                    <div className="flex flex-col items-center">
                                                        <p className="text-xs text-gray-500 font-semibold mb-2">Scan QR Code di bawah ini</p>
                                                        {method.account_details && method.account_details.startsWith("data:image") ? (
                                                            <img src={method.account_details} alt="QRIS" className="w-full max-w-[200px] object-contain rounded-lg border border-gray-200 dark:border-neutral-700" />
                                                        ) : (
                                                            <p className="text-sm font-bold text-gray-900 dark:text-white">QRIS tidak tersedia</p>
                                                        )}
                                                    </div>
                                                ) : method.name === "ewallet" ? (
                                                    <div>
                                                        <p className="text-[10px] text-gray-500 font-semibold mb-0.5">{method.provider}</p>
                                                        <div className="flex justify-between items-center mt-1">
                                                            <input type="text" readOnly value={method.account_details || ""} className="w-full bg-transparent text-sm font-black text-gray-900 dark:text-white border-none focus:outline-none" />
                                                            <button 
                                                                onClick={() => navigator.clipboard.writeText(method.account_details || "")}
                                                                className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 ml-2"
                                                            >
                                                                Salin
                                                            </button>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            <p className="text-[10px] text-gray-500 font-semibold mb-0.5">{method.provider}</p>
                                                            <p className="text-sm font-black text-gray-900 dark:text-white">{method.account_details}</p>
                                                        </div>
                                                        <button 
                                                            onClick={() => navigator.clipboard.writeText(method.account_details || "")}
                                                            className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-500 px-3 py-1.5 rounded-lg text-xs font-bold"
                                                        >
                                                            Salin
                                                        </button>
                                                    </div>
                                                )}
                                                {method.instructions && (
                                                    <p className="text-xs text-amber-700 dark:text-amber-500 mt-2 font-medium">
                                                        * {method.instructions}
                                                    </p>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })()}
                        </div>
                        <div className="w-full max-w-xs mt-6 space-y-3">
                            <button className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0v3.375c0 .621.504 1.125 1.125 1.125h8.25c.621 0 1.125-.504 1.125-1.125v-3.375z" />
                                </svg>
                                Cetak Nomor Antrian
                            </button>
                            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 13.5l1.5 1.5 3-3" />
                                </svg>
                                Kirim Bukti ke WhatsApp
                            </button>
                            <button disabled className="w-full block text-center bg-gray-100 dark:bg-neutral-800 text-gray-400 dark:text-gray-500 font-bold py-3.5 rounded-xl text-sm shadow-sm cursor-not-allowed">
                                Kembali ke Menu (Selesaikan Pembayaran)
                            </button>
                        </div>
                    </div>
                ) : cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-neutral-900 rounded-3xl shadow-sm border border-gray-100 dark:border-neutral-800 text-center px-4">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Keranjang Anda Kosong</h2>
                        <p className="text-gray-500 text-sm mb-6 max-w-sm">Anda belum menambahkan menu apapun ke dalam keranjang. Yuk, lihat menu lezat kami!</p>
                        <Link href="/menu" className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-full text-sm transition-all shadow-md">
                            Lihat Menu
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        
                        <div className="lg:col-span-2 space-y-4">
                            {cart.map((item) => (
                                <div key={item.cartItemId} className="flex gap-4 bg-white dark:bg-neutral-900 p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800">
                                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl overflow-hidden shrink-0 flex items-center justify-center relative">
                                        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-[10px] text-center px-2">
                                            [ Gambar {item.product.name} ]
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-grow justify-between">
                                        <div className="flex justify-between items-start gap-2">
                                            <div>
                                                <h3 className="font-bold text-sm sm:text-base text-foreground line-clamp-1">{item.product.name}</h3>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {item.size} 
                                                    {item.sugar ? ` • ${item.sugar}` : ''} 
                                                    {item.ice ? ` • ${item.ice}` : ''}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-amber-600 text-sm sm:text-base">{formatRupiah(item.totalPrice)}</div>
                                                <div className="text-[10px] text-gray-400 mt-0.5">{formatRupiah(item.unitPrice)} / item</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="flex items-center bg-gray-50 dark:bg-neutral-800 rounded-xl p-1 border border-gray-200 dark:border-neutral-700">
                                                <button onClick={() => handleDecreaseFromCart(item.cartItemId)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-100 focus:outline-none">－</button>
                                                <span className="font-bold text-sm text-foreground w-8 text-center">{item.qty}</span>
                                                <button onClick={() => handleIncreaseFromCart(item.cartItemId)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-600 text-white shadow-sm hover:bg-amber-700 focus:outline-none">＋</button>
                                            </div>
                                            <button onClick={() => setCart(cart.filter(c => c.cartItemId !== item.cartItemId))} className="text-xs font-semibold text-red-500 hover:text-red-700 transition-colors">
                                                Hapus
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            
                            
                            <Link href="/menu" className="block w-full py-4 rounded-2xl border-2 border-dashed border-gray-200 dark:border-neutral-700 text-center text-gray-500 hover:text-amber-600 hover:border-amber-400 dark:hover:border-amber-700 transition-colors font-semibold text-sm">
                                + Tambah Menu Lain
                            </Link>
                        </div>

                        
                        <div className="lg:col-span-1 space-y-6">
                            
                            
                            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-gray-100 dark:border-neutral-800 p-5 sm:p-6">
                                <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-amber-600">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>
                                    Makin Hemat Pakai Voucher
                                </h3>
                                
                                {voucher ? (
                                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-3 flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-green-700 dark:text-green-400">Kode {voucher.code} Diterapkan</p>
                                            <p className="text-[10px] text-green-600 dark:text-green-500">Berhasil memotong {formatRupiah(discountAmount)}</p>
                                        </div>
                                        <button onClick={removeVoucher} className="text-xs font-bold text-red-500 hover:text-red-700">Hapus</button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <input 
                                                type="text" 
                                                value={voucherInput}
                                                onChange={(e) => setVoucherInput(e.target.value)}
                                                placeholder="Masukkan kode voucher" 
                                                className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 sm:px-3 sm:py-2.5 text-sm uppercase focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                                            />
                                            <button onClick={handleApplyVoucher} className="w-full sm:w-auto shrink-0 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white px-4 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-colors">Terapkan</button>
                                        </div>
                                        {voucherMessage && <p className="text-xs text-red-500 mt-2">{voucherMessage}</p>}
                                    </>
                                )}
                            </div>

                            <form id="checkout-form-page" onSubmit={handleSubmitOrder} className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg border border-gray-100 dark:border-neutral-800 p-5 sm:p-6">
                                <h3 className="text-lg font-black text-foreground mb-4 border-b border-gray-100 dark:border-neutral-800 pb-3">Ringkasan & Pembayaran</h3>
                                
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nama Lengkap</label>
                                        <input required type="text" value={checkoutForm.name} onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})} placeholder="Masukkan nama" className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">No. WhatsApp</label>
                                        <input required type="tel" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})} placeholder="081234567890" className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5 capitalize">Metode Pembayaran</label>
                                        <select value={checkoutForm.payment} onChange={(e) => setCheckoutForm({...checkoutForm, payment: e.target.value})} className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 cursor-pointer capitalize">
                                            {(() => {
                                                const activeMethods = paymentMethods?.filter(p => p.is_active) || [];
                                                const uniqueMethods = Array.from(new Set(activeMethods.map(m => m.name)))
                                                    .map(name => activeMethods.find(m => m.name === name)!);
                                                
                                                return uniqueMethods.map(method => (
                                                    <option key={method.id} value={method.name}>
                                                        {method.name === "bank" ? "Transfer Bank" : method.name === "ewallet" ? "E-Wallet" : method.name}
                                                    </option>
                                                ));
                                            })()}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-gray-500 mb-1.5">Catatan Khusus (Opsional)</label>
                                        <textarea rows={2} value={checkoutForm.notes} onChange={(e) => setCheckoutForm({...checkoutForm, notes: e.target.value})} placeholder="Misal: Kurangi es, dsb." className="w-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 dark:border-neutral-800 pt-4 mb-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">Total Item</span>
                                        <span className="font-semibold text-foreground text-sm">{totalCartItems} Item</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-gray-500 text-sm">Subtotal</span>
                                        <span className="font-semibold text-foreground text-sm">{formatRupiah(totalCartPrice)}</span>
                                    </div>
                                    {voucher && (
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-green-500 text-sm">Diskon ({voucher.code})</span>
                                            <span className="font-bold text-green-500 text-sm">- {formatRupiah(discountAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center pt-3 border-t border-dashed border-gray-200 dark:border-neutral-700">
                                        <span className="font-bold text-foreground">Total Bayar</span>
                                        <span className="text-xl font-black text-amber-600">{formatRupiah(finalPrice)}</span>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={checkoutStatus === "loading"}
                                    className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 text-white py-3.5 rounded-xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2"
                                >
                                    {checkoutStatus === "loading" ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Memproses...
                                        </>
                                    ) : (
                                        `Pesan Sekarang`
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
