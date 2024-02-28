"use client";

import React from "react";
import { DataTableColumnHeader } from "../components/entitytable";
import { details } from "../details";
import { Button } from "../components/ui/button";
import { CubeIcon, OpenInNewWindowIcon } from "@radix-ui/react-icons";

export function getColumns() {
  return [
    {
      accessorKey: "id",
      header: () => null,
      enableSorting: false,
      enableHiding: false,
      cell: () => null,
    },
    {
      accessorKey: "image",
      header: () => null,
      cell: ({ row }) => {
        const image = row.getValue("image");
        return (image ? (<img src={image} alt='Product' className='object-cover w-10 h-10 rounded-md' />)
          : (<CubeIcon />));
      }
    },
    {
      accessorKey: "code",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Product Code' />
      ),
    },
    {
      accessorKey: "taxState",
      header: () => null,
      cell: ({ row }) => {
        const taxState = row.getValue("taxState");
        return (
          <span>
            {taxState ? "Include tax" : "Exclude tax"}
          </span>
        );
      }
    },
    {
      accessorKey: "price",
      accessorFn: (row) => row.price.toString(),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Sale Price"
        />
      ),
      cell: ({ row }) => {
        const amount = row.getValue("price");
        return (
          <span>
            {details.currency.prefix}
            {amount} {details.currency.suffix}
          </span>
        );
      },
    },
    {
      accessorKey: "quantity",
      accessorFn: (row) => row.quantity.toString(),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Stock Quantity' />
      ),
    },
    {
      accessorKey: "created",
      filterFn: (
        row: { getValue: (arg0: string) => string },
        _id: any,
        value: { from: string | number | Date; to: string | number | Date }
      ) => {
        const date = new Date(row.getValue("created") as string);
        const startDate = new Date(value.from);
        const endDate = new Date(value.to);
        return date >= startDate && date <= endDate;
      },
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Created' />
      ),
    }
  ];
}
