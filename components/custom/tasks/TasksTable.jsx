import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor, truncateText } from "@/lib/utils";
import { tableHeaders, tasks } from "@/constants";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge } from "../../ui/badge";

// server side rendering due to the changing of tasks again and again

export default function TasksTable() {
  return (
    <Table className="border border-gray-200 rounded p-8 w-full">
      <TableCustomHeader />
      <TableCustomBody />
    </Table>
  );
}

const TableCustomHeader = () => {
  return (
    // TODO : Align them horizontally
    <TableHeader>
      <TableRow>
        {tableHeaders.map((header, index) => (
          <TableHead key={index} className="text-left">
            <div className="flex items-center gap-1">
              <header.icon size={16} />
              <p>{header.text}</p>
            </div>
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
};

const TableCustomBody = () => {
  const router = useRouter();
  const handleTaskClick = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };
  const handleDelete = (e, taskId) => {
    e.stopPropagation();
    console.log(`Task ${taskId} deleted!`);
  };
  return (
    <TableBody>
      {tasks.map((task) => (
        <TableRow key={task.id} className="text-gray-500">
          <TableCell
            className="cursor-pointer"
            onClick={() => handleTaskClick(task.id)}
          >
            {task.title}
          </TableCell>

          <TableCell
            className="cursor-pointer truncate max-w-xs"
            title={task.description}
            onClick={() => handleTaskClick(task.id)}
          >
            {truncateText(task.description)}
          </TableCell>

          <TableCell
            className="cursor-pointer"
            onClick={() => handleTaskClick(task.id)}
          >
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </TableCell>

          <TableCell
            className="cursor-pointer"
            onClick={() => handleTaskClick(task.id)}
          >
            {task.dueDate}
          </TableCell>

          <TableCell>
            <div className="flex items-center gap-3">
              <Link
                className="text-blue-600 hover:text-blue-800"
                href={`/tasks/${task.id}/edit`}
                onClick={(e) => e.stopPropagation()}
              >
                <Pencil size={16} />
              </Link>
              <button
                className="text-red-600 hover:text-red-800"
                type="submit"
                onClick={(e) => handleDelete(e, task.id)}
              >
                <Trash size={16} />
              </button>
            </div>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};
