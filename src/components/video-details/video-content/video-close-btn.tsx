"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function VideoCloseBtn() {
  const params = useParams();
  const username = params.username as string;

  return (
    <Link href={`/@${username}`}>
      <IoClose className="absolute top-5 left-5 bg-input rounded-full text-3xl p-0.5 cursor-pointer" />
    </Link>
  );
}
