
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://amharic_mov:%2Bq%40H3c9Dfd%214DC7@cluster0.fhnckyx.mongodb.net/amharic_movies?retryWrites=true&w=majority");
    console.log("MongoDB connected:", conn.connection.host);
    return conn;
  } catch (err) {
    console.error("MongoDB connection failed:", err.message || err);
    throw err;
  }
}
module.exports = connectDB;
