import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        const data = await request.json();
        
        const mappedStatus = data.status === "Baru" ? "pending" : data.status === "Diproses" ? "processing" : data.status === "Selesai" ? "completed" : "cancelled";

        const order = await prisma.orders.update({
            where: { id },
            data: {
                ...(data.status && { status: mappedStatus })
            },
            include: {
                users_orders_user_idTousers: true,
                order_items: { include: { products: true } }
            }
        });

        const formattedOrder = {
            id: order.id.toString(),
            customerName: order.users_orders_user_idTousers?.full_name || "Guest",
            phone: order.users_orders_user_idTousers?.username || "",
            items: order.order_items.map(oi => ({
                product_id: oi.product_id,
                name: oi.notes || oi.products.name,
                qty: oi.quantity,
                subtotal: Number(oi.subtotal)
            })),
            totalPrice: Number(order.total_amount),
            paymentMethod: "cash",
            status: order.status === "pending" ? "Baru" : order.status === "processing" ? "Diproses" : order.status === "completed" ? "Selesai" : "Dibatalkan",
            createdAt: order.created_at.toISOString()
        };

        return NextResponse.json(formattedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
    }
}
