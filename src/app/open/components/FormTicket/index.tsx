"use client";
import { Input } from "@/components/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const schema = z.object({
  name: z.string().min(1, "O nome do chamado é obrigatório"),
  description: z.string().min(1, "A descrição do chamado é obrigatória"),
});

type FormData = z.infer<typeof schema>;

export default function FormTicket() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <form className="bg-slate-200 mt-6 px-4 py-6 rounded border-2">
      <label className="mb-1 font-medium text-lg">Nome do chamado</label>
      <Input
        name="name"
        type="text"
        placeholder="Digite o nome do chamado..."
        error={errors.name?.message}
        register={register}
      />
      <label className="mb-1 font-medium text-lg">Descrição do chamado</label>
      <textarea
        className="w-full bordeer-2 rounded-md h-24 resize-y mb-2 px-2"
        placeholder="Descreva o seu problema..."
        id="description"
        {...register("description")}
      ></textarea>
      {errors.description?.message && (
        <p className="text-red-500 my-1">{errors.description?.message}</p>
      )}

      <button
        type="submit"
        className="bg-blue-500 rounded-md w-full h-11 px-2 text-white font-bold"
      >
        Cadastrar
      </button>
    </form>
  );
}
