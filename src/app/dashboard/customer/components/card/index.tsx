"use client";

import { CustomerProps } from "@/@types/customer";
import { api } from "@/lib/api";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

export function CardCustomer({ customer }: { customer: CustomerProps }) {
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  async function handleDeleteCustomer() {
    setLoading(true)
    try {
      const response = await api.delete(`/api/customer`, {
        params: {
          id: customer.id,
        },
      });

      route.refresh();
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
    }
  }

  return (
    <article className="flex flex-col bg-gray-100 border-2 p-2 rounded-lg gap-2">
      <h2>
        <a className="font-bold">Nome:</a> {customer.name}
      </h2>
      <p>
        <a className="font-bold">Email:</a> {customer.email}
      </p>
      <p>
        <a className="font-bold">Telefone:</a> {customer.phone}
      </p>

      {!loading && (
        <button
          className="bg-red-500 px-4 rounded text-white mt-2 self-start hover:scale-105 duration-300"
          onClick={handleDeleteCustomer}
        >
          Deletar
        </button>
      )}

      {loading && (
        <button
          disabled={true}
          className="bg-gray-500 py-1 px-8 rounded text-white mt-2 self-start flex items-center justify-center cursor-not-allowed"
        >
          <FiLoader className="animate-spin" size={16} color="#b90000" />
        </button>
      )}
    </article>
  );
}
