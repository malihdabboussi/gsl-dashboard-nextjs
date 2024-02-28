"use client"

import { PlusIcon } from "@radix-ui/react-icons"
import { DropdownItem } from "../components/invoiceEditors/InvoiceEditorForm"
import { Button } from "../components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useRef, useState } from "react"
import { Textarea } from "../components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectGroup, SelectTrigger, SelectValue } from "../components/ui/select"
import { details } from "../details"
import { DatePicker } from "../components/datepicker"
import { Checkbox } from "../components/ui/checkbox"
import { CheckedState } from "@radix-ui/react-checkbox"

export default function AddProduct() {
    const [orderedDate, setOrderedDate] = useState<Date>(null)
    const [isDiscounted, setIsDiscounted] = useState<CheckedState>(false)

    const refs = {
        productCode: useRef<HTMLInputElement>(null),
        productImage: useRef<HTMLInputElement>(null),
        productWarehouse: useRef<HTMLInputElement>(null),
        productDescription: useRef<HTMLTextAreaElement>(null),
        category: useRef<HTMLInputElement>(null),
        itemType: useRef<HTMLInputElement>(null),
        weight: useRef<HTMLInputElement>(null),
        location: useRef<HTMLInputElement>(null),
        minStock: useRef<HTMLInputElement>(null),
        reorderQty: useRef<HTMLInputElement>(null),
        serialNo: useRef<HTMLInputElement>(null),
        price: useRef<HTMLInputElement>(null),
        tax: useRef<HTMLInputElement>(null),
        unitOfSale: useRef<HTMLInputElement>(null),
        supplier: useRef<HTMLInputElement>(null),
        quantity: useRef<HTMLInputElement>(null),
        costPrice: useRef<HTMLInputElement>(null),
        discount: useRef<HTMLInputElement>(null),
    }


    // START
    const categories: DropdownItem[] = [
        { label: "Category 1", value: "1" },
        { label: "Category 2", value: "2" },
        { label: "Category 3", value: "3" },
        { label: "Category 4", value: "4" },
    ]
    const itemTypes: DropdownItem[] = [
        { label: "Type 1", value: "1" },
        { label: "Type 2", value: "2" },
        { label: "Type 3", value: "3" },
        { label: "Type 4", value: "4" },
    ]
    const generateSerial = () => {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    const onClick = () => {
        return;
    }
    // END

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add Product</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[40vw] max-h-[97vh] overflow-auto">
                <DialogHeader>
                    <DialogTitle>Add Product</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-8 p8-4">
                    <div className="grid grid-cols-3 gap-2">
                        <div className="flex flex-col gap-1">
                            <Label>Product code</Label>
                            <Input ref={refs.productCode} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Image</Label>
                            <Input ref={refs.productImage} type="file" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Label>Warehouse</Label>
                            <Input ref={refs.productWarehouse} />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Description</Label>
                        <Textarea ref={refs.productDescription} />
                    </div>
                    <div className="flex flex-col gap-4 w-full [&>.sub]:w-full [&>.sub]:grid [&>.sub]:grid-cols-2 [&>.sub]:gap-2">
                        <div className="sub">
                            <div className="flex flex-col gap-2">
                                <Label>Category</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                categories.map((item, i) => <SelectItem key={i} value={item.value}>{item.label}</SelectItem>)
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Weight ({details.units.weight})</Label>
                                <Input ref={refs.weight} />
                            </div>
                        </div>
                        <div className="sub">
                            <div className="flex flex-col gap-2">
                                <Label>Item Type</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                itemTypes.map((item, i) => <SelectItem key={i} value={item.value}>{item.label}</SelectItem>)
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Location</Label>
                                <Input ref={refs.location} />
                            </div>
                        </div>
                        <div className="sub">
                            <div className="flex flex-col gap-2">
                                <Label>Min Stock</Label>
                                <Input ref={refs.minStock} type="number" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label>Re-order Qty</Label>
                                <Input ref={refs.reorderQty} type="number" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <Label>Serial No</Label>
                        <div className="flex gap-2"><Input ref={refs.serialNo} /><Button size="default" variant="outline" onClick={
                            () => {
                                refs.serialNo.current.value = generateSerial()
                            }
                        }>Generate Serial</Button></div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-1">
                                <Label>Price</Label>
                                <Input ref={refs.price} type="number" />
                                <div className="flex gap-2 mt-2">
                                    <Checkbox
                                        checked={isDiscounted}
                                        onCheckedChange={setIsDiscounted}
                                    /><Label>Discounted</Label></div>
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Unit of sale</Label>
                                <Input ref={refs.unitOfSale} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Tax</Label>
                                <Input ref={refs.tax} type="number" />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-1">
                                <Label>Supplier</Label>
                                <Input ref={refs.supplier} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Ordered Date</Label>
                                <DatePicker onChange={setOrderedDate} text="Pick a date" />
                            </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex flex-col gap-1">
                                <Label>Quantity</Label>
                                <Input ref={refs.quantity} type="number" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Cost Price</Label>
                                <Input ref={refs.costPrice} type="number" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <Label>Discount</Label>
                                <Input ref={refs.discount} type="number" />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogFooter className="mt-4">
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button onClick={() => {
                            onClick()
                        }}>Add Product</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    )
}