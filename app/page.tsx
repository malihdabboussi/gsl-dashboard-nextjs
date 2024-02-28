"use client"

import Header from "./components/header"
import SideMenu from "./components/sidemenu"
import { Badge } from "./components/ui/badge"
import AvgTransactionValCard from "./datacards/avgTransactionVal"
import { GrossProfitCard, GrossProfitMarginCard } from "./datacards/grossprofit"
import SalesCard from "./datacards/sales"
import { Popover, PopoverTrigger, PopoverContent } from "./components/ui/popover"
import { Calendar } from "./components/ui/calendar"
import React, { useState } from "react"
import TopProductsCard from "./datacards/topproducts"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend,
} from 'chart.js';
import NumberOfOrders from "./datacards/numberOfOrders"
import BasePage from "./base"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    BarElement,
    Tooltip,
    Legend,
);

export default function Home() {
    // START
    const currentDate = new Date();

    const [selectedDate, setSelectedDate] = useState<Date>(currentDate); // use this state to tell the backend which date to fetch data for and update the cards accordingly, you might want to modify the card components to request data from the backend with the specific data from the data sent through props

    // END

    const head = <div className="flex flex-col gap-4">
        <h1 className="title"
        >Overview</h1>
        <div>
            <Popover>
                <PopoverTrigger>
                    <Badge
                        variant="outline"
                        className="flex justify-center px-4 py-1 text-sm border-dashed rounded-full text-muted-foreground min-w-28"
                    >
                        {selectedDate && selectedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </Badge>
                </PopoverTrigger>
                <PopoverContent>
                    <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={
                            (date: Date) => {
                                setSelectedDate(date);
                            }
                        }
                    />
                </PopoverContent>
            </Popover>
        </div>
        <hr className="border-b border-muted" />
    </div>

    return (
        <BasePage pageId={0} customHead={head}>
            <div className="grid grid-cols-3 gap-8">
                <SalesCard date={selectedDate} />
                <AvgTransactionValCard date={selectedDate} />
                <GrossProfitCard date={selectedDate} />
                <GrossProfitMarginCard date={selectedDate} />
                <TopProductsCard date={selectedDate} />
                <NumberOfOrders date={selectedDate} />
            </div>
        </BasePage>
    )
}
