"use client";
import { MutableRefObject } from "react";
import { InvoiceData } from "../types";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import moment from "moment";

export function download(input: any, image: any, invoiceData: InvoiceData) {
  const width: number = input.offsetWidth / 2;
  const height: number = input.offsetHeight / 2;

  const pdf = new jsPDF(
    {
      orientation: 'p',
      unit: 'px',
      format: [width, height]
    }
  );
  pdf.addImage(image, 'PNG', 0, 0, width, height);
  pdf.save(`${invoiceData.invoiceId} (Created ${moment(invoiceData.invoiceDate).format("DD MM YYYY")}) (Due ${moment(invoiceData.dueDate).format("DD MM YYYY")}).pdf`.replaceAll("/", "-"));
}

export async function downloadInvoice(
  invoiceData: InvoiceData,
  invoiceRef: MutableRefObject<any>
) {
  const canvas = await html2canvas(invoiceRef.current, {
    scale: 4,
  })
  const image = await canvas.toDataURL('image/png');
  download(invoiceRef.current, image, invoiceData);
}