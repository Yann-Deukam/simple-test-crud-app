"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

export default function EditTopicForm({ id, title, description }: any) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const router = useRouter();

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !description) {
      return (
        <AlertDialog>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>The fiels are empty</AlertDialogTitle>
              <AlertDialogDescription>
                Please fill all the fields
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      );
    }

    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (res.ok) {
        router.refresh();
        router.push("/");
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form action="" className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <Input
        placeholder="task name"
        className="rounded-none"
        type="text"
        onChange={handleTitle}
        value={newTitle}
      />
      <Textarea
        placeholder="task description"
        className="rounded-none h-[100px] "
        onChange={handleDescription}
        value={newDescription}
      />
      <Button className="rounded-none bg-green-600" type="submit">
        Update Task
      </Button>
    </form>
  );
}
