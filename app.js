const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/user-routes");
const app = express();
app.use(express.json());
//MongoDB password- JyL69foyjTvioHfK

//mongoose.connect returns a promise

app.use("/users", router);

mongoose
  .connect(
    "mongodb+srv://admin:JyL69foyjTvioHfK@cluster0.opvql.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000, () => console.log("listening on port 5000")))
  .catch((err) => console.log(err));
