import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useEffect, useState } from "react";
import { Label } from "../../components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { format } from "date-fns";
import { Calendar } from "../../components/ui/calendar";
import { Combobox } from "../../components/dropdown";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../../components/datatable";
import { Textarea } from "../../components/ui/textarea";
import { Item, SimpleEntity, PriceListData, PriceListDataFormProps } from "../../types";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"

export interface DropdownItem {
    value: string;
    label: string;
};


export function PriceListEditorForm({ priceListData, setPriceListData }: PriceListDataFormProps) {
    const [priceListId, setPriceListId] = useState<string>("");
    const [entityVal, setEntityVal] = useState<string>("");
    const [itemVal, setItemVal] = useState<string>("");
    const [itemQuantity, setItemQuantity] = useState<number>(0);
    const [chosenItems, setChosenItems] = useState<Item[]>();

    useEffect(() => {
        const newPriceListData: PriceListData = {
            ...priceListData,
            priceListId: priceListId,
            customer: entities[parseInt(entityVal) - 1],
            items: chosenItems,
        };
        if (!newPriceListData || newPriceListData === priceListData) return;
        setPriceListData(newPriceListData);
    }, [entityVal, chosenItems, priceListId]);

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
                name: `Customer ${i + 1}`,
                address: `Address ${i + 1}`,
                email: `customer${i + 1}@example.com`,
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
                    <Label>Price List Number</Label>
                    <Input name="priceListNumber" className="w-full" placeholder="Price List Number" value={priceListId} onChange={(e) => { setPriceListId(e.target.value); }} />
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
                                        !priceListData.date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {priceListData.date ? format(priceListData.date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={priceListData.date}
                                    onSelect={(e) => {
                                        setPriceListData({ ...priceListData, date: e })
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
                                        !priceListData.expiry && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="w-4 h-4 mr-2" />
                                    {priceListData.expiry ? format(priceListData.expiry, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    initialFocus
                                    selected={priceListData.expiry}
                                    onSelect={(e) => {
                                        setPriceListData({ ...priceListData, expiry: e })
                                    }} />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <Label>
                        Customer
                    </Label>
                    <Combobox items={entityDropDown} label={"Select a customer"} errorMessage={`No customer found`} value={entityVal} setValue={setEntityVal} />
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
                        value={priceListData.memo}
                        onChange={(e) => {
                            setPriceListData({ ...priceListData, memo: e.target.value })
                        }} />
                </div>
                <div className="flex flex-col gap-2">
                    <Label>Footer</Label>
                    <Textarea
                        name="footer"
                        className="w-full"
                        rows={4}
                        placeholder="Footer"
                        value={priceListData.footer}
                        onChange={(e) => {
                            setPriceListData({ ...priceListData, footer: e.target.value })
                        }} />
                </div>
            </form>
        </div>
    );
}
