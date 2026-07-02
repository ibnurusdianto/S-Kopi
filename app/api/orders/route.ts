import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const dbOrders = await prisma.orders.findMany({
            include: {
                users_orders_user_idTousers: true,
                order_items: {
                    include: { products: true }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        const orders = dbOrders.map(o => ({
            id: o.id.toString(),
            customerName: o.users_orders_user_idTousers?.full_name || "Guest",
            phone: o.users_orders_user_idTousers?.username || "",
            items: o.order_items.map(oi => ({
                product_id: oi.product_id,
                name: oi.notes || oi.products.name,
                qty: oi.quantity,
                subtotal: Number(oi.subtotal)
            })),
            totalPrice: Number(o.total_amount),
            paymentMethod: "cash", 
            status: o.status === "pending" ? "Baru" : o.status === "processing" ? "Diproses" : o.status === "completed" ? "Selesai" : "Dibatalkan",
            createdAt: o.created_at.toISOString()
        }));

        return NextResponse.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();

        let role = await prisma.roles.findFirst({ where: { name: "customer" } });
        if (!role) role = await prisma.roles.create({ data: { name: "customer" } });

        let user = null;
        if (data.phone) {
            user = await prisma.users.findFirst({ where: { username: data.phone, role_id: role.id } });
            if (!user) {
                user = await prisma.users.create({
                    data: {
                        username: data.phone,
                        full_name: data.customerName || "Guest",
                        password_hash: "",
                        role_id: role.id
                    }
                });
            }
        }

        const newOrder = await prisma.orders.create({
            data: {
                order_number: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
                user_id: user?.id,
                total_amount: data.totalPrice,
                status: "pending",
                payment_status: "unpaid",
                order_items: {
                    create: data.items.map((item: any) => ({
                        product_id: item.product_id || 1, 
                        quantity: item.qty,
                        subtotal: item.subtotal || 0,
                        notes: item.name
                    }))
                }
            },
            include: {
                users_orders_user_idTousers: true,
                order_items: { include: { products: true } }
            }
        });

        const formattedOrder = {
            id: newOrder.id.toString(),
            customerName: newOrder.users_orders_user_idTousers?.full_name || "Guest",
            phone: newOrder.users_orders_user_idTousers?.username || "",
            items: newOrder.order_items.map(oi => ({
                product_id: oi.product_id,
                name: oi.notes || oi.products.name,
                qty: oi.quantity,
                subtotal: Number(oi.subtotal)
            })),
            totalPrice: Number(newOrder.total_amount),
            paymentMethod: data.paymentMethod || "cash",
            status: "Baru",
            createdAt: newOrder.created_at.toISOString()
        };

        return NextResponse.json(formattedOrder, { status: 201 });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
    }
}
