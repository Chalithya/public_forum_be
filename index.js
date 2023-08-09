require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const dbConnection = require("./config/db_conection");
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");
dbConnection();

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());
app.use("/user",userRoutes);
app.use("/post", postRoutes);

app.listen(4000, console.log("listening on http://localhost:4000"));
