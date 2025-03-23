require("dotenv").config();

const express = require("express");

const cors = require("cors");
const todoRouter = require("./routes/todo");
const app = express();
app.use(cors());

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routing the path
app.use("/", todoRouter);

app.listen(port);
