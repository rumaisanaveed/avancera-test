import { useState } from "react";
import TasksTable from "@/components/custom/tasks/TasksTable";
import BlackHeading from "@/components/custom/typography/BlackHeading";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";
import { Input } from "@/components/ui/input";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);

export default function TasksPage() {
  const { data: tasks, error, mutate } = useSWR("/api/tasks", fetcher);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTasks = tasks?.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen w-full lg:w-11/12 mx-auto p-10 flex flex-col grow gap-6">
      <div className="flex items-center justify-between">
        <BlackHeading text="Tasks Manager" />
        <Link
          className="text-white font-light bg-black rounded-full text-base py-1 px-4 lg:px-8 lg:py-2 lg:text-lg"
          href="/tasks/create"
        >
          Create
        </Link>
      </div>

      <Input
        type="text"
        placeholder="Search by title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-[300px]"
      />

      <TasksTable
        data={filteredTasks}
        mutate={mutate}
        error={error}
        isLoading={!tasks}
      />
    </div>
  );
}
