import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { Combobox } from "../dropdown";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../datatable";
import { Textarea } from "../ui/textarea";
import { InvoiceEditorFormProps, Item, SimpleEntity, InvoiceData } from "../../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export interface DropdownItem {
    value: string;
    label: string;
};


export function InvoiceEditorForm({ invoiceId, setInvoiceId, invoiceData, setInvoiceData, isSupplier }: InvoiceEditorFormProps) {
    const [entityVal, setEntityVal] = useState<string>("");
    const [itemVal, setItemVal] = useState<string>("");
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const [chosenItems, setChosenItems] = useState<Item[]>();

    useEffect(() => {
        const newInvoiceData: InvoiceData = {
            ...invoiceData,
            invoiceId: invoiceId,
            customer: isSupplier ? null : entities[parseInt(entityVal) - 1],
            supplier: isSupplier ? entities[parseInt(entityVal) - 1] : null,
            items: chosenItems,
            vat: getVat(chosenItems),
        };
        if (!newInvoiceData || newInvoiceData === invoiceData) return;
        setInvoiceData(newInvoiceData);
    }, [entityVal, chosenItems, invoiceId]);

    // START
    useEffect(() => {
        setChosenItems(
            new Array(3)
                .fill(0)
                .map((_, i) => {
                    const price = getPrice((i + 1).toString());
                    return {
                        id: (i + 1).toString(),
                        name: `Item ${i + 1}`,
                        price: price,
                        quantity: 1,
                        get totalPrice() {
                            return this.price * this.quantity;
                        }
                    }
                })
        )
    }, [])

    const entities: SimpleEntity[] = new Array(90).
        fill(0)
        .map((_, i) => (
            {
                id: (i + 1).toString(),
                name: `${isSupplier ? "Supplier" : "Customer"} ${i + 1}`,
                address: `Address ${i + 1}`,
                email: `${isSupplier ? "supplier" : "customer"}${i + 1}@example.com`,
                phone: `+1 123 456 789${i}`
            }
        ));

    const entityDropDown: DropdownItem[] = entities.map((_, i) => ({
        value: entities[i].id,
        label: entities[i].name
    }
    ));

    const items: DropdownItem[] = new Array(90)
        .fill(0)
        .map((_, i) => (
            {
                value: (i + 1).toString(),
                label: `Item ${i + 1}`
            }
        ));


    const getPrice = (id: string) => {
        if (!id) return;
        return Math.round(100 * Math.random());
    };

    const currency = "USD";
    const prefix = "$";

    const getVat = (arr: Item[]) => {
        if (!arr) return;
        const vat: number = arr.reduce((acc, item) => acc + item.totalPrice, 0) * 0.2;
        return vat
    }

    // END

    const columns: ColumnDef<Item>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                const price = row.getValue("price");
                return <span>{`${prefix}${price} ${currency}`}</span>;
            }
        },
        {
            accessorKey: "quantity",
            header: "Quantity",
        },
        {
            accessorKey: "totalPrice",
            header: "Total Price",
            cell: ({ row }) => {
                const totalPrice = row.getValue("totalPrice");
                return <span>{`${prefix}${totalPrice} ${currency}`}</span>;
            }
        },
        {
            id: "actions",
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">...</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => {
                            const newItems = chosenItems?.filter((item) => item.id !== row.getValue("id"));
                            setChosenItems(newItems);
                        }}>Remove</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
            enableSorting: false,
            enableHiding: false,
        },
    ];

    return (
        <div>
            <form className="flex flex-col gap-6 px-8">
                <div className="flex flex-col gap-2">
                    <Label>Invoice Number</Label>
                    <Input name="invoiceNumber" className="w-full" placeholder="Invoice Number" value={invoiceId} onChange={(e) => { setInvoiceId(e.target.value); }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                        <Label>Created Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !invoiceData.invoiceDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {invoiceData.invoiceDate ? format(invoiceData.invoiceDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={invoiceData.invoiceDate}
                                    onSelect={(e) => {
                                        setInvoiceData({ ...invoiceData, invoiceDate: e })
                                    }}
                                    initialFocus />
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label>Due Date</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !invoiceData.dueDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {invoiceData.dueDate ? format(invoiceData.dueDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    initialFocus
                                    selected={invoiceData.dueDate}
                                    onSelect={(e) => {
                                        setInvoiceData({ ...invoiceData, dueDate: e })
                                    }} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>{
                        isSupplier ? "Supplier" : "Customer"
                    }</Label>
                    <Combobox items={entityDropDown} label={"Select a " + (isSupplier ? "supplier" : "customer")} errorMessage={`No ${isSupplier ? "supplier" : "customer"} found`} value={entityVal} setValue={setEntityVal} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Items</Label>
                    {chosenItems &&
                        <DataTable columns={columns} data={chosenItems} classNames={{
                            parentDiv: "h-48 overflow-auto",
                            table: {
                                header: "sticky top-0 bg-background",
                                body: "overflow-scroll"
                            }
                        }} />}
                    <div className="flex gap-2">
                        <Combobox items={items} label="Select an item" errorMessage="No item found" value={itemVal} setValue={setItemVal} />
                        <Input name="quantity" className="w-20" placeholder="Quantity" value={itemQuantity} onChange={(e) => {
                            const value = parseInt(e.target.value);
                            if (value > 0) {
                                setItemQuantity(value);
                            } else {
                                setItemQuantity(0);
                            }
                        }} />
                        <Button
                            type="button"
                            variant="default"
                            disabled={itemQuantity <= 0 || itemVal === ""}
                            onClick={() => {
                                if (itemQuantity <= 0) return;
                                setChosenItems([
                                    ...chosenItems,
                                    {
                                        id: itemVal,
                                        name: items.find((item) => item.value === itemVal)?.label,
                                        price: getPrice(itemVal),
                                        quantity: itemQuantity,
                                        totalPrice: getPrice(itemVal) * itemQuantity
                                    }
                                ]);
                                setItemVal("");
                                setItemQuantity(0);
                            }}>
                            Add Item
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Memo</Label>
                    <Textarea
                        name="memo"
                        className="w-full"
                        rows={4}
                        placeholder="Memo"
                        value={invoiceData.memo}
                        onChange={(e) => {
                            setInvoiceData({ ...invoiceData, memo: e.target.value })
                        }} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Footer</Label>
                    <Textarea
                        name="footer"
                        className="w-full"
                        rows={4}
                        placeholder="Footer"
                        value={invoiceData.footer}
                        onChange={(e) => {
                            setInvoiceData({ ...invoiceData, footer: e.target.value })
                        }} />
                </div>
            </form>
        </div>
    );
}
