import { useState } from "react";
import TaskLayout from "@/layouts/TaskLayout";
import TaskForm from "@/components/custom/tasks/TaskForm";

export default function CreateTaskPage() {
  const handleCreateTask = (data) => {
    console.log("Task Created:", data);
  };

  // a normal post request with axios would work fine here

  return (
    <TaskLayout heading="Create Task">
      <TaskForm onSubmit={handleCreateTask} />
    </TaskLayout>
  );
}
