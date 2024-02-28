"use client";

import BaseInvoiceEditor from "./baseInvoiceEditor";

export default function InvoiceEditor({ invoiceId, setInvoiceId, isOpen, setIsOpen, isSupplier }: { invoiceId: string, setInvoiceId: (e: string) => void, isOpen: boolean, setIsOpen: (isOpen: boolean) => void, isSupplier?: boolean }) {
    // START    
    const retrieveInvoiceData = (id: string) => {
        return {
            invoiceId: invoiceId,
            customer: {
                id: "",
                name: "",
                address: "",
                email: "",
                phone: ""
            },
            items: [],
            invoiceDate: null,
            dueDate: null,
            vat: 0
        }
    }
    // END

    return <BaseInvoiceEditor
        invoiceId={invoiceId}
        setInvoiceId={setInvoiceId}
        invoiceType="customer"
        isNew={false}
        onClose={() => setIsOpen(false)}
        isSupplier={isSupplier}
    />
}
