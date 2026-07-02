import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const msgs = await prisma.customer_messages.findMany();
        const contactMessages = msgs.map(m => ({
            id: m.id.toString(),
            name: m.name,
            email: m.email,
            message: m.message,
            createdAt: m.created_at.toISOString()
        }));
        return NextResponse.json(contactMessages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const m = await prisma.customer_messages.create({
            data: {
                name: data.name,
                email: data.email,
                message: data.message,
                subject: "Contact Message"
            }
        });
        const newMsg = {
            id: m.id.toString(),
            name: m.name,
            email: m.email,
            message: m.message,
            createdAt: m.created_at.toISOString()
        };
        return NextResponse.json(newMsg, { status: 201 });
    } catch (error) {
        console.error("Error creating message:", error);
        return NextResponse.json({ error: "Failed to create message" }, { status: 500 });
    }
}
