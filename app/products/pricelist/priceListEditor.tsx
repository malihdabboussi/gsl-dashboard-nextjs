import { Cross1Icon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { PriceListEditorForm } from "./priceListEditorForm"
import { PriceListData } from "../../types";
import { useEffect, useRef, useState } from "react";
import PriceListView from "./priceListView";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import printJS from "print-js";

export default function PriceListEditor(
    {
        onClose,
    }:
        {
            onClose: () => void,
        }
) {
    const priceListRef = useRef(null);
    const [priceListData, setPriceListData] = useState<PriceListData>({
        priceListId: "",
        customer: {
            id: "",
            name: "",
            address: "",
            email: "",
            phone: ""
        },
        items: [],
        date: null,
        expiry: null,
    });

    const priceListTrig = (callback: (image: any) => any) => {
        // takeScreenshot(invoiceRef.current);
        const input = priceListRef.current;
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
        if (!priceListData.date || !priceListData.expiry || !priceListData.priceListId) return alert(
            "Please fill in the price list date, id, and expiry date before printing the price list"
        )
        const width: number = priceListRef.current.offsetWidth / 2;
        const height: number = priceListRef.current.offsetHeight / 2;

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

    // START 
    // make sure the priceListData is saved to a remote database so that it can be retreived the next time it's requested, either as a draft or from the customers invoice table to be edited.

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
                <h1 className="text-lg">Create Price List</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button variant="default" onClick={() => { priceListTrig(generatePdf) }} disabled={
                    !priceListData.customer ||
                    !priceListData.date ||
                    !priceListData.expiry ||
                    !priceListData.items ||
                    !priceListData.priceListId
                }>Print Price List</Button>
            </div>
        </div>
        <div className="flex h-full">
            <div className="flex flex-col w-[40vw] p-24 py-12">
                {/* <InvoiceEditorForm invoiceId={invoiceId} setInvoiceId={setInvoiceId} invoiceData={invoiceData} setPriceListData={setPriceListData} isSupplier={isSupplier} /> */}
                <PriceListEditorForm priceListData={priceListData} setPriceListData={setPriceListData} />
            </div>
            <div className="w-[60vw] h-full p-4 bg-muted">
                {/* <InvoiceView invoiceData={invoiceData} setPriceListData={setPriceListData} invoiceRef={invoiceRef} /> */}
                <PriceListView priceListData={priceListData} setPriceListData={setPriceListData} priceListRef={priceListRef} />
            </div>
        </div>
    </div>
}

