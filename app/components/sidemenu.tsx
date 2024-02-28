"use client"

import React from 'react';
import Icon from "../gslicon"
import { DocumentAlignLeftIcon, MenuIcon, SuperGroupIcon, TagIcon } from './icons';
import { details } from '../details';

export default function SideMenu({ current }: { current: number }) {

    const pages = [
        { name: "Home", icon: MenuIcon, link: "/", gap: "gap-x-[18px]" },
        { name: "Invoices", icon: DocumentAlignLeftIcon, link: "/invoices", gap: "gap-x-[18px]" },
        { name: "Customers", icon: SuperGroupIcon, link: "/customers", gap: "gap-x-[10px]" },
        { name: "Supplier", icon: SuperGroupIcon, link: "/suppliers", gap: "gap-x-[10px]" },
        { name: "Products", icon: TagIcon, link: "/products", gap: "gap-x-[18px]" },
    ]

    return <div className="sticky top-0 w-80 bg-muted min-h-screen h-full pl-16 py-6 flex flex-col gap-y-[50px]">
        <div className="ml-6 flex gap-x-2.5 items-center font-normal text-[#353A44]">
            <Icon width={28} height={28} viewbox='0 0 40 40' />
            <h1 className="text-[15px]">{details.company.name}</h1>
        </div>
        <ul className="mt-[6px] flex flex-col gap-y-7 text-[#687385] font-medium">
            {
                pages.map((page, index) => {
                    const Icon = page.icon
                    return <li key={index} className="flex gap-5" onClick={() => window.location.href = page.link}>
                        <hr className={`w-1 h-6 rounded-full border-none ${current === index ? "bg-[#337DE9]" : "bg-transparent"}`} />
                        <div className={`flex items-center cursor-pointer ${current === index ? "text-[#337DE9]" : ""} ${page.gap}`}>
                            <Icon fill={current === index ? "#337DE9" : "#687385"} />
                            <h1 className="text-[15px]">{page.name}</h1>
                        </div>
                    </li>
                })
            }
        </ul>
    </div>
}