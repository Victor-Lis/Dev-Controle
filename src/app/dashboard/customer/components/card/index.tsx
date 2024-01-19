

export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2">
      <h2>
        <a className="font-bold">Nome:</a> Mercado Silva
      </h2>
      <p><a className="font-bold">Email:</a> teste@teste.com</p>
      <p><a className="font-bold">Telefone:</a> XX9991019XX</p>

      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start hover:scale-105 duration-300">
        Deletar
      </button>
    </article>
  )
}