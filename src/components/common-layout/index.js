"use client";

import Navbar from "../Navbar";

export default function CommonLayout({ children }) {
  return (
    <>
      {/* headers section */}
      <Navbar />
      <main>{children}</main>
    </>
  );
}
