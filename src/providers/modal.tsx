"use client"
import { createContext, ReactNode, useState} from 'react'
import { TicketProps } from '@/@types/ticket'
import { CustomerProps } from '@/@types/customer'
import ModalTicket from '@/components/Modal';

interface ModalContextData{
    visible: boolean;
    handleModalVisible: () => void;
    ticket: TicketInfo | undefined;
    setDetailTicket: (detail: TicketInfo) => void;
}

interface TicketInfo{
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({children}: {children: ReactNode}) => {

    const [visible, setVisible] = useState(false)
    const [ticket, setTicket] = useState<TicketInfo>()

    function handleModalVisible(){
        setVisible(!visible)
    }

    function setDetailTicket(detail: TicketInfo){
        setTicket(detail)
    }

    return(
        <ModalContext.Provider value={{visible, handleModalVisible, ticket, setDetailTicket}}>
            {visible && <ModalTicket/>}
            {children}
        </ModalContext.Provider>
    )
}