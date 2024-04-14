import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import Routes from "../routes/mainRoutes.mjs";
import { dbConnection } from "../database/db.mjs";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 5001;

let corsOptions = {
  origin: ["https://movie-mate-frontend.vercel.app","http://localhost:3000"],
  methods: "GET, POST, PUT, DELETE, PATCH",
  credentials: true,
};

app.use("*", cors(corsOptions));
app.use(express.json());
app.use(
  session({
    secret: "amrutha1701",
    resave: false,
    saveUninitialized: false,
  })
);
app.use("/api/auth/", Routes);

dbConnection();

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
