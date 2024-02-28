"use client"

import { TabsContent } from "@radix-ui/react-tabs";
import BasePage from "../base";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import { SupplierInvoiceTable } from "./SupplierInvoiceTable";
import { CustomerInvoiceTable } from "./CustomerInvoiceTable";
import { Button } from "../components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import InvoiceCreator from "../components/invoiceEditors/createInvoice";

export default function InvoicePage() {
    const [openEditor, setOpenEditor] = useState(false);

    const head = <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
            <h1 className="title"
            >Invoices</h1>
            <Button variant="default" onClick={() => setOpenEditor(true)}>
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Invoice
            </Button>
        </div>
        <hr className="border-b border-muted" />
    </div>

    return (
        <BasePage pageId={1} customHead={head}>
            <div>
                <Tabs defaultValue="customer" className="flex flex-col gap-4">
                    <div className="flex">
                        <TabsList className="flex gap-2 text-base">
                            <TabsTrigger value="customer">Customer Invoices</TabsTrigger>
                            <TabsTrigger value="supplier">Supplier Invoices</TabsTrigger>
                        </TabsList>
                    </div>
                    <TabsContent value="customer">
                        <CustomerInvoiceTable />
                    </TabsContent>
                    <TabsContent value="supplier">
                        <SupplierInvoiceTable />
                    </TabsContent>
                </Tabs>
            </div>
            {openEditor && <InvoiceCreator isOpen={openEditor} setIsOpen={setOpenEditor} />}
        </BasePage>
    )
}
