import TaskLayout from "@/layouts/TaskLayout";
import TaskForm from "@/components/custom/tasks/TaskForm";
import axiosReq from "@/lib/axiosHandler";
import { toast } from "sonner";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EditTaskPage({ initialTask }) {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState(initialTask);
  const [isLoading, setIsLoading] = useState(false);

  const handleEditTask = async (updatedData) => {
    setIsLoading(true);
    try {
      const res = await axiosReq("PUT", `tasks/${id}`, updatedData);
      if (res.data.success) {
        toast.success("Task updated successfully!");
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to update task!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskLayout heading="Update Task">
      <TaskForm
        onSubmit={handleEditTask}
        initialValues={task}
        isEditing
        isLoading={isLoading}
      />
    </TaskLayout>
  );
}

// Used server side data fetching here for instant changes
export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const res = await axiosReq("GET", `tasks/${id}`);
    if (res.data.success) {
      // console.log(res.data.data);
      return { props: { initialTask: res.data.data } };
    }
  } catch (error) {
    return { props: { initialTask: null } };
  }
}
