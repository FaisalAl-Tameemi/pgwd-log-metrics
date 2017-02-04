'use strict';

const _ = require('lodash');
const chai = require('chai');
const db = require('../lib/db');
const metrics = require('../lib/metrics');

const expect = chai.expect;
// const should = chai.should;

describe('Counts Modules -- /lib/counts.test.js', () => {

  // clear the database and create some logs
  beforeEach('clear the database and ', () => {
    return db
      .getOptions()
      .then(({ events, products, categories }) => {
        const queue = [];
        for(let i = 0; i < 10; i++){
          const category = categories[_.random(0, categories.length - 1)];
          const entry = db.createLog({
            event: events[_.random(0, events.length - 1)],
            data: {
              product: products[category][_.random(0, products[category].length - 1)],
              category: category
            }
          });
          queue.push(entry);
        };

        return db
          .resetLogs()
          .then(() => {
            return Promise.all(queue);
          });
      })
  });

  describe('#countBy()', () => {

    it(`should invoke the callback with an error if the field is not 'product' or 'category'`, (_done) => {
      metrics.countBy('wrong_field_type', _done);
    });

    it(`should invoke the callback with results (as an object) and no error`, (_done) => {
      metrics.countBy('product', (err, resp) => {
        if (err) {
          _done(err);
        } else if (!resp || typeof resp !== 'object') {
          _done({ message: `Response empty or not an object` })
        } else {
          _done();
        }
      });
    });

  });

  describe('#conversionRatesBy()', () => {

    it(`should invoke the callback with an error if the field is not 'product' or 'category'`);

    it(`should invoke the callback with results (as an object) and no error`);

  });

});
