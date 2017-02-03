'use strict';

const _ = require('lodash');
const db = require('./db');
const shortid = require('shortid');

const events = ['purchase', 'view', 'wishlist'];
const products = {
  'Accessories': ['Charger', 'Laptop Case', 'Cellphone Case'],
  'Electronics': ['TV', 'Laptop', 'Cellphone', 'Smart Watch', 'Headphones', 'Spakers']
};
const categories = ['Electronics', 'Accessories', 'Electronics'];

const buildLogEntry = () => {
  const category = categories[_.random(0, categories.length - 1)];
  return {
    event: events[_.random(0, events.length - 1)],
    data: {
      product: products[category][_.random(0, products[category].length - 1)],
      category: category
    }
  };
};

// helper method to generate `max` number of items in array
const generateSampleLogs = (max) => {
  const promises = [];

  for (let i = 0; i < max; i++) {
    const promise = db.createLog(buildLogEntry());
    promises.push(promise);
  };

  return promises;
};

// once this file runs, reset the logs
// and create 200 new ones
db
  .resetLogs()
  .then(() => Promise.all(generateSampleLogs(200)))
  .then((logs) => {
    console.log(`Created ${logs.length} items successfully.`)
  })
  .catch(console.error);
