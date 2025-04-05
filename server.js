const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: ".env.local" });

const authRoutes = require("./routes/auth.routes");

const app = express();
const port = 3000;

mongoose.set("strictQuery", false);
const mongodb = process.env.DB_URL;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongodb);
}

//Parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api/auth/", authRoutes);

app.listen(port, () => {
  console.log("server is running");
});
