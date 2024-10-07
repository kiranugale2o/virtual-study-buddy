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
    <div className="main-container">
      <div className="w-1/3 max-lg:w-1/2 max-md:w-full">Chats</div>
      <ChatList chatlist={data} ProfileUser={ProfileUser} />
    </div>
  );
};

export default Chats;
