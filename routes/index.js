var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var conString = require(path.join(__dirname, '..', 'db/config')).conString;

console.log(conString);

/* GET home page. */
router.get('/teas', function(req, res, next) {

  pg.connect(conString, function(err, client, done) {
    if (err) {
      done();
      return {
        success: false,
        data: err
      };
    }

    var query, results = { result_count: 0, data: [] };
    query = client.query("SELECT * FROM teas");

    query.on('row', function(row) {
      results.data.push(row);
    });

    query.on('error', function() {
      // handle query error
    });

    query.on('end', function(result) {
      done();
      results.result_count = result.rowCount;
      res.json(results);
    });
  });

});

module.exports = router;
