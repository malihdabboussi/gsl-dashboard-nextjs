import { details } from '../../details';
import { Entity, InvoiceData } from '../../types';
import { Details } from '../../components/details';
import { Insights } from '../../components/insights';
import { Button } from '../../components/ui/button';
import { DataTable } from '../../components/datatable';
import { DataTableColumnHeader } from '../../components/entitytable';
import { Checkbox } from '../../components/ui/checkbox';
import { SupplierInvoiceTable } from './invoices';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { Label } from '../../components/ui/label';
import { Input } from '../../components/ui/input';
import { DatePicker, DatePickerWithRange } from '../../components/datepicker';
import { useRef, useState } from 'react';
import { DialogClose } from '@radix-ui/react-dialog';


export function Content({ supplier }: { supplier: Entity; }) {
    return (
        <div className="flex flex-col gap-4">
            <div className="grid w-full grid-cols-5 gap-2 pb-8 border-b-2">
                <div className="flex flex-col col-span-1 gap-7">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold">{supplier.name}</h1>
                        <p className="text-sm font-normal text-muted-foreground">{supplier.email}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <p className="text-sm font-normal text-muted-foreground">Remaining balance</p>
                        <p className="text-sm font-normal">{details.currency.prefix}{supplier.balance} {details.currency.suffix}</p>
                    </div>
                </div>
                <div className="col-span-2 border-l-2">
                    <Insights insightsGraph={{ labels: ['Dec', 'Jan', 'Feb', 'Mar', 'Apr'], data: [20, 20, 20, 0] }} isSupplier={false} total={supplier.total} />
                </div>
                <div className="col-span-2 border-l-2">
                    <Details entity={supplier} />
                </div>
            </div>
            <div className='flex flex-col gap-8'>
                <Payments supplier={supplier} />
                <SupplierInvoiceTable supplier={supplier} />
            </div>
        </div>
    );
}

function Payments({ supplier }: { supplier: Entity; }) {

    const columns = [
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
            accessorKey: "amount",
            accessorFn: (row) => row.amount.toString(),
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Amount" />
            ),
            cell: ({ row }) => {
                const amount = row.getValue("amount");
                return <span>{details.currency.prefix}{amount} {details.currency.suffix}</span>;
            }
        },
        {
            accessorKey: "type",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Type" />
            ),
        },
        {
            accessorKey: "desc",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Description" />
            ),
        },

        {
            accessorKey: "invoice",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Attached to invoice" />
            ),
        },
        {
            accessorKey: "date",
            header: ({ column }) => (
                <DataTableColumnHeader column={column} title="Date" />
            ),
        },
    ];

    // START
    const data = [
        {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        },
        {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        },
        {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }, {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        },
        {
            amount: 100,
            type: "Credit",
            desc: "Credit for invoice #123",
            invoice: "123",
            date: "2021-08-01"
        }
    ]

    const [date, setDate] = useState<Date | null>(null);
    const amount = useRef<HTMLInputElement>(null);
    const desc = useRef<HTMLInputElement>(null);
    const invoice = useRef<HTMLInputElement>(null);

    const save = () => { return }

    // END

    return <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-4">
            <h1 className="text-lg font-medium">Payments</h1>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Create</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Payment</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="amount">
                                Amount ({details.currency.suffix})
                            </Label>
                            <Input id="amount" type="number" placeholder="000" prefix={details.currency.prefix} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="desc">
                                Description
                            </Label>
                            <Input id="desc" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="invoice">
                                Attach to invoice
                            </Label>
                            <Input id="invoice" />
                        </div>
                        <div className="flex flex-col gap-4">
                            <Label htmlFor="date">
                                Date
                            </Label>
                            <DatePicker onChange={setDate} text="Select a date" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <DialogClose asChild>
                            <Button type="submit" onClick={() => {
                                save()
                            }}>Save changes</Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
        <DataTable columns={columns} data={data} classNames={
            {
                parentDiv: "h-72 overflow-auto",
                table: {
                    header: "sticky top-0 bg-background z-10",
                    body: "overflow-scroll z-0"
                }
            }
        } />
    </div>
}
