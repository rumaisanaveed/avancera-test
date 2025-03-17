import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns/format";
import TaskLayout from "@/layouts/TaskLayout";

export default function EditTaskPage() {
  const [status, setStatus] = useState("pending");
  const [registering, setRegistering] = useState(false);
  const [dueDate, setDueDate] = useState(null);

  return (
    <TaskLayout heading="Update Task">
      <form className="w-full">
        <div className="grid grid-cols-2 gap-y-6 gap-x-2">
          {/* Title */}
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" placeholder="Enter task title" />
          </div>

          {/* Description */}
          <div className="grid gap-2 col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter task description"
              className="min-h-[150px]"
            />
          </div>

          {/* Status Dropdown */}
          <div className="grid gap-2 col-span-1 w-full">
            <Label htmlFor="status">Status</Label>
            <Select value={status} onValueChange={setStatus} className="w-full">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent className="w-full">
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* date picker */}
          <div className="grid gap-2 col-span-1 w-full">
            <Label htmlFor="dueDate">Due Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className={cn(
                    "w-full flex items-center justify-start text-left text-sm border rounded p-2",
                    !dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, "yyyy-MM-dd") : "Pick a date"}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dueDate}
                  onSelect={setDueDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full col-span-2"
            disabled={registering}
          >
            Update Task
          </Button>
        </div>
      </form>
    </TaskLayout>
  );
}
