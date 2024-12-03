"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
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

const data: Case[] = [
    {
        case_id: 101,
        accused: "John Doe",
        sources: ["Facebook", "Twitter"],
        analysis_status: "Not Analysed",
    },
    {
        case_id: 102,
        accused: "Jane Smith",
        sources: ["Instagram", "Telegram", "WhatsApp"],
        analysis_status: "In progress",
    },
    {
        case_id: 103,
        accused: "Michael Johnson",
        sources: ["Google", "Facebook"],
        analysis_status: "Analysed",
    },
    {
        case_id: 104,
        accused: "Emily Davis",
        sources: ["Instagram"],
        analysis_status: "Not Analysed",
    },
    {
        case_id: 105,
        accused: "Robert Brown",
        sources: ["Twitter", "Telegram"],
        analysis_status: "In progress",
    },
    {
        case_id: 106,
        accused: "Sarah Wilson",
        sources: ["WhatsApp", "Facebook", "Instagram"],
        analysis_status: "Analysed",
    },
];


export type Case = {
    case_id: number;
    accused: string;
    sources: string[]; 
    
    analysis_status: "Not Analysed" | "Analysed" | "In progress";
};

export const columns: ColumnDef<Case>[] = [
    {
        accessorKey: "case_id",
        header: "Case ID",
        cell: ({ row }) => <div>{row.getValue("case_id")}</div>,
    },
    {
        accessorKey: "accused",
        header: "Name",
        cell: ({ row }) => <div>{row.getValue("accused")}</div>,
    },
    {
        accessorKey: "sources",
        header: "Sources",
        cell: ({ row }) => {
            const sources = row.getValue("sources") as string[];
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
        accessorKey: "analysis_status",
        header: "Analysis Status",
        cell: ({ row }) => {
            const status = row.getValue("analysis_status") as string;
            const statusColor =
                status === "Not Analysed"
                    ? "notanalysed"
                    : status === "In progress"
                        ? "inprogress"
                        : "analysed";

            return <Badge variant={statusColor}>{status}</Badge>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const caseData = row.original;

            return (
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() =>
                                    navigator.clipboard.writeText(caseData.case_id.toString())
                                }
                            >
                                Copy Case ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Case Details</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    {/* New Analyze Button */}
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAnalyze(caseData)}
                    >
                        Analyze
                    </Button>
                </div>
            );
        },
    },
];

// Callback Function for Analyze Button
const handleAnalyze = (caseData: Case) => {
    console.log("Analyzing case:", caseData);
    // Add your analysis logic here
};



export function CaseDataTable() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("accused")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
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
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
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
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
