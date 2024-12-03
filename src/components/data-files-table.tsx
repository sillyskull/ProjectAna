"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

export type Case = {
    accused: string;
    sources: string[];
    status: "In Progress" | "Completed";
    case_id: number; // Should take numeric input
};


const data: Case[] = [
    {
        case_id: 101,
        accused: "John Doe",
        sources: ["Facebook", "Twitter"],
        status: "In Progress",
    },
    {
        case_id: 102,
        accused: "Jane Smith",
        sources: ["Instagram", "Telegram", "WhatsApp"],
        status: "In Progress",
    },
    {
        case_id: 103,
        accused: "Michael Johnson",
        sources: ["Google", "Facebook"],
        status: "Completed",
    },
    {
        case_id: 104,
        accused: "Emily Davis",
        sources: ["Instagram"],
        status: "In Progress",
    },
    {
        case_id: 105,
        accused: "Robert Brown",
        sources: ["Twitter", "Telegram"],
        status: "In Progress",
    },
    {
        case_id: 106,
        accused: "Sarah Wilson",
        sources: ["WhatsApp", "Facebook", "Instagram"],
        status: "Completed",
    },
];


export const columns: ColumnDef<Case>[] = [
    {
        accessorKey: "accused",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("accused")}</div>,
    },
    {
        accessorKey: "sources",
        header: "Sources",
        cell: ({ row }) => {
            const sources = row.getValue<string[]>("sources");
            return (
                <div className="flex gap-2">
                    {sources.map((source) => (
                        <Badge key={source} variant="secondary">
                            {source}
                        </Badge>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue<"In Progress" | "Completed">("status");
            const statusColor = status === "In Progress" ? "inprogress" : "analysed";

            return <Badge variant={statusColor}>{status}</Badge>;
        },
    },
    {
        accessorKey: "case_id",
        header: "Case ID",
        cell: () => {
            return (
                <Input
                    type="text"
                    onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, ""); // Only allow numbers
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                        const newValue = e.target.value;
                        console.log("New Case ID:", newValue);
                    }}
                    className="w-24"
                />
            );
        },
    }
    ,
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const caseData = row.original;

            return (
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleLink(caseData)}>
                        Link
                    </Button>
                </div>
            );
        },
    },
];

// Callback Function for Link Button
const handleLink = (caseData: Case) => {
    console.log("Linking case:", caseData);
    // Add your linking logic here
};

export function DataFileTable() {

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("accused")?.getFilterValue() as string) ?? ""}
                    onChange={(event: any) =>
                        table.getColumn("accused")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value: any) => column.toggleVisibility(!!value)}
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
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
