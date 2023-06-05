import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt'
import { prisma } from '@/app/lib/prisma';
export async function POST(req: NextRequest) {
    try{
        const body = await req.json()
        const exists = await prisma.user.findFirst({where: {
            email: body.email,
        }})
        if(exists){
            const user = {
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

export async function PUT(req: NextRequest) {
    const body = await req.json()
    if(body.command === "add"){
        try{
        
            const exists = await prisma.user.update({where: {
                email: body.email,
            },
            data: {
                [body.to]: {
                    push: body.id
                }
            }
            })
            if(exists){
                const res = {
                    basket: exists.basket,
                    favourites: exists.favourites
                }
                return NextResponse.json(res)
            }else{
                return NextResponse.json(null)
            }
        }catch(err){
            return NextResponse.json(null)
        }
    }else{
        try{
            const exists = await prisma.user.findFirst({where: {
                email: body.email,
            }})
            const account = exists[body.to];
            const filtered = account.filter(element => element !== body.id)
            const updated = await prisma.user.update({where: {
                email: body.email,
            },
            data: {
                [body.to]: filtered
            }
            })
            if(updated){
                const res = {
                    basket: exists.basket,
                    favourites: exists.favourites
                }
                return NextResponse.json(res)
            }else{
                return NextResponse.json(null)
            }
        }catch(err){
            return NextResponse.json(null)
        }
    }
    
}