const express = require("express");
const { json } = require("express/lib/response");
const bearer = require("../middleware/bearer");
const acl = require("../middleware/acl");
const { transactionCollection } = require("../models/index");
const transactionRouter = express.Router();

// const {getAll,deleting,getOneRecored,updating,creatRecord}=require("./apiHandlers")

transactionRouter.get("/transaction",   getAll);
transactionRouter.post("/transaction",  creatRecord);
transactionRouter.put("/transaction/:id",  updating);
transactionRouter.delete("/transaction/:id",  deleting);
transactionRouter.get("/transaction/:name",  getOneRecored);

////////////////creat=insert////////////////////
async function creatRecord(req, res) {
  let newtransaction = req.body;
  let newRecored = await transactionCollection.create(newtransaction);
  res.status(201).json(newRecored);
}
///////////select *//////////////////
async function getAll(req, res) {
  let transactions = await transactionCollection.read();
  res.status(200).json(transactions);
}

///////////////update/////////
async function updating(req, res) {
  let id = parseInt(req.params.id);
  let newRecored = req.body;
  let found = await transactionCollection.read(id);
  if (found) {
    let updated = await found.update(newRecored);
    res.status(201).json(updated);
  }
}
/////////////delete///////////////
async function deleting(req, res) {
  let id = parseInt(req.params.id);
  let deleted = await transactionCollection.delete(id);
  res.status(204).json(deleted);
}

/////////////get one/////////////

async function getOneRecored(req, res) {
  const id = parseInt(req.params.name);
  let recored = await transactionCollection.read(id);
  res.status(200).json(recored);
}
module.exports = transactionRouter;
