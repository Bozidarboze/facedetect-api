import bodyParser from "body-parser";
import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcrypt";
import register from "./controllers/register.js";
import signin from "./controllers/signin.js";
import image from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("It is working!");
});

app.post("/signin", signin.handleSignin(db, bcrypt));

app.post("/register", register.handleRegister(db, bcrypt));

app.put("/image", image.handleImage(db));

app.post("/imageurl", image.handleApiCall);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
