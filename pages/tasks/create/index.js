import TaskLayout from "@/layouts/TaskLayout";
import TaskForm from "@/components/custom/tasks/TaskForm";
import { useRouter } from "next/router";
import { toast } from "sonner";
import useSWR from "swr";
import { useState } from "react";
import axiosReq from "@/lib/axiosHandler";

export default function CreateTaskPage() {
  const router = useRouter();
  const { mutate } = useSWR("/api/tasks");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateTask = async (data) => {
    setIsLoading(true);
    try {
      const response = await axiosReq("POST", "tasks", data);
      if (response.status === 201) {
        toast.success("Task created successfully!");
        mutate();
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to create task");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskLayout heading="Create Task">
      <TaskForm onSubmit={handleCreateTask} isLoading={isLoading} />
    </TaskLayout>
  );
}
