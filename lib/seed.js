'use strict';

const _ = require('lodash');
const jsonfile = require('jsonfile');
const shortid = require('shortid');

const events = ['purchase', 'view', 'wishlist'];
const products = ['Laptop', 'Cellphone', 'Smart Watch', 'Charger', 'Laptop Case', 'Cellphone Case'];
const categories = ['Accessories', 'Electronics'];

const buildLogEntry = () => {
  return {
    event: events[_.random(0, events.length - 1)],
    data: {
      product: products[_.random(0, products.length - 1)],
      category: categories[_.random(0, categories.length - 1)]
    }
  };
};

const generateLogData = () => {
  const log_data = [];

  for (let i = 0; i < 99; i++) {
    log_data.push(buildLogEntry());
  };

  return log_data;
};


jsonfile.writeFile('db.json', generateLogData(), (err) => {
  if (err) {
    return console.error(err);
  }
  console.log('Seed completed!');
});
