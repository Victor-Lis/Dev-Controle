"use client";

import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";

import { FiSearch, FiX } from "react-icons/fi";
import FormTicket from "./components/FormTicket";

const schema = z.object({
  email: z
    .string()
    .email("Digite o email do cliente para localizar.")
    .min(1, "O campo email é obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface CustomerDataInfo {
  id: string;
  name: string;
}

export default function OpenTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

  function handleClearCustomer(){
    setCustomer(null)
    setValue("email", "")
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-2">
      <h1 className="font-bold text-3xl text-center mt-24">Abrir Chamado</h1>

      <main className="flex flex-col mt-4 mb-2">
        {customer ? (
          <div className="bg-slate-200 py-6 px-4 rounded border-2 flex items-center justify-between">
            <p><strong>Cliente Selecionado:</strong> {customer.name}</p>
            <button className="h-11 px-2 flex items-center justify-center rounded" onClick={handleClearCustomer}>
                <FiX size={30} color="#ff0000"/>
            </button>
          </div>
        ) : (
          <form className="bg-slate-200 py-6 px-2 rounded border-2">
            <div className="flex flex-col gap-3">
              <Input
                name="email"
                type="text"
                placeholder="Digite o email do cliente..."
                error={errors.email?.message}
                register={register}
              />

              <button className="bg-blue-500 flex flex-row gap-3 h-11 items-center justify-center text-white font-bold rounded hover:opacity-80 duration-300">
                Procurar cliente
                <FiSearch size={24} color="#fff" />
              </button>
            </div>
          </form>
        )}

        {customer !== null && <FormTicket/>}

      </main>
    </div>
  );
}
