import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getStatusColor } from "@/lib/utils";
import TaskLayout from "@/layouts/TaskLayout";
import { useParams } from "next/navigation";

export default function TaskDetailPage() {
  // use SSG for pre fetching the potential task pages
  const status = "completed";

  const { taskId } = useParams();

  // fetch the relevant task

  return (
    <TaskLayout heading="Task Details">
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <span className="font-medium">Title:</span>
            <span className="text-gray-600">Launch Marketing Campaign</span>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <span className="font-medium">Description:</span>
            <p className="text-gray-600">
              We need to finalize and launch the new social media marketing
              campaign for our upcoming product release. This includes designing
              promotional graphics, scheduling posts, and collaborating with the
              content team for engaging copy. Ensure all materials are reviewed
              and approved before the deadline.
            </p>
          </div>

          {/* Due Date */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
            <span className="font-medium text-gray-900">Due Date:</span>
            <span className="text-gray-600">2025-33-23</span>
          </div>

          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="font-medium">Status:</span>
            <Badge className={getStatusColor(status)}>{status}</Badge>
          </div>
        </CardContent>
      </Card>
    </TaskLayout>
  );
}
