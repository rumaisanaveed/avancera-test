import TasksTable from "@/components/custom/tasks/TasksTable";
import BlackHeading from "@/components/custom/typography/BlackHeading";
import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

// axiosReq was causing the api route issue
const fetcher = (url) => axios.get(url).then((res) => res.data.data);

// server side rendering was causing issues here of mutating
export default function TasksPage() {
  const { data: tasks, error, mutate } = useSWR("/api/tasks", fetcher);

  if (error)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-red-600 text-lg font-semibold">
          Failed to load tasks. Please try again.
        </p>
      </div>
    );

  if (!tasks)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading tasks...
        </p>
      </div>
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
      <TasksTable data={tasks} mutate={mutate} />
    </div>
  );
}
