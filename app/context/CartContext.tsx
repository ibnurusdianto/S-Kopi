"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { useData } from "./DataContext";

type Voucher = { code: string; type: "percent" | "fixed"; value: number } | null;

type CartContextType = {
    cart: any[];
    setCart: React.Dispatch<React.SetStateAction<any[]>>;
    voucher: Voucher;
    applyVoucher: (code: string) => boolean;
    removeVoucher: () => void;
    discountAmount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const { vouchers } = useData();
    const [cart, setCart] = useState<any[]>([]);
    const [voucher, setVoucher] = useState<Voucher>(null);

    const applyVoucher = (code: string) => {
        const upperCode = code.trim().toUpperCase();
        const found = vouchers.find(v => v.code === upperCode && v.isActive);
        
        if (found) {
            setVoucher({ code: found.code, type: found.type, value: found.value });
            return true;
        }
        return false;
    };

    const removeVoucher = () => {
        setVoucher(null);
    };

    const totalCartPrice = cart.reduce((acc, curr) => acc + curr.totalPrice, 0);
    
    let discountAmount = 0;
    if (voucher) {
        if (voucher.type === "percent") {
            discountAmount = (totalCartPrice * voucher.value) / 100;
        } else if (voucher.type === "fixed") {
            discountAmount = Math.min(voucher.value, totalCartPrice);
        }
    }

    return (
        <CartContext.Provider value={{ cart, setCart, voucher, applyVoucher, removeVoucher, discountAmount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
