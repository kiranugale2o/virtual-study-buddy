import { currentUser, fetchUser, getMatchedStudents } from "@/actions";
import ChatCard from "@/components/buddyChat-card";
import ChatPage from "@/components/chatsocket";

import { redirect } from "next/navigation";

export default async function Chat({ params }) {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }
  const data = await getMatchedStudents(ProfileUser?._id);
  const { chatId } = params;
  return (
    <>
      <ChatPage user={user} ProfileUser={ProfileUser} buddyId={chatId} />
    </>
  );
}
