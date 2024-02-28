"use client";
import React from "react";
import { DataTable } from "./filteredInvoiceTable";
import { getColumns } from "./tables";
import { InvoiceFormItem } from "../types";


export function SupplierInvoiceTable() {
    // START
    /*
    This is a mock of the data that would be received from the backend.
    You could also use props to pass this data from the parent component.
    */
    const data: InvoiceFormItem[] = [{
        id: "728ed52f",
        amount: 100,
        status: "Pending review",
        invoiceNumber: "SUPINV-0001",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        invoiceUrl: "https://example.com/invoice/728ed52f"
    },
    {
        id: "728ed52f",
        amount: 500,
        status: "Pending review",
        invoiceNumber: "SUPINV-0001",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        invoiceUrl: "https://example.com/invoice/728ed52f"
    },
    {
        id: "728ed52f",
        amount: 200,
        status: "Pending review",
        invoiceNumber: "SUPINV-0001",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        invoiceUrl: "https://example.com/invoice/728ed52f"
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "Past due",
        invoiceNumber: "SUPINV-0001",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        invoiceUrl: "https://example.com/invoice/728ed52f"
    },
    {
        id: "728ed52f",
        amount: 300,
        status: "Paid",
        invoiceNumber: "SUPINV-0001",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        invoiceUrl: "https://example.com/invoice/728ed52f"
    },
    {
        id: "728ed52f",
        amount: 100,
        status: "Pending review",
        invoiceNumber: "SUPINV-0001",
        invoiceType: "invoice",
        email: "m@example.com",
        due: "2021-08-01",
        created: "2021-07-01",
        invoiceUrl: "https://example.com/invoice/728ed52f"
    },
    ];

    const downloadPDF = (invoiceId: string) => {
        return
    }

    const makePayment = (invoiceId: string) => {
        return
    }

    // END
    return <DataTable columns={getColumns(true, downloadPDF, null, makePayment)} data={data} />;
}
