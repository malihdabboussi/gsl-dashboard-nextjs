"use client"

import React from "react";
import { DataTableColumnHeader } from "./components/entitytable";
import { Checkbox } from "./components/ui/checkbox";
import { details } from "./details";
import { Button } from "./components/ui/button";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

export function getColumns(isSupplier: boolean) {
    return ([
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all" />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row" />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "id",
            header: () => (
                <></>
            ),
            enableSorting: false,
            enableHiding: false,
            cell: () => (
                <></>
            )
        },
        {
            accessorKey: "name",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Name" />
            ),
        },
        {
            accessorKey: "phone",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Contact Number" />
            ),
        },
        {
            accessorKey: "total",
            accessorFn: (row) => row.total.toString(),
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title={"Total " + (isSupplier ? "supplied" : "spent")} />
            ),
            cell: ({ row }) => {
                const amount = row.getValue("total");
                return <span>{details.currency.prefix}{amount} {details.currency.suffix}</span>;
            }
        },
        {
            accessorKey: "balance",
            accessorFn: (row) => row.balance.toString(),
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Balance" />
            ),
            cell: ({ row }) => {
                const amount = row.getValue("balance");
                return <span>{details.currency.prefix}{amount} {details.currency.suffix}</span>;
            }
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Email" />
            ),
        },
        {
            accessorKey: "created",
            filterFn: (row: { getValue: (arg0: string) => string; }, _id: any, value: { from: string | number | Date; to: string | number | Date; }) => {
                const date = new Date(row.getValue("created") as string);
                const startDate = new Date(value.from);
                const endDate = new Date(value.to);
                return date >= startDate && date <= endDate;
            },
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Created" />
            ),
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        window.open(`/${isSupplier ? "suppliers" : "customers"}/${row.getValue("id")}`, "_self");
                    }}
                >
                    <OpenInNewWindowIcon />
                </Button>
            ),
            enableSorting: false,
            enableHiding: false,
        },
    ])
}