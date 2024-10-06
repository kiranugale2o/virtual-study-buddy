"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ChatList({ chatlist }) {
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col p-24">
        {chatlist && chatlist.length > 0 ? (
          <>
            {chatlist.map((d) => {
              return (
                <Link href={`/chat/${d._id}`}>
                  <div className="flex text-1xl border bg-red-600">
                    {d.fullName}
                  </div>
                </Link>
              );
            })}
          </>
        ) : null}
      </div>
    </>
  );
}
