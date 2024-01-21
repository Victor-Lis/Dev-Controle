"use client";
import { FiCheckSquare, FiFile } from "react-icons/fi";
import { TicketProps } from "@/@types/ticket";
import { CustomerProps } from "@/@types/customer";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface TicketItemProps {
  ticket: TicketProps;
  customer: CustomerProps | null;
}

export function TicketItem({ ticket, customer }: TicketItemProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleChangeStatus() {
    if (!loading) {
      setLoading(true);
      try {
        const response = await api.patch("/api/ticket", {
          id: ticket.id,
        });

        router.refresh();
        console.log(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <tr className=
    {!loading 
      ? "border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300"
      : "border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-gray-200"
      }
    >
      <td className="text-left pl-1">{ticket?.name}</td>
      <td className="text-left hidden md:table-cell">
        {ticket.created_at?.toLocaleDateString("pt-br")}
      </td>
      <td className="text-left">
        <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
      </td>
      <td className="text-right">
        <button className="mr-2" onClick={handleChangeStatus}>
          <FiCheckSquare size={24} color="#131313" />
        </button>
        <button>
          <FiFile size={24} color="#3b82f6" />
        </button>
      </td>
    </tr>
  );
}
