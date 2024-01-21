import { FiTrash2, FiFile } from "react-icons/fi";
import { TicketProps } from "@/@types/ticket";
import { CustomerProps } from "@/@types/customer";

interface TicketItemProps{
  ticket: TicketProps,
  customer: CustomerProps | null,
}

export function TicketItem({ticket, customer}: TicketItemProps) {
  return (
    <tr className="border-b-2 border-b-slate-200 h-16 last:border-b-0 bg-slate-100 hover:bg-gray-200 duration-300">
      <td className="text-left pl-1">{ticket?.name}</td>
      <td className="text-left hidden md:table-cell">{ticket.created_at?.toLocaleDateString("pt-br")}</td>
      <td className="text-left">
        <span className="bg-green-500 px-2 py-1 rounded">{ticket.status}</span>
      </td>
      <td className="text-right">
        <button className="mr-2">
          <FiTrash2 size={24} color="#EF4444" />
        </button>
        <button>
          <FiFile size={24} color="#3b82f6" />
        </button>
      </td>
    </tr>
  );
}
