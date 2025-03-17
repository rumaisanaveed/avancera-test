import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

export default function TaskForm({
  onSubmit,
  initialValues = {},
  isEditing = false,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: initialValues.title || "",
      description: initialValues.description || "",
      status: initialValues.status || "pending",
      dueDate: initialValues.dueDate || "",
    },
  });

  const dueDate = watch("dueDate");
  const [openCalendar, setOpenCalendar] = useState(false);

  register("dueDate", { required: "Due Date is required" });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="grid grid-cols-2 gap-y-6 gap-x-2">
        <div className="grid gap-2 col-span-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            {...register("title", { required: "Title is required" })}
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}
        </div>

        <div className="grid gap-2 col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register("description")}
            placeholder="Enter task description"
            className="min-h-[150px]"
          />
        </div>

        <div className="grid gap-2 col-span-1 w-full">
          <Label htmlFor="status">Status</Label>
          <Select
            defaultValue="pending"
            onValueChange={(value) =>
              setValue("status", value, { shouldValidate: true })
            }
          >
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

        <div className="grid gap-2 col-span-1 w-full">
          <Label htmlFor="dueDate">Due Date</Label>
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`w-full flex items-center justify-start text-left text-sm border rounded p-2 ${
                  errors.dueDate ? "border-red-500" : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dueDate
                  ? format(new Date(dueDate), "yyyy-MM-dd")
                  : "Pick a date"}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate ? new Date(dueDate) : null}
                onSelect={(date) => {
                  setValue("dueDate", date?.toISOString().split("T")[0], {
                    shouldValidate: true,
                  });
                  setOpenCalendar(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && (
            <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
          )}
        </div>
      </div>

      <Button type="submit" className="mt-4 w-full cursor-pointer">
        {isEditing ? "Update Task" : "Create Task"}
      </Button>
    </form>
  );
}
