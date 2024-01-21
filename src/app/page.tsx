import Image from 'next/image'
import heroImg from '@/assets/hero.svg'
import Link from 'next/link'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export default async function Home() {

  const session = await getServerSession(authOptions)

  console.log(session)

  return (
    <main className="flex items-center flex-col justify-center min-h-[calc(100vh-80px)]">
      <h2 className='font-medium text-2xl mb-2'> Gerencia sua empresa </h2> 
      <h1 className='font-bold text-3xl mb-8 text-blue-600 md:text-4xl'> Atendimentos, clientes </h1>
      <Image 
        src={heroImg}
        alt='Imagem hero do dev controle'
        width={600}
        className='max-w-sm lg:max-w-xs'
      />
      {session?.user &&
        <Link
          className="font-bold text-1xl mt-7 px-5 py-2 bg-blue-600 text-white rounded hover:scale-105 duration-300"
          href="/dashboard"
        >
          Começar agora
        </Link>
      }
    </main>
  )
}
