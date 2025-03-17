import TasksTable from "@/components/custom/tasks/TasksTable";
import BlackHeading from "@/components/custom/typography/BlackHeading";
import Link from "next/link";

export default function TasksPage() {
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
      <TasksTable />
    </div>
  );
}
