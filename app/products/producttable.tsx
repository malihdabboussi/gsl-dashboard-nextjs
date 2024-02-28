"use client";
import { Table, TableHead, TableHeader, TableRow, TableBody, TableCell } from "../components/ui/table";
import {
    ArrowDownIcon,
    ArrowUpIcon,
    CalendarIcon,
    CaretSortIcon
} from "@radix-ui/react-icons";
import {
    SortingState,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    getFilteredRowModel,
    ColumnDef
} from "@tanstack/react-table";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "../components/ui/dropdown-menu";
import React from "react";
import { Input } from "../components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";
import { format } from "date-fns/format";
import { DateRange } from "react-day-picker";
import { DataTableColumnHeaderProps } from "../types";

export function DataTable<TData, TValue>({
    columns, data, classNames
}: {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    classNames?: {
        parentDiv?: string,
        table?: {
            main?: string,
            header?: string,
            body?: string,
            cell?: string,
            row?: string,
        }
    }
}) {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [rowSelection, setRowSelection] = React.useState({});
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onRowSelectionChange: setRowSelection,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            rowSelection,
            columnFilters
        },
    });

    const MainCalendar = ({ event }: { event: "created" | "due" }) => {
        const getDate = () => {
            return table.getColumn(event)?.getFilterValue() as DateRange ?? null
        }

        const setDate = (newDate: DateRange) => {
            table.getColumn(event)?.setFilterValue(newDate)
        }

        return (
            <div className={"grid gap-2"}>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            id="date"
                            variant={"outline"}
                            className={cn(
                                "mix-w-[300px] justify-start text-left font-normal",
                                !getDate() && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {getDate()?.from ? (
                                getDate().to ? (
                                    <>
                                        {format(getDate().from, "LLL dd, y")} -{" "}
                                        {format(getDate().to, "LLL dd, y")}
                                    </>
                                ) : (
                                    format(getDate().from, "LLL dd, y")
                                )
                            ) : (
                                <span>Filter by {event} date</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={getDate()?.from}
                            selected={getDate()}
                            onSelect={
                                (newDate) => {
                                    setDate(newDate)
                                }
                            }
                            numberOfMonths={2}
                        />
                    </PopoverContent>
                </Popover>
            </div>
        )
    }

    return (
        <div>
            <div className="flex items-center gap-2 py-4">
                <Input
                    placeholder="Filter by product code"
                    value={(table.getColumn("code")?.getFilterValue() as number) ?? ""}
                    onChange={(event) => {
                        table.getColumn("code")?.setFilterValue(event.target.value)
                    }
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Filter by price"
                    value={(table.getColumn("price")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("price")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <MainCalendar event="created" />
            </div>
            <div className={"border rounded-md " + classNames?.parentDiv}>
                <Table className={classNames?.table?.main}>
                    <TableHeader className={classNames?.table?.header}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className={classNames?.table?.body}>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    className={classNames?.table?.row}
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell className={classNames?.table?.cell} key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow className={classNames?.table?.row}>
                                <TableCell className={"h-24 text-center " + classNames?.table?.cell} colSpan={columns.length} >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export function DataTableColumnHeader<TData, TValue>({
    column, title, className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn("flex items-center space-x-2", className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {column.getIsSorted() === "desc" ? (
                            <ArrowDownIcon className="w-4 h-4 ml-2" />
                        ) : column.getIsSorted() === "asc" ? (
                            <ArrowUpIcon className="w-4 h-4 ml-2" />
                        ) : (
                            <CaretSortIcon className="w-4 h-4 ml-2" />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        Desc
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}