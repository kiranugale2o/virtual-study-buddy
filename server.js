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

  const activeUsers = new Set(); // Use a Set to store unique active user IDs

  // Handle Socket.IO connections
  io.on("connection", (socket) => {
    console.log("New client connected", socket.id);
    // Handle incoming user data when a client connects
    socket.on("registerUser", (username) => {
      console.log("User registered:", username);
      // Optionally store the username with the socket id
      activeUsers.add({ id: socket.id, username });
      io.emit("activeUsers", Array.from(activeUsers)); // Update all clients with active users
    });
    // Handle incoming messages
    socket.on("sendmessage", (msg) => {
      console.log("Message received:", msg);
      io.emit("message", msg); // Broadcast message to all clients
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove user from active users
      activeUsers.delete(socket.id);
      io.emit("activeUsers", Array.from(activeUsers)); // Broadcast updated active users to all clients
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
