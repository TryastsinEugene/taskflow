"use client"

import { CreateTaskModal } from "@/components/create-task-modal";
import { EditTaskModal } from "@/components/edit-task-modal";
import { TaskViewSwitcher } from "@/components/task-view-switcher";
import { NuqsAdapter  } from "nuqs/adapters/next/app";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="min-h-screen">
      <NuqsAdapter>
        <Suspense fallback="Loading..."></Suspense>
          <TaskViewSwitcher />    
          <CreateTaskModal /> 
          <EditTaskModal />
        </Suspense>
      </NuqsAdapter>
    </div>
     
  );
}
