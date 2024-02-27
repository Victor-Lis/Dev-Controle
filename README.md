
# Dev Controle

O objetivo do projeto é criar uma plataforma para otimizar chamados para devs.

Esse é mais um projeto utilizando NextJS, TailwindCSS e Typescript. Além desses que venho usando bastante com NextJS, também estou trabalhando com Prisma Schema(um velho conhecido meu) e o Mongo DB Atlas, que já queria mexer há um tempo.

Embora já tenha mexido com Prisma Schema antes, é bem diferente trabalhar com Prisma Schema e Next JS. Em outros projetos eu costumo criar rotas para o Prisma utilizando Express e Node, para então requisitar a API em algum projeto. Porém com NextJS de certa forma esse processo todo ocorre diretamente dentro da aplicação.

Trabalhar com o Next me faz repensar sobre projetos que construi unicamente com React e que por conta disso tem muito menos recursos que uma aplicação em Next.

O que acaba me fazendo refletir sobre refatorar projetos antigos, agora em Next por conta de todas as vantagens proporcionadas.

## Techs
<div align="center">
  <img width="40" height="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="ReactJS">
  <img width="40" height="40" src="https://github.com/devicons/devicon/blob/master/icons/nextjs/nextjs-original-wordmark.svg" alt="NextJS">
  <img width="40" height="40x" src="https://github.com/devicons/devicon/blob/master/icons/prisma/prisma-original.svg" alt="Prisma">
  <img width="40" height="40x" src="https://github.com/devicons/devicon/blob/master/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind">
</div>

## Aprendizado
- Entender a arquitetura do Next;
- Trabalhar com TypeScript;
- Entender como trabalhar com CSR(Client Side Rendering) e SSR(Server Side Rendering);
- Entender melhor o Next-Auth;
- Entender sistema de login usando Next-Auth;
- Entender como trabalhar com autenticações mais complexas usando Next-Auth;
- Trabalhar com Prisma e Next-Auth;
- Entender e trabalhar com Server Actions;
- Entender e trabalhar com TailwindCSS.

## Uso/Exemplos

### Auth 

Abaixo detalho alguns trechos que careci de construir para trabalhar da maneira que gostaria com Prisma, Google Auth e Next-Auth.

#### Prisma
No trecho abaixo eu executo o prisma seguindo a documentação do Next-Auth para quando se é utilizado o Prisma Schema.
```js
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient;

if(process.env.NODE_ENV === "production"){
  prisma = new PrismaClient();
}else{
  let globalWithPrisma = global as typeof globalThis & {
    prisma: PrismaClient;
  }

  if(!globalWithPrisma.prisma){
    globalWithPrisma.prisma = new PrismaClient();
  }

  prisma = globalWithPrisma.prisma;

}

export default prisma;
```

#### Next-Auth Adapter
No trecho abaixo de código estou usando Next-Auth para fazer a conexão entre o GoogleProvider(Responsável pelo login com Google), Prisma e assim realizar a conexão.
```js
import { PrismaAdapter } from '@auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { AuthOptions } from 'next-auth'
import prismaClient from './prisma'

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    })
  ],
  callbacks: {
    async session({ session, token, user, }){
      session.user = { ...session.user, id: user.id } as {
        id: string,
        name: string;
        email: string;
      }
      return session;
    }
  }
}
```

### CSR e SSR

#### CSR
O Client Side Rendering se resume basicamente ao React como já conhecemos, sendo construido "do lado de lá".
Quando um componente é criado usando CSR, ele será carregado pelo cliente, podendo variar por exemplo por conta da internet do cliente.
Outra anotação interessante é que, como eu disse, trabalha da mesma maneira que o React que já conhecemos, sendo possível trabalhar com hooks sem problemas.
Para definir um componente "client" basta no topo do código declarar "use client".

Abaixo deixo uma demonstração de um componente trabalhando com CSR:
```js
"use client"

import { useRouter } from 'next/navigation'
import { FiRefreshCcw } from 'react-icons/fi'

export function ButtonRefresh() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.refresh()}
      className="bg-gray-900 px-4 py-1 rounded"
    >
      <FiRefreshCcw size={24} color="#FFF" />
    </button>
  )
}
```

#### SSR
O Server Side Rendering é bem diferente do React por padrão, sendo assim não é possível trabalhar com hooks.
Quando um componente é criado usando SSR, ele será carregado pelo servidor, sendo assim quando um usuário / cliente acessar a aplicação o componente já estará construído, sendo mais rápido para o carregamento da aplicação e inclusive influenciando no UX. 
Os componentes por padrão são construídos no SSR.
Um recurso bacana é que, é possível fazer por exemplo uma requisição HTTP no SSR, para quando o cliente acessar a aplicação não depende desse processo, pois já foi realizado no SSR.

Abaixo deixo uma demonstração de um componente trabalhando com CSR:
```js
import { Container } from "@/styled-components/container";
import Link from "next/link"

export function DashboardHeader() {
  return (
    <Container>
      <header className="w-full bg-gray-900 my-4 p-3 rounded flex gap-4 items-center">
        <Link href="/dashboard" className="text-white hover:font-bold duration-300">
          Chamados
        </Link>
        <Link href="/dashboard/customer" className="text-white hover:font-bold duration-300">
          Clientes
        </Link>
      </header>
    </Container>
  )
}
```

### Server Actions
Server Actions seguem a mesma lógica de componentes em SSR, é básicamente um função declarada como SSR, sendo assim ela trabalha no servidor, ao invés do Client Side.
Seguindo as lógicas anteriores, basta apenas declarar no topo da função "use server". 
Vale lembrar que funções trabalhando com Server Actions só podem ser usadas em componentes que estão no SSR, a não ser que, caso você esteja em um componente CSR, você importe ela de um arquivo externo no SSR, sendo assim é possível utilizar no Client Side.
Outro detalhe é não é possível declarar e alterar váriaveis dentro de uma função como essa.

Deixo abaixo um exemplo de função usando Server Actions. 
```js
  async function handleRegisterTicket(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) {
      return;
    }

    const newTicket = await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        userId: session?.user.id,
        status: "ABERTO",
      },
    });

    redirect("/dashboard");
  }
```

### TailwindCSS

Honestamente, entendo os fãs de Tailwind e de certa forma suas vantagens, mas ainda não entendo o porque de ser tão famoso, consigo pensar em pontos positivos, como:
- Algumas animações prontas; 
- Break-points de maneira mais fácil; 
- Algumas nomenclaturas mais curtas e fáceis, ao invés de border-bottom-background: (código hexadecimal), ser algo mais simples como: border-b-(cor);
- Acho que a principal para muitos, não precisar criar nome de classes.

Mas ainda me questiono bastante quanto a clareza do código, afinal inline-css não é algo considerado organizado ou limpo, porém uma biblioteca que faz essa exata mesma função é vista. Nesse fator talvez eu me acostume com o tempo. 

Deixo abaixo um trecho que de um componente trabalhando com Tailwind, inclusive alterando uma class de acordo com o estado de loading:
```js
    <tr className=
    {!loading 
      ? "border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 cursor-pointer duration-300"
      : "border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-gray-200"
      }
    >
      <td className="text-left pl-1">{ticket?.name}</td>
      <td className="text-left hidden md:table-cell">
        {ticket.updated_at?.toLocaleDateString("pt-br")}
      </td>
      <td className="text-left">
        <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
      </td>
      <td className="text-left">
        <button className="mr-3" onClick={handleChangeStatus}>
          <FiCheckSquare size={24} color="#131313" />
        </button>
        <button onClick={handleOpenModal}>
          <FiFile size={24} color="#3b82f6" />
        </button>
      </td>
    </tr>
```

## ScreenShots
Essa é a tela "Home" do projeto, sendo a primeira tela assim que alguém acessar a aplicação.
![Home](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/Home.png)

Essa é a tela "Sign In", sendo através dela realizado o login no projeto através do Google Auth.
![Sign-In](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/Sign-In.png)

A tela "Chamados" é a primeira tela a aparecer após o login, sendo nela exibidos os chamados do usuários
![Chamados](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/chamados-user.png)

Tela Novo Chamado, essa é a tela onde é possível criar um novo chamado
![Novo Chamado](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/criando-chamados-user.png)

A tela "Clientes" é a tela onde é possível ver os clientes do user cadastrados.
![Clientes](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/clientes-user.png)

Tela Novo Cliente, essa é a tela onde é possível cadastrar um novo cliente.
![Novo Cliente](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/criando-clientes-user.png)

Tela "Open", essa é a única tela tirando a "Home" onde é possível acessar sem fazer login, nessa tela é possível um cliente criar um chamado para si próprio.
![Fase 1](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/open-1.png)
![Fase 2](https://github.com/Victor-Lis/Dev-Controle/blob/master/project-images/open-2.png)

## Conclusão 
Ao final desse projeto consigo entender melhor o porque de NextJS ser tão utilizado, sem dúvidas é um Framework muito poderoso, arrisco a dizer que é o Framework de React mais potente. 


Isso me pensar sobre projetos antigos trabalhando unicamente com o React "puro" e pensar em refatora-lós, como o Study-Plus, projeto que me senti muito satisfeito ao terminar, pois as funcionalidades são muito bacanas, mas por conta de utilizar apenas React, necessitei dividir em 2 partes, [Front-End](https://github.com/Victor-Lis/StudyPlus-Front-End) e [Back-End](https://github.com/Victor-Lis/StudyPlus-Back-End). 


Necessidade essa que utilizando NextJS não existiria, o que olhando do ponto de vista atual, me faz pensar afinal que [Study-Plus](https://github.com/Victor-Lis/StudyPlus-Front-End) não é um projeto "tão bacana assim".


## Fonte
Esse projeto é proveniente do curso [NextJS do zero ao avançado na pratica 2023](https://www.udemy.com/share/104Wus3@JVcovy9zHCiYz6N56LKCINtctiJ3N9527dbnZ8Dmy3kCjUqO9SrXBWiThy8weOHPcA==/) do Sujeito Programador. 

## Autores
- [@Victor-Lis](https://github.com/Victor-Lis)
