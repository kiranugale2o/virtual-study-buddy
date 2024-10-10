import { currentUser, fetchAllBuddys, fetchUser } from "@/actions";
import FindBuddy from "@/components/find-buddy";
import FooterCard from "@/components/Footer";
import { redirect } from "next/navigation";

export default async function BuddyPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  console.log(user);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const buddys = await fetchAllBuddys();
  return (
    <div className="py-20 lg:py-0">
      <FindBuddy user={user} ProfileUser={ProfileUser} buddys={buddys} />;
      <FooterCard />
    </div>
  );
}
