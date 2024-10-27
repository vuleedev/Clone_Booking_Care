import express from "express";
import cors from "cors"; // Import gói cors
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./router/web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();

// Cấu hình CORS
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log("Backend node running on the port: ", port);
});
