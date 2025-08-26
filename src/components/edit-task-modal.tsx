"use client";

import { useEditTaskModal } from "@/hooks/use-edit-task-model"
import { ResponsiveModal } from "./responsive-modal";
import { EditTaskForm } from "./edit-task-form";

export const EditTaskModal = () => {
    const {taskId, close} = useEditTaskModal();

    return(
        <ResponsiveModal open={!!taskId} onOpenChange={close}>
            {taskId && (
                <EditTaskForm onCancel={close} taskId={taskId}/>
            )}
        </ResponsiveModal>
    )
}