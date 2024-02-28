"use client";

import { useState } from "react";
import BaseInvoiceEditor from "./baseInvoiceEditor";

export default function InvoiceCreator({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const [invoiceId, setInvoiceId] = useState<string>("");

    return <BaseInvoiceEditor invoiceId={invoiceId} setInvoiceId={setInvoiceId} invoiceType="customer" isNew={true} onClose={() => setIsOpen(false)} />
}
