'use strict';

const chai = require('chai');
const db = require('../lib/db');
const low = require('lowdb')('db.json');

const expect = chai.expect;
// const should = chai.should;

describe('DB Utility Module -- /lib/db.js', () => {
  describe('#reset()', () => {
    it('should not raise an error', () => {
      expect(db.resetLogs).to.not.throw(Error);
    });

    it('should remove all logs', () => {
      expect(low.get('logs').value().length).to.equal(0);
    });
  });

  describe('#getLogs()', () => {

    it('should not raise an error');

    it('should return an array containing all the logs');

  });
});
