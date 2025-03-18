import { useEffect, useState } from "react";
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
import { Loader2 } from "lucide-react";

export default function TaskForm({
  onSubmit,
  initialValues = {},
  isEditing = false,
  isLoading,
}) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [openCalendar, setOpenCalendar] = useState(false);

  // register here coz the error for this field was missing
  useEffect(() => {
    register("dueDate", { required: "Due Date is required" });
  }, [register]);

  // to pre-fill the form with the previous values
  useEffect(() => {
    reset({
      title: initialValues?.title || "",
      description: initialValues?.description || "",
      status: initialValues?.status || "pending",
      dueDate: initialValues?.dueDate || "",
    });
  }, [
    // it was causing unnecessary re-renders
    // fix : pass them individually
    reset,
    JSON.stringify(initialValues),
  ]);

  const dueDate = watch("dueDate");

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
          {errors.title && <ShowErrorMessage message={errors.title.message} />}
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
            defaultValue={initialValues?.status || "pending"}
            onValueChange={(value) => {
              setValue("status", value, { shouldValidate: true });
            }}
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
                  const formattedDate = date?.toISOString().split("T")[0];
                  if (formattedDate !== dueDate) {
                    setValue("dueDate", formattedDate, {
                      shouldValidate: true,
                    });
                  }
                  setOpenCalendar(false);
                }}
              />
            </PopoverContent>
          </Popover>
          {errors.dueDate && (
            <ShowErrorMessage message={errors.dueDate.message} />
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="mt-4 w-full flex justify-center items-center cursor-pointer disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="animate-spin h-5 w-5 text-white" />
        ) : isEditing ? (
          "Update Task"
        ) : (
          "Create Task"
        )}
      </Button>
    </form>
  );
}

const ShowErrorMessage = ({ message }) => {
  return (
    <>
      <p className="text-red-500 text-sm">{message}</p>
    </>
  );
};
