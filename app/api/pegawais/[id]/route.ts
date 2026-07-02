import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        const data = await request.json();

        const user = await prisma.users.update({
            where: { id },
            data: {
                ...(data.name && { full_name: data.name }),
                ...(data.username && { username: data.username }),
                ...(data.password && { password_hash: data.password })
            }
        });

        const updatedPegawai = {
            id: user.id.toString(),
            name: user.full_name,
            username: user.username,
            status: "Aktif",
        };

        return NextResponse.json(updatedPegawai);
    } catch (error) {
        console.error("Error updating pegawai:", error);
        return NextResponse.json({ error: "Failed to update pegawai" }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const id = parseInt((await params).id);
        await prisma.users.delete({
            where: { id }
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting pegawai:", error);
        return NextResponse.json({ error: "Failed to delete pegawai" }, { status: 500 });
    }
}
