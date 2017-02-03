const _ = require('lodash');
const shortid = require('shortid');
const lowdb = require('lowdb');

// TODO: add validations
// const validator = require('validator');

// for reference
const events = ['purchase', 'view', 'wishlist'];
const products = ['Laptop', 'Cellphone', 'Smart Watch', 'Charger', 'Laptop Case', 'Cellphone Case'];
const categories = ['Accessories', 'Electronics'];

// initiate a lowdb instance from the file `./db.json`
// the `db` variable below will be in the scope of this module
// and therefore available to all the methods below even when called
// in other files.
const jsonDB = lowdb('db.json');
// set the database defaults
jsonDB.defaults({
  logs: []
}).value();

/**
 * Gets the log entries from the database
 */
const getLogs = () => {
  // return a then-able promise
  return new Promise((resolve, reject) => {
    try {
      // use the db instance to load the logs
      const data = jsonDB.get('logs').value();
      // send the results to the `.then` function by resolving the promise
      resolve(data || []);
    } catch(e) { // if error occurs when loading the data
      // send the error to `.catch`
      reject(err);
    }
  });
};

/**
 * Creates a log entry in the database
 */
const createLog = (data) => {
  return new Promise((resolve, reject) => {
    try {
      // use lodash extend the data with a unique short id
      // the `id` is ater used to find a specific document
      const log = _.extend({
        id: shortid.generate()
      }, data);
      // insert (push) the new log entry
      jsonDB.get('logs').push(log).value();
      resolve(log);
    } catch(e) {
      reject(err);
    }
  });
};

/**
 * Finds a specific logs entry by its id
 */
const findLogById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      const found = jsonDB.get('logs').find({
        id: id
      }).value();
      // return the found result
      resolve(found);
    } catch(e) {
      reject(err);
    }
  });
};

/**
 * Resets the `logs` portion of the database file back to an empty array
 */
const resetLogs = () => {
  return new Promise((resolve, reject) => {
    try {
      jsonDB.set('logs', []).value();
      resolve();
    } catch(e) {
      reject(err);
    }
  });
};

module.exports = {
  getLogs,
  createLog,
  findLogById,
  resetLogs
};
