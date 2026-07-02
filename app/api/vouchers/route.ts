import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const dbVouchers = await prisma.vouchers.findMany();
        const vouchers = dbVouchers.map(v => ({
            id: v.id.toString(),
            code: v.code,
            type: v.discount_type as "percent" | "fixed",
            value: Number(v.discount_amount),
            isActive: v.is_active
        }));
        return NextResponse.json(vouchers);
    } catch (error) {
        console.error("Error fetching vouchers:", error);
        return NextResponse.json({ error: "Failed to fetch vouchers" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const v = await prisma.vouchers.create({
            data: {
                code: data.code,
                discount_type: data.type,
                discount_amount: data.value,
                is_active: data.isActive
            }
        });
        const newVoucher = {
            id: v.id.toString(),
            code: v.code,
            type: v.discount_type as "percent" | "fixed",
            value: Number(v.discount_amount),
            isActive: v.is_active
        };
        return NextResponse.json(newVoucher, { status: 201 });
    } catch (error) {
        console.error("Error creating voucher:", error);
        return NextResponse.json({ error: "Failed to create voucher" }, { status: 500 });
    }
}
