"use client"

import { PencilIcon, TrashIcon } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEditTaskModal } from "@/hooks/use-edit-task-model";

interface TaskActionsProps{
    id: string;
    children: React.ReactNode;
    
}



export const TaskActions = ({id, children}: TaskActionsProps) => {

    const { open } = useEditTaskModal();

    const router = useRouter();

    async function deleteTask(id: string){
        await axios.delete(`https://taskflow-api-lcfd.onrender.com/tasks/${id}`)
        toast.success("Task deleted");
        router.refresh();
    }

    return(
        <div className="flex justify-end">
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <PencilIcon className="size-4 mr-2 stroke-2 text-yellow-400"/>
                            Edit
                    </DropdownMenuItem>
                     <DropdownMenuItem
                        onClick={() => deleteTask(id)}
                        disabled={false}
                        className="font-medium p-[10px]"
                    >
                        <TrashIcon className="size-4 mr-2 stroke-2 text-amber-700"/>
                            Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}