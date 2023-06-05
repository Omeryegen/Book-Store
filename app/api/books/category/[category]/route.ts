import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: Request,{params,}: {params: { category: string };},) {
    const category = params.category;
    const data = await prisma.book.findMany({where: {
        category: category
    }});
    return NextResponse.json(data) 
}
