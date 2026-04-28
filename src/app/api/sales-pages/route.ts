import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const pages = await prisma.salesPage.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        productName: true,
        template: true,
        price: true,
        currency: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({ pages });
  } catch (error) {
    console.error("List pages error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
