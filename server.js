import express from "express"; // Express.js framework
import { createServer } from "http"; // For creating the server
import { Server } from "socket.io"; // Socket.IO server
import next from "next"; // Next.js for SSR

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new Server(server);

  // Handle Socket.IO connections
  io.on("connection", (socket) => {
    console.log("New client connected");

    // Handle incoming messages
    socket.on("message", (msg) => {
      console.log("Message received:", msg);
      io.emit("message", msg); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  // Serve Next.js pages
  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  // Start the server
  server.listen(3000, (err) => {
    if (err) throw err;
    console.log("> Ready on http://localhost:3000");
  });
});
