export interface TicketProps{
    id: string;
    name: string;
    status: string;
    description: string;
    created_at: Date | null;
    updated_at: Date | null;
    customerId: string | null;
    userId: string | null;
}