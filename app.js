const cors = require("cors");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes = require("./routes/index");
const errorhandler = require("./middlewares/errorHandler");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cloudinary = require("./config/cloudinary");

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

mongoose.connect("mongodb+srv://adibwafi:Aksesbebas123@sewamotor.38vyhzk.mongodb.net/StartupCampus?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/", routes);
app.use(errorhandler);
app.use(cloudinary.config);

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  app.listen(PORT, () => {
    console.log(`Successfully connect to MongoDB:`, PORT);
  });
});

module.exports = app;
