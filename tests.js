var expect = require('expect.js');
var gridWalker = require('./gridWalker');

describe('gridWalker', function() {

  var data = [
    { payload: 1, x: 0, y: 0 },
    { payload: 2, x: 1, y: 0 },
    { payload: 3, x: 0, y: 1 },
    { payload: 4, x: 1, y: 1 }
  ];

  var cur = 0;

  it ('should walk through the grid', function(done) {
    var walker = gridWalker(2, 2, function(x, y, payload, next, prevData) {
      setTimeout(function() {
        expect(data[cur].payload).to.be.equal(payload);
        expect(data[cur].x).to.be.equal(x);
        expect(data[cur].y).to.be.equal(y);
        if (cur === 0) expect(data[cur].y).to.not.be.ok();
        else expect(prevData).to.be.equal(cur);
        cur++;
        next(cur);
      }, 100);
    });
    walker([1,2,3,4], function(prevData) {
      expect(prevData).to.be.equal(cur);
      done();
    });
  });

  it ('should use the first argument as done function', function(done) {
    var walker = gridWalker(2, 2, function(x, y, payload, next) { next(); } );
    walker(function() {
      done();
    });
  });

});

