import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "../../invoices/filteredInvoiceTable";
import { getColumns } from "./tables";
import InvoiceEditor from "../../components/invoiceEditors/editInvoice";
import { Entity, InvoiceData } from "../../types";
import { downloadInvoice } from "../../functions/downloadInvoice";
import InvoiceView from "../../components/invoiceEditors/invoiceView";
import { useStateCallback } from "../../hooks";
import { Button } from "../../components/ui/button";

export function CustomerInvoiceTable({ customer }: { customer: Entity }) {
    // START
    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.
    */

    const invoiceRef = useRef(null)

    const data = [{
        id: "728ed52f",
        amount: 100,
        status: "Pending review",
        invoiceNumber: "INV-123123",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        vat: 0,
        phone: "123-456-7890"
    },
    {
        id: "728ed52f",
        amount: 500,
        status: "Pending review",
        invoiceNumber: "INV-4234124",
        invoiceType: "invoice",
        vat: 0,
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        phone: "123-456-7890"
    },
    {
        id: "728ed52f",
        amount: 200,
        status: "Pending review",
        vat: 0,
        invoiceNumber: "INV-21342342314",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        phone: "123-456-7890"
    },
    {
        id: "728ed52f",
        amount: 100,
        vat: 0,
        status: "Pending review",
        invoiceNumber: "INV-1234",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        phone: "123-456-7890"
    },
    {
        id: "728ed52f",
        amount: 300,
        status: "Pending review",
        invoiceNumber: "INV-3425",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        vat: 0,
        created: "2021-07-01",
        phone: "123-456-7890"
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "Pending review",
        invoiceNumber: "INV-6453",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        vat: 0,
        phone: "123-456-7890"
    },
    ];

    const downloadPDF = (invoiceId: string) => {
        const newInvoiceData: InvoiceData = {
            invoiceId: invoiceId,
            customer: {
                id: "1",
                name: "John Doe",
                address: "123 Main St",
                email: "johndoe@exmapl.com",
                phone: "123-456-7890"
            },
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 100,
                    quantity: 1,
                    totalPrice: 100
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 200,
                    quantity: 1,
                    totalPrice: 200
                }
            ],
            invoiceDate: new Date(),
            dueDate: new Date(new Date().setDate(new Date().getDate() + 30)),
            vat: 0
        }
        setInvoiceData(newInvoiceData, () => {
            if (!invoiceRef.current) return;
            if (!invoiceRef.current.style) return;
            downloadInvoice(newInvoiceData, invoiceRef)
        })
    }

    // END

    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [invoiceId, setInvoiceId] = useState<string>("");
    const [invoiceData, setInvoiceData] = useStateCallback<InvoiceData>({
        invoiceId: "",
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
    });

    const editInvoice = (invoiceId: string) => {
        setInvoiceId(invoiceId);
        setIsEditing(true);

    }

    useEffect(() => {
        if (isEditing) window.scrollTo(0, 0);
        document.body.style.overflow = isEditing ? "hidden" : "scroll";
    }, [isEditing])

    useEffect(() => {
        invoiceRef.current.style = "position: absolute; top: -9999px; left: -9999px;"
    }, [])

    return <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-medium">Invoices</h1>
            <Button variant="outline"
                onClick={
                    () => {
                        setIsEditing(true);
                        setInvoiceId("");
                    }
                }
            >Create</Button>
        </div>
        <DataTable columns={getColumns(false, downloadPDF, editInvoice)} data={data} classNames={{
            filter: "hidden",
            parentDiv: "h-72 overflow-auto",
            table: {
                header: "sticky top-0 bg-background z-10",
                body: "overflow-scroll z-0"
            }
        }} />
        {isEditing && <InvoiceEditor isOpen={isEditing} setIsOpen={setIsEditing} invoiceId={invoiceId} setInvoiceId={setInvoiceId} />}
        <InvoiceView invoiceData={invoiceData} setInvoiceData={() => { }} invoiceRef={invoiceRef} />
    </div>;
}


