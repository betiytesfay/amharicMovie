
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.connect("mongodb+srv://amharic_mov:%2Bq%40H3c9Dfd%214DC7@cluster0.fhnckyx.mongodb.net/amharic_movies?retryWrites=true&w=majority")
      .then(() => {

        console.log("connected");
      })
  }
  catch (err) {
    console.log("connection failed")
  }
}
module.exports = connectDB;
