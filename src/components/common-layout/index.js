"use client";

import { currentUser, fetchUser } from "@/actions";
import Navbar from "../Navbar";
import { usePathname } from "next/navigation";

export default function CommonLayout({ user, ProfileUser, children }) {
  const pathname = usePathname();

  return (
    <>
      {/* headers section */}
      <Navbar user={user} ProfileInfo={ProfileUser} />
      <main>{children}</main>
    </>
  );
}
