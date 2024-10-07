import { currentUser, fetchUser, getMatchedStudents } from "@/actions";
import ChatList from "@/components/ChatList";

import { redirect } from "next/navigation";

const Chats = async () => {
  const user = await currentUser();
  if (!user) redirect("/sign-up");

  const ProfileUser = await fetchUser(user?.userId);
  if (user && !ProfileUser?._id) {
    redirect("/onboard");
  }

  const data = await getMatchedStudents(ProfileUser?._id);

  return (
    <div className="">
      <ChatList chatlist={data} ProfileUser={ProfileUser} />
    </div>
  );
};

export default Chats;
