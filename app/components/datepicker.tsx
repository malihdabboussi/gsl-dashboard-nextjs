"use client"

import * as React from "react"
import { CalendarIcon } from "@radix-ui/react-icons"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Calendar } from "./ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "./ui/popover"


export function DatePickerWithRange({
    className,
    onChange,
    text
}: {
    className?: string,
    onChange: (date: DateRange) => void,
    text: string
}) {
    const [date, setDate] = React.useState<DateRange | undefined>(null)

    React.useEffect(() => {
        if (!date) return
        onChange(date)
    }, [date])

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} -{" "}
                                    {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>{text}</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="z-50 w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}

export function DatePicker({
    className,
    onChange,
    text
}: {
    className?: string,
    onChange: (date: Date) => void,
    text: string
}) {
    const [date, setDate] = React.useState<Date>()

    React.useEffect(() => {
        if (!date) return
        onChange(date)
    }, [date])

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal", className,
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {date ? format(date, "PPP") : <span>{text}</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}