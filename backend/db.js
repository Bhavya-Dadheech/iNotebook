const mongoose = require("mongoose");

const mongoURI = "mongodb://localhost:27017/INotebook";

const connectToMongoOpt = async () => {
  const options = { maxPoolSize: 10, useNewUrlParser: true, useUnifiedTopology: true };
  await mongoose
    .connect(mongoURI, options)
    .then((res) => {
      console.log("Connected To Mongo successfully");
    })
    .catch((err) => {
      console.log("Connection error");
      console.log(err);
    });
};

module.exports = connectToMongoOpt;
