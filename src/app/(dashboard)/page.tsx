
import { CreateTaskModal } from "@/components/create-task-modal";
import { EditTaskModal } from "@/components/edit-task-modal";
import { TaskViewSwitcher } from "@/components/task-view-switcher";
import { NuqsAdapter  } from "nuqs/adapters/next/app";


export default function Home() {
  return (
    <div className="min-h-screen">
      <NuqsAdapter>
        <TaskViewSwitcher />    
        <CreateTaskModal /> 
        <EditTaskModal />
      </NuqsAdapter>
    </div>
     
  );
}
