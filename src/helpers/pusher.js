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
  appId: "1876708",
  key: "8ffb36d64a0c43c9c044",
  secret: "ddfa095b8efa75b8fd06",
  cluster: "ap2",
  useTLS: true,
});

export const pusherClient = new PusherClient("8ffb36d64a0c43c9c044", {
  cluster: "ap2",
});
