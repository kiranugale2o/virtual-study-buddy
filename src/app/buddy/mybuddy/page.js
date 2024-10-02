import { currentUser, fetchUser, getMatchedStudents } from "@/actions";
import MyBuddyCard from "@/components/my-buudy-card";
import { redirect } from "next/navigation";

export default async function MyBuddyPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  console.log(user);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const data = await getMatchedStudents(ProfileUser?._id);

  return <MyBuddyCard matchedBuddy={data} ProfileUser={ProfileUser} />;
}
