import { Column, ColumnDef } from "@tanstack/react-table";
import React, { MutableRefObject } from "react";

export interface InvoiceEditorFormProps {
  invoiceId: string;
  setInvoiceId: (e: string) => void;
  invoiceData: InvoiceData;
  setInvoiceData: (e: InvoiceData) => void;
  isSupplier?: boolean;
}

export interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
export interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export interface SimpleEntity {
  id: string;
  name: string;
  address: string;
  email: string;
  phone: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export interface InvoiceData {
  invoiceId: string;
  customer?: SimpleEntity;
  supplier?: SimpleEntity;
  items: Item[];
  invoiceDate: Date;
  dueDate: Date;
  memo?: string;
  footer?: string;
  vat: number;
}

export interface PriceListData {
  priceListId: string;
  date: Date;
  expiry: Date;
  customer: SimpleEntity;
  items: Item[];
  memo?: string;
  footer?: string;
  vat?: number;
}

export interface PriceListDataFormProps {
  priceListData: PriceListData;
  setPriceListData: (e: PriceListData) => void;
}

export interface PriceListViewProps {
  priceListData: PriceListData;
  setPriceListData: (e: PriceListData) => void;
  priceListRef?: MutableRefObject<any>;
}

export interface InvoiceViewProps {
  invoiceData: InvoiceData;
  setInvoiceData: (e: InvoiceData) => void;
  invoiceRef?: MutableRefObject<any>;
}

export interface Entity {
  id: string;
  name: string;
  phone: string;
  email: string;
  total: number;
  created: string;
  balance: number;
  desc?: string;
  creditLimitDuration?: [Date, Date];
  billingInfo?: {
    address: {
      country: string;
      lines: [string, string];
      town: string;
      postalCode: number;
    };
    phone: {
      country: {
        id: string;
        code: number;
      };
      phoneNumber: number;
    };
  };
}

export interface InvoiceFormItem {
  id: string;
  amount: number;
  status: string;
  invoiceNumber: string;
  invoiceType: string;
  email: string;
  due: string;
  created: string;
  invoiceUrl: string;
}

export interface GraphProps {
  data: number[];
  labels: string[];
}

export interface Product {
  code: string;
  image: string;
  warehouse: string;
  description: string;
  category: string;
  type: string;
  weight: number;
  location: string;
  minStock: number;
  reorderQty: number;
  serialNo: string;
  price: number;
  tax: number;
  unitOfSale: string;
  supplier: string;
  quantity: number;
  costPrice: number;
  discount: number;
  orderedDate: Date;
  isDiscounted: boolean;
  taxState: boolean;
  created: string;
}
