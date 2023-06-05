import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: Request,{params,}: {params: { slug: string };},) {
    const slug = params.slug;
    const data = await prisma.book.findMany({where: {
        seller: slug
    }});
    return NextResponse.json(data) 
}
