import { currentUser, fetchOneBuddy, fetchUser } from "@/actions";
import BuddyProfileCard from "@/components/buddy-profile";
import { redirect } from "next/navigation";

export default async function UserProfile({ params }) {
  const { userID } = params;
  const user = await currentUser();
  if (!user) redirect("/sign-up");
  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const SearchBuddy = await fetchOneBuddy(userID);
  console.log(SearchBuddy);

  return (
    <div className="py-20 lg:py-auto">
      <BuddyProfileCard ProfileUser={ProfileUser} SearchBuddy={SearchBuddy} />
    </div>
  );
}
