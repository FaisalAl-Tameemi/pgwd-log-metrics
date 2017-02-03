const _ = require('lodash');
const db = require('./db');

/**
 * @param: 'field' ==> ['product', 'category']
 * @return: {
 *   'Cellphone Case': 17,
 *   'Cellphone': 18,
 *   'Smart Watch': 17,
 *   'Laptop Case': 17,
 *   'Charger': 17,
 *   'Laptop': 13
 * }
 */
const countBy = (field, cb) => {
  db.getLogs()
    .then((logs) => {
      try {
        const counts = {};
        logs.forEach((elm) => {
          if (counts[elm.data[field]]) {
            counts[elm.data[field]] += 1;
          } else {
            counts[elm.data[field]] = 1;
          }
        });
        cb(null, counts);
      } catch(err) {
        cb(err);
      }
    })
    .catch(cb);
};

/**
 * The conversion rate is the total # of purchases divided by
 * the total number of actions (# views, # wishlist & # purchase)
 *
 *   ==> (# views) / (# views + # purchases + # wishlist)
 *
 * @param: 'field' ==> ['product', 'category']
 * @return: {
 *   'Cellphone': {
 *      event_counts: {
 *        view: 12,
 *        purchase: 4,
 *        wishlist: 21,
 *      },
 *      conversion_rate: 0.21
 *   },
 *   ...
 * }
 */
const conversionRatesBy = (field, cb) => {
  db.getLogs()
    .then((logs) => {
      try {
        const response = {};
        // calculate `event_counts`
        const grouped = _.groupBy(logs, elm => elm.data[field]);
        // for each key in the grouped logs
        Object.keys(grouped).forEach((group) => {
          // calculate the event counts
          const counts = _.countBy(grouped[group], 'event');
          const rate = (counts.purchase / (counts.purchase + counts.view + counts.wishlist));
          response[group] = {
            event_counts: counts,
            conversion_rate: (Math.round(rate * 100) / 100) // round to nearest 2nd decimal point
          };
        });
        cb(null, response);
      } catch(err) {
        cb(err);
      }
    })
    .catch(cb);
};

module.exports = {
  countBy,
  conversionRatesBy
};
