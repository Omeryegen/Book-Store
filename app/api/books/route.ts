import { prisma } from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {
    const allBooks = await prisma.book.findMany()
    return NextResponse.json(allBooks) 
}


export async function POST(req: NextRequest) {
    try {
        const body  = await req.json()
        const book = await prisma.book.create({data: body})
        if(book){
            return NextResponse.json(book)
        }else {
            return NextResponse.json(null)
        }
    }catch (err){
        return NextResponse.json(null)
    }
    
}

export async function PUT(req: NextRequest) {
    const body  = await req.json()
    if(body.delete){
        try{
        const book = await prisma.book.delete({
            where: {
              id: body.id,
            }})
        if(book){
            return NextResponse.json(book)
        }else {
            return NextResponse.json(null)
        }
    }catch (err){
        return NextResponse.json(null)
    }
    }else{
        try {
        
            const book = await prisma.book.update({
                where: {
                  id: body.id,
                },
                data: body,
              })
              
            if(book){
                return NextResponse.json(book)
            }else {
                return NextResponse.json(null)
            }
        }catch (err){
            return NextResponse.json(null)
        }
        
    }
    
}

