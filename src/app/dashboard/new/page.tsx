import { Container } from "@/styled-components/container";
import Link from "next/link";

export default function NewTicket() {
  return (
    <Container>
      <main className="mt-9 mb-2">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-white px-4 py-1 rounded bg-gray-900"
          >
            Voltar
          </Link>
          <h1 className="text-3xl font-bold"> </h1>
        </div>

        <form>
            <label className="mb-1 font-medium text-lg">Nome do chamado</label>
            <input
                type="text"
                required
            />
        </form>

      </main>
    </Container>
  );
}
