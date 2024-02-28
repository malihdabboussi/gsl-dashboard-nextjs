import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { InvoiceEditorForm } from "./InvoiceEditorForm"
import { InvoiceData } from "../../types";
import { useEffect, useRef, useState } from "react";
import InvoiceView from "./invoiceView";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import printJS from "print-js";

export default function BaseInvoiceEditor({ invoiceId, setInvoiceId, invoiceType, isNew, onClose, retreiveExistingData, isSupplier }: { invoiceId: string, setInvoiceId: (e: string) => void, invoiceType: string, isNew: boolean, onClose: () => void, retreiveExistingData?: (id: string) => InvoiceData, isSupplier?: boolean }) {
    const invoiceRef = useRef(null);
    const [invoiceData, setInvoiceData] = useState<InvoiceData>({
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
    });

    const invoiceTrig = (callback: (image: any) => any) => {
        // takeScreenshot(invoiceRef.current);
        const input = invoiceRef.current;
        html2canvas(input, {
            scale: 4,
        })
            .then((canvas) => {
                const image = canvas.toDataURL('image/png');
                callback(image);
            })
    }

    const generatePdf = (image: any) => {
        if (!image) return;
        if (!invoiceData.invoiceDate || !invoiceData.dueDate || !invoiceData.invoiceId) return alert(
            "Please fill in the invoice date, id, and due date before printing the invoice"
        )
        const width: number = invoiceRef.current.offsetWidth / 2;
        const height: number = invoiceRef.current.offsetHeight / 2;

        const pdf = new jsPDF(
            {
                orientation: 'p',
                unit: 'px',
                format: [width, height]
            }
        );
        pdf.addImage(image, 'PNG', 0, 0, width, height);
        const blob = pdf.output('blob');
        const blobUrl = URL.createObjectURL(blob);
        printJS(blobUrl);
        // pdf.save(`${invoiceId} (Created ${moment(invoiceData.invoiceDate).format("DD MM YYYY")}) (Due ${moment(invoiceData.dueDate).format("DD MM YYYY")}) ${details.company.name}.pdf`.replaceAll("/", "-"));
    }

    useEffect(() => {
        if (isNew) return;
        if (retreiveExistingData) retreiveExistingData(invoiceId);
    }, [isNew])

    // START 
    // make sure the invoiceData is saved to a remote database so that it can be retreived the next time it's requested, either as a draft or from the customers invoice table to be edited.

    /*
        useEffect(() => { return }, [invoiceData])
    */

    // END

    return <div className="absolute top-0 bottom-0 left-0 right-0 z-50 flex flex-col overflow-hidden bg-background">
        <div className="sticky top-0 flex items-center justify-between gap-4 px-4 border-b-2 min-h-16 bg-background">
            <div className="flex items-center gap-4">
                <Button variant="ghost" onClick={onClose} size="icon"><Cross1Icon /></Button>
                <div className="h-8">
                    <hr className="h-full mr-4 border-r-2" />
                </div>
                <h1 className="text-lg">{isNew ? "Create" : "Edit"} {invoiceType === "customer" ? "Customer" : "Supplier"} Invoice</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="default" onClick={() => { invoiceTrig(generatePdf) }} disabled={
                    !invoiceData.customer ||
                    !invoiceData.dueDate ||
                    !invoiceData.invoiceDate ||
                    !invoiceData.items ||
                    !invoiceData.invoiceId
                }>Print Invoice</Button>
            </div>
        </div>
        <div className="flex h-full">
            <div className="flex flex-col w-[40vw] p-24 py-12">
                <InvoiceEditorForm invoiceId={invoiceId} setInvoiceId={setInvoiceId} invoiceData={invoiceData} setInvoiceData={setInvoiceData} isSupplier={isSupplier} />
            </div>
            <div className="w-[60vw] h-full p-4 bg-muted">
                <InvoiceView invoiceData={invoiceData} setInvoiceData={setInvoiceData} invoiceRef={invoiceRef} />
            </div>
        </div>
    </div>
}

