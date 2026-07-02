"use client";

import Image from "next/image";
import { useState, useMemo, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useData } from "../context/DataContext";

const formatRupiah = (number: number) => {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(number);
};


function MenuItemCard({ item, cartQty, onAddClick, onDecreaseClick, onViewImage }: any) {
    return (
        <div className="flex flex-col bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-neutral-800 transition-all hover:shadow-lg group relative z-10">
            <div onClick={() => onViewImage(item)} className="relative w-full aspect-[4/3] bg-neutral-200 dark:bg-neutral-800 overflow-hidden cursor-pointer group/img">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs px-2 text-center z-0">
                    [ Gambar {item.name} ]
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-medium z-20">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lihat Gambar
                </div>
            </div>

            <div className="p-4 sm:p-5 flex flex-col flex-grow bg-white dark:bg-neutral-900">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400">
                        {item.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-sm font-bold">
                        <span>★</span>
                        <span className="text-foreground text-xs">{item.rating}</span>
                    </div>
                </div>

                <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight line-clamp-1">{item.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 flex-grow leading-relaxed line-clamp-2">
                    {item.desc}
                </p>

                <div className="mt-4 text-amber-600 dark:text-amber-500 font-bold text-base sm:text-lg">
                    {formatRupiah(item.price)}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-neutral-800 flex flex-col gap-2">
                    {cartQty === 0 ? (
                        <button onClick={() => onAddClick(item)} className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors focus:outline-none">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            Masukkan Keranjang
                        </button>
                    ) : (
                        <div className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800 rounded-xl p-1 border border-gray-200 dark:border-neutral-700">
                            <button onClick={() => onDecreaseClick(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white dark:bg-neutral-700 text-gray-700 dark:text-gray-200 shadow-sm hover:bg-gray-100 focus:outline-none">－</button>
                            <span className="font-bold text-xs sm:text-sm text-foreground">{cartQty} Porsi</span>
                            <button onClick={() => onAddClick(item)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-600 text-white shadow-sm hover:bg-amber-700 focus:outline-none">＋</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}


export default function MenuPage() {
    const { menus, addOrder } = useData();

    const [categoryFilter, setCategoryFilter] = useState("all");
    const [sortFilter, setSortFilter] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const [selectedImage, setSelectedImage] = useState<any | null>(null);
    const [customizingItem, setCustomizingItem] = useState<any | null>(null);

    const { cart, setCart, voucher, applyVoucher, removeVoucher, discountAmount } = useCart();
    const [voucherInput, setVoucherInput] = useState("");
    const [voucherMessage, setVoucherMessage] = useState("");
    const [customOptions, setCustomOptions] = useState({ size: "Regular", sugar: "Normal", ice: "Normal", qty: 1 });

    
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutForm, setCheckoutForm] = useState({ name: "", phone: "", notes: "", payment: "qris" });
    const [checkoutStatus, setCheckoutStatus] = useState<"idle" | "loading" | "success">("idle");
    const [queueNumber, setQueueNumber] = useState("");

    
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
    const getCartItemQty = (itemId: number) => {
        return cart.filter((c) => c.product.id === itemId).reduce((acc, curr) => acc + curr.qty, 0);
    };

    const handleOpenCustomization = (item: any) => {
        setCustomizingItem(item);
        setCustomOptions({ size: "Regular", sugar: "Normal", ice: "Normal", qty: 1 });
    };

    const handleAddToCart = () => {
        if (!customizingItem) return;

        const sizePrice = customOptions.size === "Large" ? 5000 : 0;
        const unitPrice = customizingItem.price + sizePrice;
        const totalPrice = unitPrice * customOptions.qty;

        const newCartItem = {
            cartItemId: Date.now().toString(),
            product: customizingItem,
            size: customOptions.size,
            sugar: customizingItem.type === "drink" ? customOptions.sugar : null,
            ice: customizingItem.type === "drink" ? customOptions.ice : null,
            qty: customOptions.qty,
            unitPrice,
            totalPrice
        };

        setCart([...cart, newCartItem]);
        setCustomizingItem(null);
    };

    const handleDecreaseFromCart = (itemId: number) => {
        const itemsOfType = cart.filter(c => c.product.id === itemId);
        if (itemsOfType.length > 0) {
            const target = itemsOfType[itemsOfType.length - 1];
            if (target.qty > 1) {
                setCart(cart.map(c => c.cartItemId === target.cartItemId ? { ...c, qty: c.qty - 1, totalPrice: c.unitPrice * (c.qty - 1) } : c));
            } else {
                setCart(cart.filter(c => c.cartItemId !== target.cartItemId));
            }
        }
    };

    const totalCartItems = cart.reduce((acc, curr) => acc + curr.qty, 0);
    const totalCartPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
    const finalPrice = Math.max(0, totalCartPrice - discountAmount);

    
    const handleOpenCheckout = () => {
        setIsCheckoutOpen(true);
        
        setQueueNumber(`A-${Math.floor(Math.random() * 900) + 100}`);
    };

    const handleSubmitOrder = (e: React.FormEvent) => {
        e.preventDefault();
        setCheckoutStatus("loading");

        
        const orderItems = cart.map(item => ({
            name: `${item.product.name} ${item.size !== "Regular" ? "("+item.size+")" : ""}`,
            qty: item.qty
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
        addOrder(newOrder);

        
        setTimeout(() => {
            setCheckoutStatus("success");
        }, 2000);
    };

    const handleCloseCheckout = () => {
        setIsCheckoutOpen(false);
        if (checkoutStatus === "success") {
            setCart([]); 
            removeVoucher();
            setCheckoutStatus("idle");
            setCheckoutForm({ name: "", phone: "", notes: "", payment: "qris" });
        }
    };

    
    const mappedMenuData = useMemo(() => {
        return menus.map(m => ({
            id: m.id,
            name: m.name,
            category: m.category.toLowerCase().includes("kopi") && !m.category.toLowerCase().includes("non") ? "coffee" : "non-coffee",
            type: m.category === "Cemilan" ? "food" : "drink",
            desc: m.description,
            price: m.price,
            rating: 4.8, 
            img: m.image,
            stock: m.stock
        }));
    }, [menus]);

    const processedMenu = useMemo(() => {
        let result = [...mappedMenuData];
        if (categoryFilter !== "all") result = result.filter(item => item.category === categoryFilter);

        if (sortFilter === "price-asc") result.sort((a, b) => a.price - b.price);
        else if (sortFilter === "price-desc") result.sort((a, b) => b.price - a.price);
        else if (sortFilter === "rating-desc") result.sort((a, b) => b.rating - a.rating);

        return result;
    }, [categoryFilter, sortFilter]);

    const totalPages = Math.ceil(processedMenu.length / itemsPerPage);
    const paginatedMenu = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return processedMenu.slice(start, start + itemsPerPage);
    }, [processedMenu, currentPage]);

    return (
        <div className={`relative min-h-screen bg-background text-foreground ${totalCartItems > 0 ? 'pb-36 sm:pb-32' : 'pb-24'}`}>

            
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[260px] sm:w-[500px] h-[260px] sm:h-[500px] rounded-full bg-[#7c2d12]/10 dark:bg-[#7c2d12]/20 blur-[80px] sm:blur-[100px] animate-pulse" style={{ animationDuration: '4s' }} />
                <div className="absolute top-[30%] right-[-10%] w-[220px] sm:w-[400px] h-[220px] sm:h-[400px] rounded-full bg-[#f59e0b]/5 dark:bg-[#f59e0b]/15 blur-[100px] sm:blur-[120px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
            </div>

            <div className="relative z-10">
                
                <div className="pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-sans tracking-tight mb-2 sm:mb-3">
                        Semua <span className="text-amber-700 dark:text-amber-500">Daftar Menu</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm sm:text-base px-2">
                        Jelajahi seluruh racikan kopi otentik dan camilan terbaik kami yang siap memanjakan lidah Anda.
                    </p>
                </div>

                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 border-b border-gray-200/50 dark:border-neutral-800/50 pb-4 backdrop-blur-sm">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
                        <button onClick={() => { setCategoryFilter("all"); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors shrink-0 ${categoryFilter === "all" ? "bg-amber-600 text-white shadow-sm" : "bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600"}`}>Semua Menu</button>
                        <button onClick={() => { setCategoryFilter("coffee"); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors shrink-0 ${categoryFilter === "coffee" ? "bg-amber-600 text-white shadow-sm" : "bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600"}`}>Kopi</button>
                        <button onClick={() => { setCategoryFilter("non-coffee"); setCurrentPage(1); }} className={`px-4 py-2 rounded-full text-xs font-semibold transition-colors shrink-0 ${categoryFilter === "non-coffee" ? "bg-amber-600 text-white shadow-sm" : "bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600"}`}>Non-Kopi</button>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <select value={sortFilter} onChange={(e) => { setSortFilter(e.target.value); setCurrentPage(1); }} className="w-full md:w-48 bg-white dark:bg-neutral-800 text-xs sm:text-sm font-medium rounded-xl px-3 py-2.5 border border-gray-200 dark:border-neutral-700 focus:outline-none cursor-pointer">
                            <option value="default">Urutan: Rekomendasi</option>
                            <option value="price-asc">Harga: Termurah ↑</option>
                            <option value="price-desc">Harga: Termahal ↓</option>
                            <option value="rating-desc">Rating Tertinggi ★</option>
                        </select>
                    </div>
                </div>

                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[350px]">
                    {paginatedMenu.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            {paginatedMenu.map((item) => (
                                <MenuItemCard
                                    key={item.id}
                                    item={item}
                                    cartQty={getCartItemQty(item.id)}
                                    onAddClick={handleOpenCustomization}
                                    onDecreaseClick={handleDecreaseFromCart}
                                    onViewImage={(img: any) => setSelectedImage(img)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-xs sm:text-sm text-gray-500">Menu tidak ditemukan.</div>
                    )}
                </div>

                
                {totalPages > 1 && (
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex items-center justify-center gap-2">
                        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 disabled:opacity-40">←</button>
                        <div className="text-xs sm:text-sm font-semibold px-2 text-gray-500">Hal {currentPage} / {totalPages}</div>
                        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="px-3 py-2 text-xs sm:text-sm font-medium rounded-xl bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 disabled:opacity-40">→</button>
                    </div>
                )}
            </div>

            
            {totalCartItems > 0 && !isCheckoutOpen && (
                <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-neutral-900 border-t border-gray-200 dark:border-neutral-800 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-30 animate-fade-in safe-bottom">
                    <div className="max-w-7xl mx-auto px-4 py-3 sm:py-0 sm:h-20 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4">
                        <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-center">
                            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 font-bold uppercase tracking-wider">Total Belanja</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-lg sm:text-2xl font-black text-amber-600 dark:text-amber-500">
                                    {formatRupiah(finalPrice)}
                                </span>
                                <span className="text-xs text-gray-400">({totalCartItems} item)</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleOpenCheckout}
                            className="w-full sm:w-auto bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-xl sm:rounded-full font-bold text-sm shadow-md transition-all text-center"
                        >
                            Checkout Sekarang
                        </button>
                    </div>
                </div>
            )}

            
            {customizingItem && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md overflow-hidden shadow-2xl flex flex-col max-h-[85vh] sm:max-h-[90vh]">
                        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-neutral-800 flex items-start justify-between shrink-0">
                            <div>
                                <h2 className="text-lg sm:text-xl font-bold text-foreground line-clamp-1">{customizingItem.name}</h2>
                                <p className="text-xs sm:text-sm text-gray-500 mt-0.5">{formatRupiah(customizingItem.price)}</p>
                            </div>
                            <button onClick={() => setCustomizingItem(null)} className="p-2 bg-gray-100 dark:bg-neutral-800 rounded-full hover:bg-gray-200 transition-colors text-xs">✕</button>
                        </div>

                        <div className="p-4 sm:p-5 overflow-y-auto flex-grow flex flex-col gap-5 sm:gap-6">
                            <div>
                                <label className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 sm:mb-3 block">Ukuran (Size)</label>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                                    <button onClick={() => setCustomOptions({ ...customOptions, size: "Regular" })} className={`py-2.5 sm:py-3 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all ${customOptions.size === "Regular" ? "border-amber-600 bg-amber-50 text-amber-800" : "border-gray-200 text-gray-600"}`}>Regular</button>
                                    <button onClick={() => setCustomOptions({ ...customOptions, size: "Large" })} className={`py-2.5 sm:py-3 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all flex flex-col items-center justify-center ${customOptions.size === "Large" ? "border-amber-600 bg-amber-50 text-amber-800" : "border-gray-200 text-gray-600"}`}>
                                        <span>Large</span>
                                        <span className="text-[9px] opacity-70">+ Rp 5.000</span>
                                    </button>
                                </div>
                            </div>

                            {customizingItem.type === "drink" && (
                                <>
                                    <div>
                                        <label className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Gula (Sugar)</label>
                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                            {["Normal", "Less", "No"].map((opt) => (
                                                <button key={opt} onClick={() => setCustomOptions({ ...customOptions, sugar: opt + (opt !== "Normal" ? " Sugar" : "") })} className={`py-2 rounded-lg border text-xs font-medium transition-all ${customOptions.sugar.startsWith(opt) ? "border-amber-600 bg-amber-50 text-amber-800" : "border-gray-200 text-gray-600"}`}>{opt}</button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 block">Es (Ice Level)</label>
                                        <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                                            {["Normal", "Less", "No"].map((opt) => (
                                                <button key={opt} onClick={() => setCustomOptions({ ...customOptions, ice: opt + (opt !== "Normal" ? " Ice" : "") })} className={`py-2 rounded-lg border text-xs font-medium transition-all ${customOptions.ice.startsWith(opt) ? "border-amber-600 bg-amber-50 text-amber-800" : "border-gray-200 text-gray-600"}`}>{opt}</button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-2">
                                <span className="text-xs sm:text-sm font-bold text-gray-700">Jumlah Pesanan</span>
                                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                                    <button onClick={() => setCustomOptions({ ...customOptions, qty: Math.max(1, customOptions.qty - 1) })} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white shadow-sm font-bold text-gray-700">－</button>
                                    <span className="font-bold text-sm text-foreground w-10 text-center">{customOptions.qty}</span>
                                    <button onClick={() => setCustomOptions({ ...customOptions, qty: customOptions.qty + 1 })} className="w-8 h-8 flex items-center justify-center rounded-lg bg-amber-600 text-white shadow-sm font-bold">＋</button>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 sm:p-5 border-t border-gray-100 bg-gray-50 shrink-0 mb-safe">
                            <button onClick={handleAddToCart} className="w-full bg-amber-600 hover:bg-amber-700 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-md">
                                Tambahkan - {formatRupiah((customizingItem.price + (customOptions.size === "Large" ? 5000 : 0)) * customOptions.qty)}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            
            {isCheckoutOpen && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-neutral-900 rounded-t-3xl sm:rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col h-[95vh] sm:max-h-[90vh]">
                        
                        
                        <div className="p-4 sm:p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between shrink-0 bg-white dark:bg-neutral-900 relative z-10">
                            <h2 className="text-lg sm:text-xl font-black text-foreground">Selesaikan Pesanan</h2>
                            <button onClick={handleCloseCheckout} className="p-2 bg-gray-100 dark:bg-neutral-800 rounded-full hover:bg-gray-200 transition-colors text-xs font-bold">✕</button>
                        </div>

                        
                        <div className="overflow-y-auto flex-grow bg-gray-50/50 dark:bg-neutral-900/50">
                            {checkoutStatus === "success" ? (
                                
                                <div className="flex flex-col items-center text-center p-6 sm:p-8 min-h-full space-y-4 sm:space-y-6">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-foreground mb-1">Pesanan Berhasil!</h3>
                                        <p className="text-gray-500 text-sm">Harap tunjukkan layar ini atau sebutkan nomor antrian ke kasir.</p>
                                    </div>
                                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-6 w-full max-w-xs shadow-sm">
                                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Nomor Antrian Anda</p>
                                        <p className="text-5xl font-black text-amber-600 tracking-tighter mb-4">{queueNumber}</p>
                                        <div className="text-left border-t border-dashed border-gray-300 dark:border-neutral-600 pt-4 mt-4">
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-500">Nama</span>
                                                <span className="font-bold text-foreground">{checkoutForm.name}</span>
                                            </div>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span className="text-gray-500">Total Pembayaran</span>
                                                <span className="font-bold text-amber-600">{formatRupiah(finalPrice)}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500">Metode</span>
                                                <span className="font-bold uppercase text-foreground">{checkoutForm.payment}</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    
                                    <div className="mt-4 w-full max-w-xs text-left bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5">
                                        <p className="text-sm font-bold text-amber-800 dark:text-amber-500 mb-3">Selesaikan Pembayaran Anda:</p>
                                        {checkoutForm.payment === "qris" && (
                                            <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-white rounded-xl border border-gray-200 shadow-sm">
                                                <div className="w-32 h-32 bg-gray-100 flex items-center justify-center mb-3 border-2 border-dashed border-gray-300 rounded-lg">
                                                    <span className="text-xs text-gray-400 text-center font-bold">QR Barcode<br/>(Scan Disini)</span>
                                                </div>
                                                <p className="text-xs font-bold text-gray-800">A.N. Sasa Coffee</p>
                                            </div>
                                        )}
                                        {checkoutForm.payment === "bank" && (
                                            <div className="space-y-3">
                                                <div className="bg-white dark:bg-neutral-800 p-4 rounded-xl border border-gray-200 dark:border-neutral-700 shadow-sm">
                                                    <p className="text-xs text-gray-500 mb-1">Bank BCA</p>
                                                    <p className="font-black text-lg text-foreground tracking-widest mb-1">1234 5678 90</p>
                                                    <p className="text-xs font-semibold text-gray-500">A.N. Sasa Coffee</p>
                                                </div>
                                            </div>
                                        )}
                                        {checkoutForm.payment === "ewallet" && (
                                            <div className="space-y-3">
                                                <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-white rounded-xl border border-gray-200 shadow-sm">
                                                    <div className="w-24 h-24 bg-gray-100 flex items-center justify-center mb-3 border-2 border-dashed border-gray-300 rounded-lg">
                                                        <span className="text-[10px] text-gray-400 text-center font-bold">QR E-Wallet</span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 text-center font-semibold mb-2">- ATAU -</p>
                                                    <div className="w-full bg-gray-50 p-2 rounded-lg text-center">
                                                        <p className="text-[10px] text-gray-500 mb-0.5">Transfer No. Telp (GoPay/OVO/DANA)</p>
                                                        <p className="font-bold text-sm text-gray-800 tracking-wider">0812 3456 7890</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
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
                                        <button onClick={handleCloseCheckout} className="w-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-gray-700 dark:text-gray-300 font-bold py-3.5 rounded-xl text-sm transition-all shadow-sm">
                                            Selesai & Tutup
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    
                                    <div className="p-4 sm:p-6 pb-0">
                                        <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-sm border border-gray-200 dark:border-neutral-700 p-4 sm:p-5">
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
                                                    <button type="button" onClick={removeVoucher} className="text-xs font-bold text-red-500 hover:text-red-700">Hapus</button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex flex-col sm:flex-row gap-2">
                                                        <input 
                                                            type="text" 
                                                            value={voucherInput}
                                                            onChange={(e) => setVoucherInput(e.target.value)}
                                                            placeholder="Masukkan kode voucher" 
                                                            className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-4 py-3 sm:px-3 sm:py-2.5 text-sm uppercase focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" 
                                                        />
                                                        <button type="button" onClick={handleApplyVoucher} className="w-full sm:w-auto shrink-0 bg-gray-900 hover:bg-black dark:bg-white dark:hover:bg-gray-200 dark:text-black text-white px-4 py-3 sm:py-2.5 rounded-xl text-sm font-bold transition-colors">Terapkan</button>
                                                    </div>
                                                    {voucherMessage && <p className="text-xs text-red-500 mt-2">{voucherMessage}</p>}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    
                                    <form id="checkout-form" onSubmit={handleSubmitOrder} className="p-4 sm:p-6 space-y-6">
                                    
                                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-sm">
                                        <h3 className="text-sm font-bold text-foreground mb-4 border-b border-gray-100 dark:border-neutral-700 pb-3 flex justify-between">
                                            <span>Ringkasan Pesanan</span>
                                            <span className="text-amber-600">Nomor Antrian: {queueNumber}</span>
                                        </h3>
                                        <div className="space-y-4 max-h-[150px] overflow-y-auto pr-2 scrollbar-thin">
                                            {cart.map((c) => (
                                                <div key={c.cartItemId} className="flex justify-between items-start gap-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground line-clamp-1">{c.qty}x {c.product.name}</p>
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {c.size} 
                                                            {c.sugar ? `, ${c.sugar}` : ''} 
                                                            {c.ice ? `, ${c.ice}` : ''}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm font-bold text-foreground shrink-0">{formatRupiah(c.totalPrice)}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4">
                                        <h3 className="text-sm font-bold text-foreground mb-1">Data Pemesan</h3>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nama Lengkap</label>
                                            <input required type="text" value={checkoutForm.name} onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})} placeholder="Masukkan nama pemesan" className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Nomor Telepon / WhatsApp</label>
                                            <input required type="tel" value={checkoutForm.phone} onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})} placeholder="Contoh: 081234567890" className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                                        </div>
                                    </div>

                                    
                                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-sm space-y-3">
                                        <h3 className="text-sm font-bold text-foreground mb-1">Pilih Pembayaran</h3>
                                        <div className="grid grid-cols-1 gap-2.5">
                                            {[
                                                { id: "qris", title: "QRIS", desc: "Rekomendasi - Pindai kode QR" },
                                                { id: "bank", title: "Transfer Semua Bank", desc: "BCA, BNI, BRI, Mandiri, dll." },
                                                { id: "ewallet", title: "E-Wallet", desc: "DANA, OVO, GoPay, ShopeePay" },
                                            ].map((method) => (
                                                <label key={method.id} className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${checkoutForm.payment === method.id ? "border-amber-500 bg-amber-50/50 dark:bg-amber-900/20" : "border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700/50"}`}>
                                                    <input type="radio" name="payment" value={method.id} checked={checkoutForm.payment === method.id} onChange={(e) => setCheckoutForm({...checkoutForm, payment: e.target.value})} className="hidden" />
                                                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 shrink-0 ${checkoutForm.payment === method.id ? "border-amber-600" : "border-gray-300"}`}>
                                                        {checkoutForm.payment === method.id && <div className="w-2 h-2 rounded-full bg-amber-600" />}
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-foreground leading-none mb-1">{method.title}</p>
                                                        <p className="text-xs text-gray-500">{method.desc}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    
                                    <div className="bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl p-4 sm:p-5 shadow-sm">
                                        <label className="block text-sm font-bold text-foreground mb-2">Kebutuhan Lainnya <span className="text-gray-400 font-normal text-xs">(Opsional)</span></label>
                                        <textarea rows={2} value={checkoutForm.notes} onChange={(e) => setCheckoutForm({...checkoutForm, notes: e.target.value})} placeholder="Catatan tambahan untuk pesanan ini..." className="w-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-xl px-3 py-2.5 text-sm resize-none focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500" />
                                    </div>
                                    </form>
                                </>
                            )}
                        </div>

                        
                        {checkoutStatus !== "success" && (
                            <div className="p-4 sm:p-5 border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0 mb-safe">
                                <div className="flex justify-between items-center mb-1 px-1">
                                    <span className="text-sm font-medium text-gray-500">Subtotal</span>
                                    <span className="text-sm font-semibold text-foreground">{formatRupiah(totalCartPrice)}</span>
                                </div>
                                {voucher && (
                                    <div className="flex justify-between items-center mb-1 px-1">
                                        <span className="text-sm font-medium text-green-500">Diskon ({voucher.code})</span>
                                        <span className="text-sm font-bold text-green-500">- {formatRupiah(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center mb-3 px-1 border-t border-dashed border-gray-200 dark:border-neutral-700 pt-2 mt-2">
                                    <span className="text-sm font-bold text-foreground">Total Bayar</span>
                                    <span className="text-lg font-black text-amber-600">{formatRupiah(finalPrice)}</span>
                                </div>
                                <button 
                                    form="checkout-form"
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
                                        `Bayar Sekarang`
                                    )}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            
            {selectedImage && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-xl w-full bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedImage(null)} className="absolute top-3 right-3 z-10 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold">✕</button>
                        <div className="relative w-full aspect-[4/3] flex items-center justify-center text-neutral-400 text-xs text-center p-4">
                            [ Pratinjau Gambar Penuh: {selectedImage.name} ]
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}