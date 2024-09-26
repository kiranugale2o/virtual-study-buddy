"use client";

import { currentUser, fetchUser } from "@/actions";
import Navbar from "../Navbar";

export default function CommonLayout({ user, ProfileUser, children }) {
  return (
    <>
      {/* headers section */}
      <Navbar user={user} ProfileInfo={ProfileUser} />
      <main>{children}</main>
    </>
  );
}
