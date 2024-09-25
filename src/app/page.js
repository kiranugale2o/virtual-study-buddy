import { currentUser, fetchUser } from "@/actions";
import Image from "next/image";

import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  console.log(user);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  return <h1>home new</h1>;
}
