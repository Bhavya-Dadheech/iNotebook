const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/INotebook";

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then((res) => {
      console.log("Connected To Mongo successfully");
    })
    .catch((err) => {
      console.log("Connection error");
      console.log(err);
    });
};

module.exports = connectToMongo;
