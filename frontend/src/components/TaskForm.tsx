"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
};

export default function TaskForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd(title);
    setTitle("");
  };

  return (
    <div className="flex gap-2 mb-6">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg 
                   text-gray-800 placeholder-gray-500 
                   focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow transition"
      >
        Add
      </button>
    </div>
  );
}