import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getStatusColor, truncateText } from "@/lib/utils";
import { tableHeaders } from "@/constants";
import { Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Badge } from "../../ui/badge";
import axiosReq from "@/lib/axiosHandler";
import { toast } from "sonner";
import { format } from "date-fns";

export default function TasksTable({ data, mutate, error, isLoading }) {
  return (
    <Table className="border border-gray-200 rounded p-8 w-full">
      <TableCustomHeader />
      <TableCustomBody
        tasks={data}
        mutate={mutate}
        error={error}
        isLoading={isLoading}
      />
    </Table>
  );
}

const TableCustomHeader = () => {
  return (
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

const TableCustomBody = ({ tasks, mutate, error, isLoading }) => {
  const router = useRouter();

  const handleTaskClick = (taskId) => {
    router.push(`/tasks/${taskId}`);
  };

  const handleDelete = async (e, taskId) => {
    e.stopPropagation();
    try {
      const res = await axiosReq("DELETE", `tasks/${taskId}`);

      if (res.data.success) {
        toast.success(res.data.message);
        mutate();
      }
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to delete task!");
    }
  };

  return (
    <TableBody>
      {error && (
        <TableRow>
          <TableCell
            colSpan={tableHeaders.length}
            className="text-center py-10 text-red-600 text-lg font-semibold"
          >
            Failed to load tasks. Please try again.
          </TableCell>
        </TableRow>
      )}

      {isLoading && !error && (
        <TableRow>
          <TableCell
            colSpan={tableHeaders.length}
            className="text-center py-10 text-gray-600 text-lg font-medium animate-pulse"
          >
            Loading tasks...
          </TableCell>
        </TableRow>
      )}

      {!isLoading && !error && tasks?.length === 0 && (
        <TableRow>
          <TableCell
            colSpan={tableHeaders.length}
            className="text-center py-10 text-3xl font-medium"
          >
            No Tasks Found!
          </TableCell>
        </TableRow>
      )}

      {!isLoading &&
        !error &&
        tasks?.length > 0 &&
        tasks.map(({ _id: taskId, title, description, dueDate, status }) => (
          <TableRow key={taskId} className="text-gray-500">
            <TableCell
              className="cursor-pointer"
              onClick={() => handleTaskClick(taskId)}
            >
              {title}
            </TableCell>

            <TableCell
              className="cursor-pointer truncate max-w-xs"
              title={description}
              onClick={() => handleTaskClick(taskId)}
            >
              {truncateText(description)}
            </TableCell>

            <TableCell
              className="cursor-pointer"
              onClick={() => handleTaskClick(taskId)}
            >
              <Badge className={getStatusColor(status)}>{status}</Badge>
            </TableCell>

            <TableCell
              className="cursor-pointer"
              onClick={() => handleTaskClick(taskId)}
            >
              {format(new Date(dueDate), "yyyy-MM-dd")}
            </TableCell>

            <TableCell>
              <div className="flex items-center gap-3">
                <Link
                  className="text-blue-600 hover:text-blue-800"
                  href={`/tasks/${taskId}/edit`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Pencil size={16} />
                </Link>
                <button
                  className="text-red-600 hover:text-red-800 cursor-pointer"
                  type="submit"
                  onClick={(e) => handleDelete(e, taskId)}
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
