import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        const data = await request.json();
        
        const v = await prisma.vouchers.update({
            where: { id },
            data: {
                ...(data.code && { code: data.code }),
                ...(data.type && { discount_type: data.type }),
                ...(data.value !== undefined && { discount_amount: data.value }),
                ...(data.isActive !== undefined && { is_active: data.isActive })
            }
        });

        const updatedVoucher = {
            id: v.id.toString(),
            code: v.code,
            type: v.discount_type as "percent" | "fixed",
            value: Number(v.discount_amount),
            isActive: v.is_active
        };
        return NextResponse.json(updatedVoucher);
    } catch (error) {
        console.error("Error updating voucher:", error);
        return NextResponse.json({ error: "Failed to update voucher" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        await prisma.vouchers.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting voucher:", error);
        return NextResponse.json({ error: "Failed to delete voucher" }, { status: 500 });
    }
}
