"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import API from "../../lib/api";
import toast from "react-hot-toast";
import TaskForm from "../../components/TaskForm";
import Navbar from "../../components/Navbar";

type Task = {
  id: string;
  title: string;
  status: boolean;
};

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  // ✅ NEW STATES
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const router = useRouter();

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) router.push("/login");
  }, [router]);

  // 🔹 Fetch tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Create task
  const createTask = async (title: string) => {
    try {
      const res = await API.post("/tasks", { title });
      setTasks((prev) => [res.data, ...prev]);
      toast.success("Task added");
    } catch {
      toast.error("Error adding task");
    }
  };

  // 🔹 Toggle task
  const toggleTask = async (id: string) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id ? { ...task, status: !task.status } : task
        )
      );

      await API.patch(`/tasks/${id}/toggle`);
    } catch {
      toast.error("Error updating task");
      fetchTasks();
    }
  };

  // 🔹 Delete task
  const deleteTask = async (id: string) => {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      await API.delete(`/tasks/${id}`);
      toast.success("Deleted");
    } catch {
      toast.error("Error deleting task");
      fetchTasks();
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ✅ FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    if (filter === "completed") return matchesSearch && task.status;
    if (filter === "pending") return matchesSearch && !task.status;

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-gray-100">
      
      <Navbar />

      <div className="p-6">
        <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-md p-6 rounded-xl shadow-lg">
          
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Task Dashboard 🚀
          </h1>

          {/* 🔹 Task Form */}
          <TaskForm onAdd={createTask} />

          {/* ✅ SEARCH + FILTER UI */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                         text-gray-800 placeholder-gray-500 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-800"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
            </select>
          </div>

          {/* 🔹 Loading */}
          {loading ? (
            <p className="text-center text-gray-600">Loading...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-center text-gray-500">No tasks found</p>
          ) : (
            <div className="space-y-3">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
                >
                  <span
                    className={`text-lg font-medium ${
                      task.status
                        ? "line-through text-gray-400"
                        : "text-gray-800"
                    }`}
                  >
                    {task.title}
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-md text-sm shadow transition"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm shadow transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}