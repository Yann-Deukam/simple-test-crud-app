import connectMongodb from "@/lib/mongodb";
import Task from "@/models/task";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function PUT(request: NextRequest, { params }: Params) {
  const { id } = params;
  const { newTitle: title, newDescription: description } = await request.json();
  await connectMongodb();
  await Task.findByIdAndUpdate(id, { title, description });

  return NextResponse.json({ message: "task updated" }, { status: 200 });
}

export async function GET(request: NextRequest, { params }: Params) {
  const { id } = params;
  await connectMongodb();
  const task = await Task.findOne({ _id: id });

  return NextResponse.json({ task }, { status: 200 });
}
