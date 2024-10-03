import {
  currentUser,
  fetchUser,
  getMatchedStudents,
  GetMyPostedNotes,
} from "@/actions";
import ProfilePage from "@/components/Profile";
import { redirect } from "next/navigation";

export default async function Profile() {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  console.log(user);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const myNotes = await GetMyPostedNotes(ProfileUser?._id);
  const matchedBuddy = await getMatchedStudents(ProfileUser?._id);
  return (
    <ProfilePage
      ProfileUser={ProfileUser}
      myNotes={myNotes}
      matchedBuddy={matchedBuddy}
    />
  );
}
