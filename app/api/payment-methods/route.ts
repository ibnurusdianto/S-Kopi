import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const methods = await prisma.payment_methods.findMany({
            orderBy: { created_at: 'asc' }
        });
        return NextResponse.json(methods);
    } catch (error) {
        console.error("Error fetching payment methods:", error);
        return NextResponse.json({ error: "Failed to fetch payment methods" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const newMethod = await prisma.payment_methods.create({
            data: {
                name: data.name,
                provider: data.provider,
                account_details: data.account_details || null,
                instructions: data.instructions || null,
                is_active: data.is_active !== undefined ? data.is_active : true
            }
        });
        return NextResponse.json(newMethod, { status: 201 });
    } catch (error) {
        console.error("Error creating payment method:", error);
        return NextResponse.json({ error: "Failed to create payment method" }, { status: 500 });
    }
}
