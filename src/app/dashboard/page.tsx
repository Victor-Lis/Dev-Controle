import { Container } from "@/styled-components/container";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation";

export default async function Dashboard(){

    const session = await getServerSession(authOptions)

    if(!session || !session.user){
        redirect("/")
    }

    return ( 
        <Container>
            <h1> DASHBOARD </h1>
        </Container>
    )
}