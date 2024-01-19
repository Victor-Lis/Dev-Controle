import { Container } from '@/styled-components/container'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'

import { CardCustomer } from './components/card'

import prismaClient from '@/lib/prisma'

export default async function Customer() {
  const session = await getServerSession(authOptions)

  if (!session || !session.user) {
    redirect("/")
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  return (
    <Container>
      <main className='mt-8 mb-2'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Meus clientes</h1>
          <Link 
            href={"/dashboard/customer/new"}
            className='bg-blue-500 text-white px-4 py-1 rounded'
          >
            Novo Cliente
          </Link>
        </div>
      </main>

      <section className='grid grid-cols-1 sm:grid-cols-2 gap-2 my-2'>
        {customers?.map((customer) => {
          return <CardCustomer key={customer.id} customer={customer}/>
        })}
      </section>

    </Container>
  )
}