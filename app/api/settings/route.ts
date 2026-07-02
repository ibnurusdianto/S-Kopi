import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const setting = await prisma.web_settings.findUnique({
            where: { key_name: "global_settings" }
        });

        if (setting) {
            return NextResponse.json(JSON.parse(setting.value));
        } else {
            return NextResponse.json({});
        }
    } catch (error) {
        console.error("Error fetching web settings:", error);
        return NextResponse.json({ error: "Failed to fetch web settings" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        const valueStr = JSON.stringify(data);

        await prisma.web_settings.upsert({
            where: { key_name: "global_settings" },
            update: { value: valueStr },
            create: { key_name: "global_settings", value: valueStr }
        });

        return NextResponse.json(data);
    } catch (error) {
        console.error("Error updating web settings:", error);
        return NextResponse.json({ error: "Failed to update web settings" }, { status: 500 });
    }
}
