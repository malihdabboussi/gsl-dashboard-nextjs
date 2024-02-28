"use client"

import * as React from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "./ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"

export function Combobox({ items, label, errorMessage, value, setValue, customTrigger, className }: { items: { value: string, label: string }[], label: string, errorMessage: string, value: string, setValue: (e: string) => void, customTrigger?: React.ReactNode, className?: string }) {
    const [open, setOpen] = React.useState(false)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                {customTrigger ? customTrigger : <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={"justify-between w-full " + className}
                >
                    {(value
                        ? items.find((item) => item.value.toLowerCase() === value.toLowerCase())?.label
                        : label
                    ) || value
                    }
                    <CaretSortIcon className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                </Button>
                }
            </PopoverTrigger>
            <PopoverContent className="w-[calc(40vw-256px)] p-0">
                <Command className="!w-[calc(40vw-256px)] max-h-96">
                    <CommandInput placeholder={label} className="h-9" />
                    <CommandEmpty>{errorMessage}</CommandEmpty>
                    <CommandGroup className="overflow-auto">
                        {items.map((item) => (
                            <CommandItem
                                key={item.value}
                                value={item.value}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {item.label}
                                <CheckIcon
                                    className={cn(
                                        "ml-auto h-4 w-4",
                                        value === item.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
