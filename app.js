const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth")
const userRoute = require("./routes/users")
const movieRoute = require("./routes/movies")
const listRoute = require("./routes/lists")
app.use(express.json());

dotenv.config();

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Db connected"))
  .catch((err) => console.log(err));

app.use("/api/auth",authRoute)
app.use("/api/users",userRoute)
app.use("/api/movies",movieRoute)
app.use("/api/lists",listRoute)

app.listen(5000, () => {
  console.log("Server is running in Port 5000");
});
