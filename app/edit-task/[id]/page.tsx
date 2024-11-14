import EditTopicForm from "@/components/EditTopicForm";
import React from "react";

type Params = {
  params: {
    id: string;
  };
};

const getTaskById = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to load Topic");
    }

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export default async function EditTopic({ params }: Params) {
  const { id } = params;
  const { task } = await getTaskById(id);
  const { title, description } = task;
  return <EditTopicForm id={id} title={title} description={description} />;
}
