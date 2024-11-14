import React from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { Edit } from "lucide-react";

interface Task {
  _id: string;
  title: string;
  description: string;
}

const getTask = async (): Promise<{ tasks: Task[] }> => {
  try {
    const res = await fetch("http://localhost:3000/api/tasks", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load Tasks");
    }

    const data = await res.json();

    return { tasks: data.tasks || [] };
  } catch (error) {
    console.log("Error loading tasks:", error);
    return { tasks: [] };
  }
};

export default async function TaskList() {
  const { tasks } = await getTask();
  return (
    <>
      {tasks.map((task: Task) => (
        <div
          key={task._id}
          className="p-4 border border-slate-400/50 my-3 flex justify-between gap-5 items-start "
        >
          <div className="">
            <h2 className="font-bold text-2xl"> {task.title}</h2>
            <div className="text-zinc-500 text-normal">{task.description} </div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn id={task._id} />
            <Link href={`/edit-task/${task._id}`}>
              <Edit size={22} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}
