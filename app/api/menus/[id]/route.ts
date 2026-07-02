import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        const data = await request.json();

        let category_id = undefined;
        if (data.category) {
            let category = await prisma.categories.findFirst({
                where: { name: data.category }
            });
            if (!category) {
                category = await prisma.categories.create({
                    data: { name: data.category }
                });
            }
            category_id = category.id;
        }

        const product = await prisma.products.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.description !== undefined && { description: data.description }),
                ...(data.price !== undefined && { base_price: data.price }),
                ...(data.image !== undefined && { image_url: data.image }),
                ...(category_id !== undefined && { category_id }),
                ...(data.stock !== undefined && { is_available: data.stock === "Tersedia" })
            },
            include: { categories: true }
        });

        const updatedMenu = {
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: Number(product.base_price),
            image: product.image_url || "",
            category: product.categories?.name || "Uncategorized",
            stock: product.is_available ? "Tersedia" : "Habis",
        };

        return NextResponse.json(updatedMenu);
    } catch (error) {
        console.error("Error updating menu:", error);
        return NextResponse.json({ error: "Failed to update menu" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        await prisma.products.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting menu:", error);
        return NextResponse.json({ error: "Failed to delete menu" }, { status: 500 });
    }
}
