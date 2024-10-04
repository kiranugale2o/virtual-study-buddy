import mongoose from "mongoose";
mongoose.set("strictPopulate", false);
async function DatabaseConn() {
  const Mongo_DB = process.env.DATABASE_LINK;

   const mongoose = require('mongoose');

let isConnected; // Track the connection status


    if (isConnected) {
        return; // Use existing connection
    }

    await mongoose.connect(Mongo_DB);
    isConnected = true; // Set connection status



  
  
  // mongoose
  //   .connect(Mongo_DB, { useNewUrlParser: true, useUnifiedTopology: true })
  //   .then(() => {
  //     console.log("Database connected successfully.");
  //   })
  //   .catch((error) => {
  //     console.error("Error connecting to database:", error);
  //   });

  // // Optional: Check connection status with Mongoose event listeners
  // mongoose.connection.on("connected", () => {
  //   return;
  //   console.log("Mongoose connected to the database.");
  // });

  // mongoose.connection.on("error", (err) => {
  //   console.error(`Mongoose connection error: ${err}`);
  // });

  // mongoose.connection.on("disconnected", () => {
  //   console.log("Mongoose disconnected from the database.");
  // });
}

export default DatabaseConn;
