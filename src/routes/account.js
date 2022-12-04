const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { accountsCollection } = require("../models/index");
const accountRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

accountRouter.get("/account",   getAll);
accountRouter.post("/account",  creatRecord);
accountRouter.put("/account/:id",  updating);
accountRouter.delete("/account/:id",  deleting);
accountRouter.get("/account/:name",  getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newaccount = req.body;
  let newRecored = await accountsCollection.create(newaccount);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let accounts = await accountsCollection.read();
  res.status(200).json(accounts);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await accountsCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await accountsCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await accountsCollection.read(id);
  res.status(200).json(recored);
}
module.exports = accountRouter;
