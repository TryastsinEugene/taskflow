"use client"

import { PlusIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { Separator } from "./ui/separator"
import { useCreateTaskModal } from "@/hooks/use-create-task-modal"
import { useQueryState } from "nuqs";
import { DataFilters } from "./data-filters";
import { useTaskFilters } from "@/hooks/use-task-filters";
import { useEffect, useState } from "react";
import axios from "axios";
import { Task } from "@/tasks/type";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { DataKanban } from "./data-kanban"
import { DataCalendar } from "./data-calendar"



export const TaskViewSwitcher = () => {
    const[{status}] = useTaskFilters();
    
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table"
    })
    const {open} = useCreateTaskModal();
    const [tasks, setTasks] = useState<Task[]>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
            const url = status
                ? `http://localhost:3500/tasks?status=${status}`
                : "http://localhost:3500/tasks";

            const response = await axios.get<Task[]>(url);
            setTasks(response.data); 
            setIsLoading(true);
            } catch (error) {
            console.error("Error fetching tasks", error);
            }
        };

  fetchTasks();
  
}, [status]);

    return(
        <Tabs
            defaultValue={view}
            onValueChange={setView} 
            className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col lg:flex-row gap-y-2 justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            Table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button size="sm"
                            className="w-full lg:w-auto"
                            onClick={open}>
                        <PlusIcon />
                        New
                    </Button>
                </div>
                <Separator className="my-4" />
                   <DataFilters />
                <Separator className="my-4" />
                <>
                    <TabsContent value="table" className="mt-0">
                        <DataTable columns={columns} data={tasks ?? []}/>
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        <DataKanban data={tasks ?? []}/>
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0">
                        <DataCalendar data={tasks ?? []}/>
                    </TabsContent>
                </>
            </div>
        </Tabs>
    )
}