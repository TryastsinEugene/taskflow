import { Task } from "@/tasks/type";
import { useCallback, useState } from "react";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd"
import { KanbanCard } from "./kanban-card";
import axios from "axios";

interface DataKanbanProps{
    data: Task[];
}

const COLUMNS = [
    {id: "DONE", title: 'Done', status: true},
    {id: "UNDONE", title: 'Undone', status: false},
]

export const DataKanban = ({ data } : DataKanbanProps) => {
    const [tasks, setTasks] = useState<Task[]>(data);

    const onDragEnd = useCallback((result: DropResult) => {
        const { destination, source, draggableId } = result;

    // Якщо не кинули в колонку — нічого не робимо
    if (!destination) return;

    // Якщо таск впав у ту ж саму колонку на те ж місце
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Знаходимо колонку, куди таск упав
    const targetColumn = COLUMNS.find(
      (c) => c.id === destination.droppableId
    );

    if (!targetColumn) return;

     // ✅ Оновлюємо в UI
    setTasks((prev) =>
      prev.map((task) =>
        task._id === draggableId
          ? { ...task, status: targetColumn.status }
          : task
      )
    );

    try {
      // ✅ Відправляємо PATCH на бекенд
       axios.patch(`http://localhost:3500/tasks/${draggableId}/status`, {
        status: targetColumn.status,
      });
    } catch (error) {
      console.error("Failed to update task", error);
    }

    }, []);

    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex overflow-x-auto">
                {COLUMNS.map((column) => {
                    return(
                        <div key={column.id} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                            {column.title}
                        <Droppable droppableId={column.id}>
                            {(provided) => (
                                <div {...provided.droppableProps}
                                ref={provided.innerRef}
                                className="min-h-[200px] py-1.5"
                                >
                                    {tasks
                                    .filter((task) => task.status === column.status)
                                    .map((task, index) => (
                                        <Draggable
                                            key={task._id}
                                            draggableId={task._id}
                                            index={index}
                                            >
                                                {(provided) => (
                                                    <div ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    >
                                                        <KanbanCard task={task} />
                                                    </div>
                                                )}
                                        </Draggable>
                                    ))}
                                </div>
                            )}
                        </Droppable> 
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )
}