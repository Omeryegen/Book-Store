import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt'
import { prisma } from '@/app/lib/prisma';
export async function POST(req: NextRequest) {
    try{
        const body = await req.json()
        const exists = await prisma.user.findFirst({where: {
            email: body.email,
        }})
        const checkPassword = await bcrypt.compare(body.password, exists!.password)
        if(exists && checkPassword){
            const user = {
                name: exists.name,
                image: exists.image,
                id: exists.id,
                email: exists.email,
                basket: exists.basket,
                favourites: exists.favourites
            }
            return NextResponse.json(user)
        }else{
            return NextResponse.json(null)
        }
    }catch(err){
        return NextResponse.json(null)
    }
}