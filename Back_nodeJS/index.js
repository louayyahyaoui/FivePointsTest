require("./config/db");
const express = require("express");
const bodyParser = require("body-parser");

const UserRouter = require("./routes/UserRoutes.js");
const SujetRouter = require("./routes/SujetRoutes.js");
const VoteRouter = require("./routes/VoteRoutes.js");





const http = require("http");
const port = 5000;
const cors = require("cors");
const app = express();


app.use(cors());

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use("/user", UserRouter);
app.use("/sujet", SujetRouter);
app.use("/vote", VoteRouter);

const server = http.createServer(app);

server.listen(port, () => console.log(`Listening on port ${port}`));