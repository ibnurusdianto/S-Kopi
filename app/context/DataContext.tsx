"use client";

import { createContext, useContext, useState, useEffect } from "react";

export interface Menu {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: "Tersedia" | "Habis";
}

export interface Pegawai {
    id: string;
    name: string;
    username: string;
    password?: string;
    status: "Aktif" | "Nonaktif";
}

export interface AboutUs {
    title: string;
    content: string;
}

export interface Voucher {
    id: string;
    code: string;
    type: "percent" | "fixed";
    value: number;
    isActive: boolean;
}

export interface WebSettings {
    headerLogoText: string;
    footerText: string;
    address: string;
    phone: string;
    email: string;
    socialLinks: { instagram: string; facebook: string; };
}

export interface Order {
    id: string;
    customerName: string;
    phone: string;
    items: any[];
    totalPrice: number;
    paymentMethod: string;
    status: "Baru" | "Diproses" | "Selesai" | "Dibatalkan";
    createdAt: string;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
}

interface DataContextType {
    menus: Menu[];
    setMenus: (menus: Menu[]) => void;
    addMenu: (menu: Menu) => void;
    updateMenu: (id: number, menu: Partial<Menu>) => void;
    deleteMenu: (id: number) => void;

    pegawais: Pegawai[];
    setPegawais: (pegawais: Pegawai[]) => void;
    addPegawai: (p: Pegawai) => void;
    updatePegawai: (id: string, p: Partial<Pegawai>) => void;
    deletePegawai: (id: string) => void;

    aboutUs: AboutUs;
    setAboutUs: (about: AboutUs) => void;

    vouchers: Voucher[];
    setVouchers: (v: Voucher[]) => void;
    addVoucher: (v: Voucher) => void;
    updateVoucher: (id: string, v: Partial<Voucher>) => void;
    deleteVoucher: (id: string) => void;

    webSettings: WebSettings;
    setWebSettings: (settings: WebSettings) => void;

    orders: Order[];
    setOrders: (orders: Order[]) => void;
    addOrder: (order: Order) => void;
    updateOrderStatus: (id: string, status: Order["status"]) => void;

    contactMessages: ContactMessage[];
    setContactMessages: (msgs: ContactMessage[]) => void;
    addContactMessage: (msg: ContactMessage) => void;
    deleteContactMessage: (id: string) => void;
    
    isLoaded: boolean;
}

const defaultMenus: Menu[] = [
    { id: 1, name: "Kopi Hitam", description: "Kopi tubruk murni dari biji kopi pilihan nusantara dengan aroma yang kuat.", price: 15000, image: "https://images.unsplash.com/photo-1550133730-695473e544be?q=80&w=500&auto=format&fit=crop", category: "Kopi", stock: "Tersedia" },
    { id: 2, name: "Kopi Susu Gula Aren", description: "Perpaduan espresso, susu segar, dan manisnya gula aren alami.", price: 22000, image: "https://images.unsplash.com/photo-1599321955726-e048426594af?q=80&w=500&auto=format&fit=crop", category: "Kopi", stock: "Tersedia" },
    { id: 3, name: "Cappuccino", description: "Espresso klasik dengan busa susu tebal dan taburan bubuk cokelat.", price: 25000, image: "https://images.unsplash.com/photo-1517701550927-30cfcb64d4b2?q=80&w=500&auto=format&fit=crop", category: "Kopi", stock: "Tersedia" },
    { id: 4, name: "Cafe Latte", description: "Lebih banyak susu daripada cappuccino, sangat lembut di lidah.", price: 25000, image: "https://images.unsplash.com/photo-1551830820-330a71b99659?q=80&w=500&auto=format&fit=crop", category: "Kopi", stock: "Tersedia" },
    { id: 5, name: "Vanilla Latte", description: "Latte lembut dengan sirup vanilla berkualitas tinggi.", price: 28000, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=500&auto=format&fit=crop", category: "Kopi", stock: "Tersedia" },
    { id: 6, name: "Caramel Macchiato", description: "Espresso, sirup vanilla, susu, dan saus karamel di atasnya.", price: 30000, image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=500&auto=format&fit=crop", category: "Kopi", stock: "Tersedia" },
    { id: 7, name: "Es Teh Manis", description: "Teh melati seduh segar dengan gula pasir asli.", price: 10000, image: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?q=80&w=500&auto=format&fit=crop", category: "Non-Kopi", stock: "Tersedia" },
    { id: 8, name: "Lemon Tea", description: "Teh segar dengan perasan jeruk lemon asli yang menyegarkan.", price: 15000, image: "https://images.unsplash.com/photo-1627490450550-98319fdb1df3?q=80&w=500&auto=format&fit=crop", category: "Non-Kopi", stock: "Tersedia" },
    { id: 9, name: "Matcha Latte", description: "Bubuk matcha premium Jepang dipadukan dengan susu segar.", price: 28000, image: "https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=500&auto=format&fit=crop", category: "Non-Kopi", stock: "Tersedia" },
    { id: 10, name: "Chocolate Ice", description: "Cokelat pekat pilihan yang disajikan dingin memanjakan lidah.", price: 25000, image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=500&auto=format&fit=crop", category: "Non-Kopi", stock: "Tersedia" },
    { id: 11, name: "Kentang Goreng", description: "Kentang goreng renyah dengan taburan bumbu gurih rahasia.", price: 18000, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?q=80&w=500&auto=format&fit=crop", category: "Cemilan", stock: "Tersedia" },
    { id: 12, name: "Pisang Goreng Keju", description: "Pisang kepok manis digoreng krispi dengan parutan keju melimpah.", price: 20000, image: "https://images.unsplash.com/photo-1605050965319-3543d463b218?q=80&w=500&auto=format&fit=crop", category: "Cemilan", stock: "Tersedia" },
];

const defaultPegawais: Pegawai[] = [
    { id: "p1", name: "Pegawai 1", username: "pegawai", password: "pegawai", status: "Aktif" }
];

const defaultAboutUs: AboutUs = {
    title: "Cerita Sasa Kopi",
    content: "Sasa Kopi bermula dari kecintaan kami terhadap kopi Nusantara. Kami menggabungkan suasana kuno yang menenangkan dengan fasilitas modern untuk memberikan pengalaman ngopi terbaik bagi Anda. Setiap biji kopi dipilih dengan seksama untuk menyajikan secangkir kebahagiaan di setiap tegukan."
};

const defaultVouchers: Voucher[] = [
    { id: "v1", code: "SASA50", type: "percent", value: 50, isActive: true },
    { id: "v2", code: "KOPI100", type: "fixed", value: 10000, isActive: true },
];

const defaultWebSettings: WebSettings = {
    headerLogoText: "Sasa Kopi",
    footerText: "2026 Sasa Kopi. All rights reserved.",
    address: "Jl. Kopi Harum No.12, Jakarta",
    phone: "+62 812-3456-7890",
    email: "halo@sasakopi.com",
    socialLinks: { instagram: "@sasakopi", facebook: "Sasa Kopi" }
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: React.ReactNode }) {
    const [menus, setMenusState] = useState<Menu[]>([]);
    const [pegawais, setPegawaisState] = useState<Pegawai[]>(defaultPegawais);
    const [aboutUs, setAboutUsState] = useState<AboutUs>(defaultAboutUs);
    const [vouchers, setVouchersState] = useState<Voucher[]>([]);
    const [webSettings, setWebSettingsState] = useState<WebSettings>(defaultWebSettings);
    const [orders, setOrdersState] = useState<Order[]>([]);
    const [contactMessages, setContactMessagesState] = useState<ContactMessage[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        
        const storedMenus = localStorage.getItem("data_menus");
        setMenusState(storedMenus ? JSON.parse(storedMenus) : defaultMenus);

        const storedPegawais = localStorage.getItem("data_pegawais");
        setPegawaisState(storedPegawais ? JSON.parse(storedPegawais) : defaultPegawais);

        const storedAbout = localStorage.getItem("data_aboutUs");
        setAboutUsState(storedAbout ? JSON.parse(storedAbout) : defaultAboutUs);

        const storedVouchers = localStorage.getItem("data_vouchers");
        setVouchersState(storedVouchers ? JSON.parse(storedVouchers) : defaultVouchers);

        const storedWebSettings = localStorage.getItem("data_webSettings");
        setWebSettingsState(storedWebSettings ? JSON.parse(storedWebSettings) : defaultWebSettings);

        const storedOrders = localStorage.getItem("data_orders");
        setOrdersState(storedOrders ? JSON.parse(storedOrders) : []);

        const storedMessages = localStorage.getItem("data_contactMessages");
        setContactMessagesState(storedMessages ? JSON.parse(storedMessages) : []);

        setIsLoaded(true);
    }, []);

    
    const setMenus = (newMenus: Menu[]) => { setMenusState(newMenus); localStorage.setItem("data_menus", JSON.stringify(newMenus)); };
    const setPegawais = (newPegawais: Pegawai[]) => { setPegawaisState(newPegawais); localStorage.setItem("data_pegawais", JSON.stringify(newPegawais)); };
    const setAboutUs = (newAbout: AboutUs) => { setAboutUsState(newAbout); localStorage.setItem("data_aboutUs", JSON.stringify(newAbout)); };
    const setVouchers = (newVouchers: Voucher[]) => { setVouchersState(newVouchers); localStorage.setItem("data_vouchers", JSON.stringify(newVouchers)); };
    const setWebSettings = (newSettings: WebSettings) => { setWebSettingsState(newSettings); localStorage.setItem("data_webSettings", JSON.stringify(newSettings)); };
    const setOrders = (newOrders: Order[]) => { setOrdersState(newOrders); localStorage.setItem("data_orders", JSON.stringify(newOrders)); };
    const setContactMessages = (newMsgs: ContactMessage[]) => { setContactMessagesState(newMsgs); localStorage.setItem("data_contactMessages", JSON.stringify(newMsgs)); };

    
    const addMenu = (m: Menu) => setMenus([...menus, m]);
    const updateMenu = (id: number, m: Partial<Menu>) => setMenus(menus.map(item => item.id === id ? { ...item, ...m } : item));
    const deleteMenu = (id: number) => setMenus(menus.filter(item => item.id !== id));

    const addPegawai = (p: Pegawai) => setPegawais([...pegawais, p]);
    const updatePegawai = (id: string, p: Partial<Pegawai>) => setPegawais(pegawais.map(item => item.id === id ? { ...item, ...p } : item));
    const deletePegawai = (id: string) => setPegawais(pegawais.filter(item => item.id !== id));

    const addVoucher = (v: Voucher) => setVouchers([...vouchers, v]);
    const updateVoucher = (id: string, v: Partial<Voucher>) => setVouchers(vouchers.map(item => item.id === id ? { ...item, ...v } : item));
    const deleteVoucher = (id: string) => setVouchers(vouchers.filter(item => item.id !== id));

    const addOrder = (o: Order) => setOrders([o, ...orders]); 
    const updateOrderStatus = (id: string, status: Order["status"]) => setOrders(orders.map(item => item.id === id ? { ...item, status } : item));

    const addContactMessage = (msg: ContactMessage) => setContactMessages([msg, ...contactMessages]);
    const deleteContactMessage = (id: string) => setContactMessages(contactMessages.filter(item => item.id !== id));

    return (
        <DataContext.Provider value={{
            menus, setMenus, addMenu, updateMenu, deleteMenu,
            pegawais, setPegawais, addPegawai, updatePegawai, deletePegawai,
            aboutUs, setAboutUs,
            vouchers, setVouchers, addVoucher, updateVoucher, deleteVoucher,
            webSettings, setWebSettings,
            orders, setOrders, addOrder, updateOrderStatus,
            contactMessages, setContactMessages, addContactMessage, deleteContactMessage,
            isLoaded
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
