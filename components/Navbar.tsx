import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="relative">
      <nav className="flex justify-between items-center px-8 py-3 bg-zinc-800 fixed top-0 left-0 right-0 m-3 drop-shadow-md">
        <Link href="/" className="font-bold text-white">
          Brand
        </Link>
        <Button className="bg-zinc-50 text-zinc-950 hover:text-white rounded-none">
          <Link href={"/add-topic"}>Add a task</Link>
        </Button>
      </nav>
    </div>
  );
}
