import mongoose from "mongoose";
async function DatabaseConn() {
  const Mongo_DB = process.env.DATABASE_LINK;

  mongoose
    .connect(Mongo_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
    })
    .then(() => {
      console.log("connected");
    })
    .catch(() => {
      console.log("disconnected");
    });
}

export default DatabaseConn;
