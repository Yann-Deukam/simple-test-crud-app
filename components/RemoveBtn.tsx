"use client";

import { Trash2 } from "lucide-react";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { useRouter } from "next/navigation";

interface RemoveBtnProps {
  id: string; // Accept `id` as a string prop
}

export default function RemoveBtn({ id }: RemoveBtnProps) {
  const router = useRouter();
  const removeTask = async () => {
    const res = await fetch(`http://localhost:3000/api/tasks?id=${id}`, {
      method: "DELETE",
    });
    if (res.ok) router.refresh();
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger>
          <span className="text-red-400 hover:text-red-500 transition-all ease-in-out duration-100">
            <Trash2 size={24} />
          </span>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              task.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700 transition-all duration-100 ease-in-out"
              onClick={removeTask}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
