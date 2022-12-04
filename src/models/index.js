'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./user.js');
const accounts = require('./account.js');
const transaction = require('./transaction.js');



const DataCollection=require("./lib/data-collection");

const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite::memory' : process.env.DATABASE_URL;

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    }
  }
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);


const userTable = users(sequelize, DataTypes);
const userCollection=new DataCollection(userTable);


const accountsTable = accounts(sequelize, DataTypes);
const accountsCollection=new DataCollection(accountsTable);

const transactionTable = transaction(sequelize, DataTypes);
const transactionCollection=new DataCollection(transactionTable);

//relations//////////////////////////////////////

userTable.hasMany(accountsTable); // user many account
accountsTable.belongsTo(userTable); // account one user

accountsTable.hasMany(transactionTable);
transactionTable.belongsTo(accountsTable);

userTable.hasMany(transactionTable); // user many transaction
transactionTable.belongsTo(userTable); // account one user


module.exports = {
    db: sequelize,
    users: users(sequelize, DataTypes),
    userCollection:userCollection,
    accountsCollection:accountsCollection,
    transactionCollection:transactionCollection
  
  };