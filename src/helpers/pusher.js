import PusherServer from "pusher";
import PusherClient from "pusher-js";

// export const pusherServer = new PusherServer({
//   app_id: "1875413",
//   key: "4eaa06251960e1a80490",
//   secret: "6a2b8f796e64bb91276e",
//   cluster: "ap2",
//   useTLS: true,
// });
// app_id = "1875413"
// key = "4eaa06251960e1a80490"
// secret = "6a2b8f796e64bb91276e"
// cluster = "ap2"

export const pusherServer = new PusherServer({
  appId: "1876038",
  key: "754c92de6c8df3b3a733",
  secret: "c112d5e49d6b23b9a9ac",
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient("754c92de6c8df3b3a733", {
  cluster: "ap2",
});
