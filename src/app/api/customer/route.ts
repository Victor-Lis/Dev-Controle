import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import prismaClient from '@/lib/prisma'

// create
export async function POST(request: Request){
    
    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({ error: "Not authotized" }, { status: 401 })
    }

    const { name, email, phone, address, userId } = await request.json()

    if(!name || !email || !phone || !userId){
        return NextResponse.json({ error: "Fail on create new curstomer" }, { status: 400 }) 
    }

    try{
        await prismaClient.customer.create({
            data: {
                name,
                email,
                phone,
                address: address ? address : "",
                userId,
            }
        })
        return NextResponse.json({message: "Cliente Cadastrado"}, { status: 200 })
    }catch(e){
        return NextResponse.json({ error: "Fail on create new curstomer" }, { status: 400 })
    }

}

export async function DELETE(request: Request){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        return NextResponse.json({ error: "Not authotized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("id")

    if(!userId){
        return NextResponse.json({ error: "Fail on delete curstomer" }, { status: 400 }) 
    }

    try {
        await prismaClient.customer.delete({
            where: {
                id: userId as string,
            }
        })
        return NextResponse.json({message: "Cliente deletado com sucesso!"}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: "Fail on delete curstomer" }, { status: 400 }) 
    }

}