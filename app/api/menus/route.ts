import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const products = await prisma.products.findMany({
            include: { categories: true },
        });

        const menus = products.map((p) => ({
            id: p.id,
            name: p.name,
            description: p.description || "",
            price: Number(p.base_price),
            image: p.image_url || "",
            category: p.categories?.name || "Uncategorized",
            stock: p.is_available ? "Tersedia" : "Habis",
        }));

        return NextResponse.json(menus);
    } catch (error) {
        console.error("Error fetching menus:", error);
        return NextResponse.json({ error: "Failed to fetch menus" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        let category = await prisma.categories.findFirst({
            where: { name: data.category }
        });

        if (!category) {
            category = await prisma.categories.create({
                data: { name: data.category }
            });
        }

        const product = await prisma.products.create({
            data: {
                name: data.name,
                description: data.description,
                base_price: data.price,
                image_url: data.image,
                category_id: category.id,
                is_available: data.stock === "Tersedia",
                stock: 99, 
            },
            include: { categories: true }
        });

        const newMenu = {
            id: product.id,
            name: product.name,
            description: product.description || "",
            price: Number(product.base_price),
            image: product.image_url || "",
            category: product.categories?.name || "Uncategorized",
            stock: product.is_available ? "Tersedia" : "Habis",
        };

        return NextResponse.json(newMenu, { status: 201 });
    } catch (error) {
        console.error("Error creating menu:", error);
        return NextResponse.json({ error: "Failed to create menu" }, { status: 500 });
    }
}
