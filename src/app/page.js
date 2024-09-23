import { currentUser } from "@/actions";
import Image from "next/image";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");
  return <h1>home</h1>;
}
