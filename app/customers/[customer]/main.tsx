"use client"

import { useState, useEffect } from "react";
import { Entity } from "../../types";
import BasePage from "../../base";
import { Content } from "./content";
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


export default function ({ customerId }: { customerId: string; }) {
    const [customer, setCustomer] = useState<Entity>(null);

    useEffect(() => {
        // START
        setCustomer(
            {
                id: "728ed52f",
                name: "Customer 1",
                phone: "1234567890",
                email: "customer1@example.com",
                total: 1000,
                created: "2021-01-01",
                desc: "Customer 1 description",
                creditLimitDuration: [new Date("2021-01-01"), new Date("2021-12-31")],
                balance: 100,
                billingInfo: {
                    address: {
                        country: "India",
                        lines: ["line 1", "line 2"],
                        town: "town",
                        postalCode: 123456,
                    },
                    phone: {
                        country: {
                            id: "123",
                            code: 91,
                        },
                        phoneNumber: 1234567890,
                    },
                },
            }
        );
        // END
    }, []);

    return <BasePage pageId={0}>
        <div className="flex flex-col gap-5">
            <span className="text-base font-normal text-[#337DE9]">Customers</span>
            {
                customer && <Content customer={customer} />
            }
        </div>
    </BasePage>;
}
