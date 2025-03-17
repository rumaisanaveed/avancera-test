import TaskLayout from "@/layouts/TaskLayout";
import TaskForm from "@/components/custom/tasks/TaskForm";
import { useParams } from "next/navigation";

export default function EditTaskPage() {
  const { taskId } = useParams();

  // fetch the relevant task by id

  const existingTask = {
    title: "Update Website UI",
    description: "Redesign the homepage",
    status: "in-progress",
    dueDate: "2024-09-01",
  };

  // put request would work fine here

  const handleUpdateTask = (data) => {
    console.log("Task Updated:", data);
  };

  return (
    <TaskLayout heading="Update Task">
      <TaskForm
        onSubmit={handleUpdateTask}
        initialValues={existingTask}
        isEditing
      />
    </TaskLayout>
  );
}
