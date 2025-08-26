"use client"

import { Task } from "@/tasks/type"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "./ui/button"
import { ArrowUpDown, MoreVertical } from "lucide-react"
import { TaskDate } from "./task-date"
import { Badge } from "./ui/badge"
import { TaskActions } from "./task-actions"

export const columns: ColumnDef<Task>[] = [
    {
        accessorKey: "title",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Title
            <ArrowUpDown className="h-4 w-4" />
            </Button>
        )
        },
        cell: ({row}) => {
            const title = row.original.title;

            return <p className="line-clamp-1">{title}</p>
        }
    },
    {
        accessorKey: "description",
        header: "Description",
        cell: ({row}) => {
            const description = row.original.description;

            return <p className="line-clamp-1">{description}</p>
        }
    },
    {
        accessorKey: "priority",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Priority
            <ArrowUpDown className="h-4 w-4" />
            </Button>
        )
        },
        cell: ({row}) => {
            const priority = row.original.priority;

            return <p className="text-center">{priority}</p>
        }
    },
    {
        accessorKey: "dueDate",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            DueDate
            <ArrowUpDown className="h-4 w-4" />
            </Button>
        )
        },
        cell: ({row}) => {
            const dueDate = row.original.dueDate.toString();

            return <TaskDate value={dueDate} />
        }
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
        return (
            <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
            Status
            <ArrowUpDown className="h-4 w-4" />
            </Button>
        )
        },
        cell: ({row}) => {
            const status = row.original.status.toString();

            return <Badge variant={status === "true" ? "done" : "undone"}>{status === "true" ? "Done" : "Undone"}</Badge>
        }
    },
    {
        id: "actions",
        cell: ({row}) => {
            const id = row.original._id;

            return (
                <TaskActions id={id} >
                    <Button variant="ghost" className="size-8 p-0">
                        <MoreVertical className="size-4" />
                    </Button>
                </TaskActions>
            )
        }
    }
]