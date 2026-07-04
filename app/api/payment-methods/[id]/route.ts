import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        const data = await request.json();

        const updatedMethod = await prisma.payment_methods.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.provider && { provider: data.provider }),
                ...(data.account_details !== undefined && { account_details: data.account_details }),
                ...(data.instructions !== undefined && { instructions: data.instructions }),
                ...(data.is_active !== undefined && { is_active: data.is_active })
            }
        });

        return NextResponse.json(updatedMethod);
    } catch (error) {
        console.error("Error updating payment method:", error);
        return NextResponse.json({ error: "Failed to update payment method" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        await prisma.payment_methods.delete({
            where: { id }
        });
        return NextResponse.json({ message: "Payment method deleted successfully" });
    } catch (error) {
        console.error("Error deleting payment method:", error);
        return NextResponse.json({ error: "Failed to delete payment method" }, { status: 500 });
    }
}
