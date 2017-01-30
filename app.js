'use strict';

const metrics = require('./lib/metrics');
const jsonfile = require('jsonfile');

jsonfile.readFile('db.json', (err, db) => {
  if (err) {
    return console.error(err);
  }

  const category_counts = metrics.countBy(db, 'category');
  const product_counts = metrics.countBy(db, 'product');
});
