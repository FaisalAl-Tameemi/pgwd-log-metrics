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
const countBy = (data, field) => {
  const counts = {};

  data.forEach((elm) => {
    if (counts[elm.data[field]]) {
      counts[elm.data[field]] += 1;
    } else {
      counts[elm.data[field]] = 1;
    }
  });

  return counts;
};

/**
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
const conversionRatesBy = (field) => {
  const response = {};

  // TODO: implement

  return response;
};

module.exports = {
  countBy,
  converstionRatesBy
};
