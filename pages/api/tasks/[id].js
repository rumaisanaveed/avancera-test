import { connectDb } from "@/lib/db";
import Task from "@/models/task";

export default async function handler(req, res) {
  await connectDb();

  const { id } = req.query;

  if (req.method === "GET") {
    // GET /api/tasks/:id
    try {
      const task = await Task.findById(id);
      if (!task) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }
      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Error fetching task" });
    }
  } else if (req.method === "PUT") {
    // PUT /api/tasks/:id
    try {
      const { title, description, status, dueDate } = req.body;
      const updatedTask = await Task.findByIdAndUpdate(
        id,
        { title, description, status, dueDate },
        { new: true, runValidators: true }
      );

      if (!updatedTask) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }

      return res.status(200).json({ success: true, data: updatedTask });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else if (req.method === "DELETE") {
    // DELETE /api/tasks/:id
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
      if (!deletedTask) {
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });
      }
      return res
        .status(200)
        .json({ success: true, message: "Task deleted successfully" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }
}
