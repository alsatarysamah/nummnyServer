const express = require("express");
const cors = require("cors");
const morgan = require("morgan");


const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");

const userRoute=require("./routes/user")
const accountRouter=require("./routes/account")
const transactionRouter=require("./routes/transaction")


const app = express();
app.get("/", (req, res) => {
  res.send("Home");
});

app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
app.use(accountRouter);
app.use(transactionRouter);



// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
    server: app,
    startup: (port) => {
      app.listen(port, () => {
        console.log(`Server Up on ${port}`);
      });
    },
  };