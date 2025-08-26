import { Task } from "@/tasks/type"
import { TaskActions } from "./task-actions"
import { MoreHorizontal } from "lucide-react"
import { Separator } from "./ui/separator"
import { TaskDate } from "./task-date"

interface KanbanCardProps{
    task: Task
}

export const KanbanCard = ({ task }:KanbanCardProps) => {
    return (
        <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3">
            <div className="flex items-start justify-between gap-x-2">
                <p className="text-sm line-clamp-2">{task.title}</p>
                <TaskActions id={task._id}>
                    <MoreHorizontal className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition"/>
                </TaskActions>
            </div>
            <Separator />
            <div className="flex flex-col items-start gap-x-1.5">
                <p className="text-sm line-clamp-2">{task.description}</p>
                <TaskDate value={task.dueDate.toString()} className="text-sm" />
            </div>
            
        </div>
    )
}