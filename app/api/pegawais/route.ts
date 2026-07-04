import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let role = await prisma.roles.findFirst({ where: { name: "pegawai" } });
        if (!role) {
            role = await prisma.roles.create({ data: { name: "pegawai" } });
        }

        const users = await prisma.users.findMany({
            where: { role_id: role.id }
        });

        const pegawais = users.map((u) => ({
            id: u.id.toString(),
            name: u.full_name,
            username: u.username,
            password: u.password_hash,
            status: "Aktif",
        }));

        return NextResponse.json(pegawais);
    } catch (error) {
        console.error("Error fetching pegawais:", error);
        return NextResponse.json({ error: "Failed to fetch pegawais" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        let role = await prisma.roles.findFirst({ where: { name: "pegawai" } });
        if (!role) {
            role = await prisma.roles.create({ data: { name: "pegawai" } });
        }

        const user = await prisma.users.create({
            data: {
                full_name: data.name,
                username: data.username,
                password_hash: data.password || "defaultpassword",
                role_id: role.id
            }
        });

        const newPegawai = {
            id: user.id.toString(),
            name: user.full_name,
            username: user.username,
            password: user.password_hash,
            status: "Aktif",
        };

        return NextResponse.json(newPegawai, { status: 201 });
    } catch (error) {
        console.error("Error creating pegawai:", error);
        return NextResponse.json({ error: "Failed to create pegawai" }, { status: 500 });
    }
}
