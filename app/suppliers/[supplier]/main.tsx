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


export default function ({ supplierId }: { supplierId: string; }) {
    const [supplier, setsupplier] = useState<Entity>(null);

    useEffect(() => {
        // START
        setsupplier(
            {
                id: "728ed52f",
                name: "supplier 1",
                phone: "1234567890",
                email: "supplier1@example.com",
                total: 1000,
                created: "2021-01-01",
                desc: "supplier 1 description",
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

    return <BasePage pageId={3}>
        <div className="flex flex-col gap-5">
            <span className="text-base font-normal text-[#337DE9]">Suppliers</span>
            {
                supplier && <Content supplier={supplier} />
            }
        </div>
    </BasePage>;
}
