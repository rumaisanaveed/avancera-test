import { connectDb } from "@/lib/db";
import Task from "@/models/task";

export default async function handler(req, res) {
  if (req.method === "GET") {
    // GET /api/tasks

    try {
      await connectDb();
      const tasks = await Task.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: tasks });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, error: "Failed to fetch tasks" });
    }
  } else if (req.method === "POST") {
    // POST /api/tasks

    try {
      await connectDb();
      const { title, description, status, dueDate } = req.body;

      if (!title || !dueDate) {
        return res
          .status(400)
          .json({ error: "Title and due date are required" });
      }

      const task = await Task.create({ title, description, status, dueDate });
      return res.status(201).json({
        message: "Task created successfully",
        data: task,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
