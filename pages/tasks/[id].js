import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import TaskLayout from "@/layouts/TaskLayout";
import axiosReq from "@/lib/axiosHandler";

// SSG would be most suitable here because we want to instantly see the task data rather than
// seeing a loading spinner

export async function getStaticPaths() {
  const res = await axiosReq("GET", "tasks");
  const tasks = res.data.data;

  // pre generate task pages
  const paths = tasks.map((task) => ({
    params: { id: task._id.toString() },
  }));

  return { paths, fallback: "blocking" };
}

export async function getStaticProps(context) {
  const { id } = context.params;

  try {
    const res = await axiosReq("GET", `tasks/${id}`);

    return {
      props: { task: res.data.data },
      revalidate: 10,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function TaskDetailPage({ task }) {
  return (
    <TaskLayout heading="Task Details">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:gap-2">
            <span className="font-medium">Title:</span>
            <span className="text-gray-600">{task.title}</span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <span className="font-medium">Description:</span>
            <p className="text-gray-600">{task.description}</p>
          </div>

          {/* Due Date */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <span className="font-medium text-gray-900">Due Date:</span>
            <span className="text-gray-600">{task.dueDate}</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
          </div>
        </CardContent>
      </Card>
    </TaskLayout>
  );
}
