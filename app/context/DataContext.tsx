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
    paymentStatus?: "Belum Lunas" | "Lunas";
    createdAt: string;
}

export interface PaymentMethod {
    id: number;
    name: string;
    provider: string;
    account_details: string | null;
    instructions: string | null;
    is_active: boolean;
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
    addMenu: (menu: Menu) => Promise<void>;
    updateMenu: (id: number, menu: Partial<Menu>) => Promise<void>;
    deleteMenu: (id: number) => Promise<void>;

    pegawais: Pegawai[];
    setPegawais: (pegawais: Pegawai[]) => void;
    addPegawai: (p: Pegawai) => Promise<void>;
    updatePegawai: (id: string, p: Partial<Pegawai>) => Promise<void>;
    deletePegawai: (id: string) => Promise<void>;

    aboutUs: AboutUs;
    setAboutUs: (about: AboutUs) => void;

    vouchers: Voucher[];
    setVouchers: (v: Voucher[]) => void;
    addVoucher: (v: Voucher) => Promise<void>;
    updateVoucher: (id: string, v: Partial<Voucher>) => Promise<void>;
    deleteVoucher: (id: string) => Promise<void>;

    webSettings: WebSettings;
    setWebSettings: (settings: WebSettings) => Promise<void>;

    orders: Order[];
    setOrders: (orders: Order[]) => void;
    addOrder: (o: Order) => Promise<any>;
    updateOrderStatus: (id: string, status: Order["status"]) => Promise<void>;
    updatePaymentStatus: (id: string, status: "Belum Lunas" | "Lunas") => Promise<void>;
    deleteOrder: (id: string) => Promise<void>;

    contactMessages: ContactMessage[];
    setContactMessages: (msgs: ContactMessage[]) => void;
    addContactMessage: (msg: ContactMessage) => Promise<void>;
    deleteContactMessage: (id: string) => Promise<void>;
    
    categories: Category[];
    setCategories: (categories: Category[]) => void;

    paymentMethods: PaymentMethod[];
    setPaymentMethods: (methods: PaymentMethod[]) => void;
    addPaymentMethod: (method: Omit<PaymentMethod, "id">) => Promise<void>;
    updatePaymentMethod: (id: number, method: Partial<PaymentMethod>) => Promise<void>;
    deletePaymentMethod: (id: number) => Promise<void>;
    
    isLoaded: boolean;
}

const defaultAboutUs: AboutUs = {
    title: "Cerita Sasa Kopi",
    content: "Sasa Kopi bermula dari kecintaan kami terhadap kopi Nusantara. Kami menggabungkan suasana kuno yang menenangkan dengan fasilitas modern untuk memberikan pengalaman ngopi terbaik bagi Anda. Setiap biji kopi dipilih dengan seksama untuk menyajikan secangkir kebahagiaan di setiap tegukan."
};

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
    const [pegawais, setPegawaisState] = useState<Pegawai[]>([]);
    const [aboutUs, setAboutUsState] = useState<AboutUs>(defaultAboutUs);
    const [vouchers, setVouchersState] = useState<Voucher[]>([]);
    const [webSettings, setWebSettingsState] = useState<WebSettings>(defaultWebSettings);
    const [orders, setOrdersState] = useState<Order[]>([]);
    const [contactMessages, setContactMessagesState] = useState<ContactMessage[]>([]);
    const [categories, setCategoriesState] = useState<Category[]>([]);
    const [paymentMethods, setPaymentMethodsState] = useState<PaymentMethod[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [menusRes, pegawaisRes, vouchersRes, ordersRes, settingsRes, msgsRes, categoriesRes, paymentMethodsRes] = await Promise.all([
                    fetch('/api/menus').then(r => r.json()),
                    fetch('/api/pegawais').then(r => r.json()),
                    fetch('/api/vouchers').then(r => r.json()),
                    fetch('/api/orders').then(r => r.json()),
                    fetch('/api/settings').then(r => r.json()),
                    fetch('/api/messages').then(r => r.json()),
                    fetch('/api/categories').then(r => r.json()),
                    fetch('/api/payment-methods').then(r => r.json())
                ]);

                if (Array.isArray(menusRes)) setMenusState(menusRes);
                if (Array.isArray(pegawaisRes)) setPegawaisState(pegawaisRes);
                if (Array.isArray(vouchersRes)) setVouchersState(vouchersRes);
                if (Array.isArray(ordersRes)) setOrdersState(ordersRes);
                if (settingsRes && Object.keys(settingsRes).length > 0) setWebSettingsState(settingsRes);
                if (Array.isArray(msgsRes)) setContactMessagesState(msgsRes);
                if (Array.isArray(categoriesRes)) setCategoriesState(categoriesRes);
                if (Array.isArray(paymentMethodsRes)) setPaymentMethodsState(paymentMethodsRes);
            } catch (error) {
                console.error("Failed to fetch initial data:", error);
            } finally {
                setIsLoaded(true);
            }
        };

        fetchData();
    }, []);

    const addMenu = async (m: Menu) => {
        const res = await fetch('/api/menus', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(m)
        });
        if (res.ok) {
            const newMenu = await res.json();
            setMenusState(prev => [...prev, newMenu]);
        }
    };
    const updateMenu = async (id: number, m: Partial<Menu>) => {
        const res = await fetch(`/api/menus/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(m)
        });
        if (res.ok) {
            const updatedMenu = await res.json();
            setMenusState(prev => prev.map(item => item.id === id ? updatedMenu : item));
        }
    };
    const deleteMenu = async (id: number) => {
        const res = await fetch(`/api/menus/${id}`, { method: 'DELETE' });
        if (res.ok) setMenusState(prev => prev.filter(item => item.id !== id));
    };

    const addPegawai = async (p: Pegawai) => {
        const res = await fetch('/api/pegawais', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p)
        });
        if (res.ok) {
            const newPegawai = await res.json();
            setPegawaisState([...pegawais, newPegawai]);
        }
    };
    const updatePegawai = async (id: string, p: Partial<Pegawai>) => {
        const res = await fetch(`/api/pegawais/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(p)
        });
        if (res.ok) {
            const updatedPegawai = await res.json();
            setPegawaisState(pegawais.map(item => item.id === id ? updatedPegawai : item));
        }
    };
    const deletePegawai = async (id: string) => {
        const res = await fetch(`/api/pegawais/${id}`, { method: 'DELETE' });
        if (res.ok) setPegawaisState(pegawais.filter(item => item.id !== id));
    };

    const addVoucher = async (v: Voucher) => {
        const res = await fetch('/api/vouchers', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(v)
        });
        if (res.ok) {
            const newV = await res.json();
            setVouchersState([...vouchers, newV]);
        }
    };
    const updateVoucher = async (id: string, v: Partial<Voucher>) => {
        const res = await fetch(`/api/vouchers/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(v)
        });
        if (res.ok) {
            const updatedV = await res.json();
            setVouchersState(vouchers.map(item => item.id === id ? updatedV : item));
        }
    };
    const deleteVoucher = async (id: string) => {
        const res = await fetch(`/api/vouchers/${id}`, { method: 'DELETE' });
        if (res.ok) setVouchersState(vouchers.filter(item => item.id !== id));
    };

    const addOrder = async (o: Order) => {
        const res = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(o)
        });
        if (res.ok) {
            const newOrder = await res.json();
            setOrdersState([newOrder, ...orders]);
            return newOrder;
        }
        return null;
    };
    const updateOrderStatus = async (id: string, status: Order["status"]) => {
        const res = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status })
        });
        if (res.ok) {
            const updatedOrder = await res.json();
            setOrdersState(orders.map(item => item.id === id ? updatedOrder : item));
        }
    };
    const updatePaymentStatus = async (id: string, paymentStatus: "Belum Lunas" | "Lunas") => {
        const res = await fetch(`/api/orders/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paymentStatus })
        });
        if (res.ok) {
            const updatedOrder = await res.json();
            setOrdersState(orders.map(item => item.id === id ? updatedOrder : item));
        }
    };
    const deleteOrder = async (id: string) => {
        const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
        if (res.ok) {
            setOrdersState(orders.filter(item => item.id !== id));
        }
    };

    const setWebSettings = async (settings: WebSettings) => {
        const res = await fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(settings)
        });
        if (res.ok) {
            const updated = await res.json();
            setWebSettingsState(updated);
        }
    };

    const addContactMessage = async (msg: ContactMessage) => {
        const res = await fetch('/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(msg)
        });
        if (res.ok) {
            const newMsg = await res.json();
            setContactMessagesState([newMsg, ...contactMessages]);
        }
    };
    const deleteContactMessage = async (id: string) => {
        const res = await fetch(`/api/messages/${id}`, { method: 'DELETE' });
        if (res.ok) setContactMessagesState(contactMessages.filter(item => item.id !== id));
    };

    const addPaymentMethod = async (method: Omit<PaymentMethod, "id">) => {
        const res = await fetch('/api/payment-methods', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(method)
        });
        if (res.ok) {
            const newMethod = await res.json();
            setPaymentMethodsState([...paymentMethods, newMethod]);
        }
    };

    const updatePaymentMethod = async (id: number, method: Partial<PaymentMethod>) => {
        const res = await fetch(`/api/payment-methods/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(method)
        });
        if (res.ok) {
            const updatedMethod = await res.json();
            setPaymentMethodsState(paymentMethods.map(item => item.id === id ? updatedMethod : item));
        }
    };

    const deletePaymentMethod = async (id: number) => {
        const res = await fetch(`/api/payment-methods/${id}`, { method: 'DELETE' });
        if (res.ok) setPaymentMethodsState(paymentMethods.filter(item => item.id !== id));
    };

    return (
        <DataContext.Provider value={{
            menus, setMenus: setMenusState, addMenu, updateMenu, deleteMenu,
            pegawais, setPegawais: setPegawaisState, addPegawai, updatePegawai, deletePegawai,
            aboutUs, setAboutUs: setAboutUsState,
            vouchers, setVouchers: setVouchersState, addVoucher, updateVoucher, deleteVoucher,
            webSettings, setWebSettings,
            orders, setOrders: setOrdersState, addOrder, updateOrderStatus, updatePaymentStatus, deleteOrder,
            contactMessages, setContactMessages: setContactMessagesState, addContactMessage, deleteContactMessage,
            categories, setCategories: setCategoriesState,
            paymentMethods, setPaymentMethods: setPaymentMethodsState, addPaymentMethod, updatePaymentMethod, deletePaymentMethod,
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
