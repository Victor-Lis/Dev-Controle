export function CardCustomer(){
    return(
        <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2 hover:opacity-80 cursor-pointer duration-300">
            <h1>
                <strong>Nome: </strong>
                Mercado Silva
            </h1> 
            <p>
                <strong>Email: </strong>
                teste@teste.com
            </p>
            <p>
                <strong>Telefone: </strong>
                XX88XX-9424
            </p>           
            <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
                Delete    
            </button>       
        </article>
    )
}