'use strict';

/**
 * Sample file for creating simple tests, automated tests can be found
 * in the `./test` folder and are being run by Mocha.
 */

const metrics = require('./lib/metrics');
const db = require('./lib/db');

// Example for loading data from the simple database module
db.getLogs()
  .then((logs) => {
    console.log(`Found ${logs.length} log entries`);
    console.log('---------------');
  })
  .catch(console.error);


// Example for getting count metrics
metrics.countBy('product', (err, result) => {
  if (err) {
    console.error(err);
    return null;
  }
  console.log('Printing counts by product');
  console.log(result);
  console.log('---------------');
});

metrics.countBy('category', (err, result) => {
  if (err) {
    console.error(err);
    return null;
  }
  console.log('Printing counts by category');
  console.log(result);
  console.log('---------------');
});


// Example for getting conversion rates
metrics.conversionRatesBy('category', (err, result) => {
  if (err) {
    console.error(err);
    return null;
  }
  console.log('Printing conversion rates by category');
  console.log(result);
  console.log('---------------');
});
