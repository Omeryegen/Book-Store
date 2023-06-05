import { NextResponse, NextRequest } from 'next/server';
import bcrypt from 'bcrypt'
import { prisma } from '@/app/lib/prisma';
import { v4 as uuidv4 } from 'uuid';
export async function POST(req: NextRequest) {
    try{
        const body = await req.json()
        console.log(body)
        const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(body.password, salt)
        body.password = hashedPassword
        const {password, ...user} = await prisma.user.create({data: {...body, id: uuidv4(), favourites: [], basket: []}})
        if(user){
            return NextResponse.json(user)
        }else {
            return NextResponse.json(null)
        } 
    }catch(err){
        return NextResponse.json(null)
    }
}