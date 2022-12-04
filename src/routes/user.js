const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { userCollection } = require("../models/index");
const userRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

userRouter.get("/user",   getAll);
userRouter.post("/user",  creatRecord);
userRouter.put("/user/:id",  updating);
userRouter.delete("/user/:id",  deleting);
userRouter.get("/user/:name",  getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newuser = req.body;
  let newRecored = await userCollection.create(newuser);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let users = await userCollection.read();
  res.status(200).json(users);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await userCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await userCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await userCollection.read(id);
  res.status(200).json(recored);
}
module.exports = userRouter;
