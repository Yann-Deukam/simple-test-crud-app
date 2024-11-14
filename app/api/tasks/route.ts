import connectMongodb from "@/lib/mongodb";
import Task from "@/models/task";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { title, description } = await request.json();
  await connectMongodb();
  await Task.create({ title, description });

  return NextResponse.json(
    { message: "Task created successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectMongodb();
  const tasks = await Task.find().sort({ createdAt: -1 });

  return NextResponse.json({ tasks });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongodb();
  await Task.findByIdAndDelete(id);

  return NextResponse.json({ message: "task deleted" }, { status: 200 });
}
