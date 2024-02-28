"use client"

import BasePage from "../base";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/button"
import { PlusIcon } from "@radix-ui/react-icons"
import { Entity } from "../types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { DataTable } from "../components/entitytable";
import { getColumns } from "../entitytables";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../components/ui/dialog"
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { DatePickerWithRange } from "../components/datepicker";
import { Combobox } from "../components/dropdown";
import { DropdownItem } from "../components/invoiceEditors/InvoiceEditorForm";
import { DateRange } from "react-day-picker";

export default function suppliersPage() {
    const refs = {
        name: useRef<HTMLInputElement>(null),
        email: useRef<HTMLInputElement>(null),
        desc: useRef<HTMLTextAreaElement>(null),
        creditLimitDuration: {
            startDate: useRef<HTMLInputElement>(null),
            endDate: useRef<HTMLInputElement>(null),
        },
        amount: useRef<HTMLInputElement>(null),
        billingInformation: {
            address: {
                country: useRef<HTMLInputElement>(null),
                lines: [
                    useRef<HTMLInputElement>(null),
                    useRef<HTMLInputElement>(null),
                ],
                town: useRef<HTMLInputElement>(null),
                postalCode: useRef<HTMLInputElement>(null),
            },
            phone: {
                country: {
                    id: useRef<HTMLInputElement>(null),
                    code: useRef<HTMLInputElement>(null),
                },
                phoneNumber: useRef<HTMLInputElement>(null),
            },
        }
    }

    type Refs = typeof refs;

    const setCreditDates = (dates: DateRange) => {
        if (dates.from && dates.to) {
            refs.creditLimitDuration.startDate.current.value = dates.from.toDateString();
            refs.creditLimitDuration.endDate.current.value = dates.to.toDateString();
            console.log(refs)
        }
    }

    const CustomDialog = ({ setCreditDates, refs }: { setCreditDates: (date: DateRange) => void, refs: Refs }) => {
        const [countries, setCountries] = useState<DropdownItem[]>([])
        const [phoneCountries, setPhoneCountries] = useState<DropdownItem[]>([])

        useEffect(() => {
            fetch("https://restcountries.com/v2/all?fields=name,callingCodes,alpha2Code").then((res) => res.json()).then((data) => {
                setCountries(data.map((country) => {
                    const data = { value: country.name, label: country.name }
                    return data;
                }).sort((a, b) => {
                    if (a.label < b.label) return -1;
                    if (a.label > b.label) return 1;
                    return 0;
                }
                ))
                setPhoneCountries(data.map((country) => {
                    const datum = country.alpha2Code + " +" + country.callingCodes.join(",")
                    const data = { value: datum, label: datum }
                    return data;
                }).sort((a, b) => {
                    if (a.label < b.label) return -1;
                    if (a.label > b.label) return 1;
                    return 0;
                }
                ))
            }
            )
        }, [])

        const [selectedCountry, setSelectedCountry] = useState<string>("")
        const [selectedPhoneCountry, setSelectedPhoneCountry] = useState<string>("")

        const onClick = () => {
            if (
                refs.name.current?.value &&
                refs.email.current?.value &&
                refs.billingInformation.phone.phoneNumber.current.value
            ) {
                // START
                const data: Entity = {
                    id: "728ed52f",
                    name: refs.name.current.value,
                    email: refs.email.current.value,
                    phone: refs.billingInformation.phone.phoneNumber.current.value,
                    total: 0,
                    created: new Date().toDateString(),
                    balance: 0,
                    desc: refs.desc.current.value,
                    billingInfo: {
                        address: {
                            country: selectedCountry,
                            lines: [
                                refs.billingInformation.address.lines[0].current.value,
                                refs.billingInformation.address.lines[1].current.value
                            ],
                            town: refs.billingInformation.address.town.current.value,
                            postalCode: parseInt(refs.billingInformation.address.postalCode.current.value)
                        },
                        phone: {
                            country: {
                                id: selectedPhoneCountry.split(" ")[0],
                                code: parseInt(selectedPhoneCountry.split(" ")[1].split("+")[1]),
                            },
                            phoneNumber: parseInt(refs.billingInformation.phone.phoneNumber.current.value)
                        }
                    },
                    creditLimitDuration: [
                        new Date(refs.creditLimitDuration.startDate.current.value),
                        new Date(refs.creditLimitDuration.endDate.current.value)
                    ]
                }
                console.log(data)
                // END
            } else {
                alert("Fill in the information first. Name, email, and phone number are required.")
            }
        }

        return <Dialog>
            <DialogTrigger asChild>
                <Button variant="default">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add supplier
                </Button>
            </DialogTrigger>
            <DialogContent className="w-96">
                <DialogHeader>
                    <DialogTitle>Add supplier</DialogTitle>
                </DialogHeader>
                <form className="grid gap-4 py-4">
                    <h1 className="text-base font-semibold">Account Information</h1>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input ref={refs.name} id="name" placeholder="Pedro Duarte" className="col-span-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">
                            Email
                        </Label>
                        <Input ref={refs.email} id="email" placeholder="john@example.com" className="col-span-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="desc">
                            Description
                        </Label>
                        <Textarea ref={refs.desc} id="desc" className="col-span-3" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="startDate">
                            Credit limit duration
                        </Label>

                        <div className={"grid gap-2"}>
                            <DatePickerWithRange text="Choose the range of dates" onChange={(dates) => {
                                setCreditDates(dates)
                            }} />
                            <input ref={refs.creditLimitDuration.startDate} type="hidden" />
                            <input ref={refs.creditLimitDuration.endDate} type="hidden" />
                        </div>
                    </div>
                    <h1 className="mt-2 text-base font-semibold">Billing information</h1>
                    <div className="flex flex-col gap-2">
                        <Combobox items={countries} label="Select a country" errorMessage="Please select a country" value={
                            selectedCountry
                        } setValue={setSelectedCountry} />
                        <Input ref={refs.billingInformation.address.lines[0]} id="addressLine1" placeholder="Address line 1" className="col-span-3" />
                        <Input ref={refs.billingInformation.address.lines[1]} id="addressLine2" placeholder="Address line 2" className="col-span-3" />
                        <Input ref={refs.billingInformation.address.town} id="town" placeholder="Town/city" className="col-span-3" />
                        <Input ref={refs.billingInformation.address.postalCode} id="postalCode" placeholder="Postal code" className="col-span-3" />
                        <div className="flex gap-1">
                            <Combobox items={phoneCountries} label="+XX" value={selectedPhoneCountry} setValue={setSelectedPhoneCountry} errorMessage="" className="!w-min" />
                            <Input ref={refs.billingInformation.phone.phoneNumber} id="phoneNumber" placeholder="Phone number" className="flex-grow" />
                        </div>
                    </div>
                </form>
                <DialogFooter>
                    <DialogClose>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <DialogClose>
                        <Button onClick={() => {
                            onClick()
                        }}>Add supplier</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    }

    const head = <div className="flex flex-col gap-4">
        <div className="flex flex-row items-center justify-between">
            <h1 className="title"
            >Suppliers</h1>
            <CustomDialog setCreditDates={setCreditDates} refs={refs} />
        </div>
        <hr className="border-b border-muted" />
    </div>


    // start
    const getData = (collection: "all" | "top" | "first-time" | "repeat") => {
        const data: Entity[] = [
            {
                id: "728ed52f",
                name: "John Doe",
                email: "john@example.com",
                phone: "123-456-7890",
                total: 2100,
                created: "2021-08-01",
                balance: 100,
            }, {
                id: "728ed52f",
                name: "John Doe",
                email: "john@example.com",
                phone: "123-456-7890",
                total: 2345,
                created: "2021-08-01",
                balance: 100,
            }, {
                id: "728ed52f",
                name: "John Doe",
                email: "john@example.com",
                phone: "123-456-7890",
                balance: 100,
                total: 709,
                created: "2021-08-01"
            }, {
                id: "728ed52f",
                name: "John Doe",
                balance: 100,
                email: "john@example.com",
                phone: "123-456-7890",
                total: 2123400,
                created: "2021-08-01"
            }, {
                id: "728ed52f",
                name: "John Doe",
                email: "john@example.com",
                balance: 100,
                phone: "123-456-7890",
                total: 1234,
                created: "2021-08-01"
            },
            {
                id: "728ed52f",
                name: "John Doe",
                email: "john@example.com",
                phone: "123-456-7890",
                total: 323,
                balance: 100,
                created: "2021-08-01"
            }, {
                id: "728ed52f",
                name: "John Doe",
                email: "john@example.com",
                phone: "123-456-7890",
                total: 200,
                balance: 100,
                created: "2021-08-01"
            }
        ]
        return data;
    }

    const classNames = {
        parentDiv: "h-[65vh] overflow-auto",
        table: {
            header: "sticky top-0 bg-background z-10",
            body: "overflow-scroll z-0"
        }
    }

    return (
        <BasePage customHead={head} pageId={3}>
            <Tabs defaultValue="all" className="flex flex-col gap-4">
                <div className="flex">
                    <TabsList className="flex gap-2 text-base">
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="top">Top customers</TabsTrigger>
                        <TabsTrigger value="first-time">First-time customers</TabsTrigger>
                        <TabsTrigger value="repeat">Repeat customers</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="all">
                    <DataTable data={getData("all")} columns={getColumns(true)} classNames={classNames} />
                </TabsContent>
                <TabsContent value="top">
                    <DataTable data={getData("top")} columns={getColumns(true)} classNames={classNames} />
                </TabsContent>
                <TabsContent value="first-time">
                    <DataTable data={getData("first-time")} columns={getColumns(true)} classNames={classNames} />
                </TabsContent>
                <TabsContent value="repeat">
                    <DataTable data={getData("repeat")} columns={getColumns(true)} classNames={classNames} />
                </TabsContent>
            </Tabs>
        </BasePage>
    )
}

