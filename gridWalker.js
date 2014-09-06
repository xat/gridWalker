!function(glob) {

  var leftToRightIterator = function(rows, cols) {
    var cur = -1;
    var total = rows * cols;
    return function() {
      var next = cur+1;
      if (next >= total) return false;
      cur = next;
      return {
        idx: cur,
        x: cur % cols,
        y: Math.floor(cur / cols)
      };
    };
  };

  var leftToRight = function(rows, cols, worker, payload, done) {
    var it = leftToRightIterator(rows, cols);
    var next = function(data) {
      var pos = it();
      if (pos === false) return done(data);
      worker(pos.x, pos.y, payload && payload[pos.idx], next, data);
    };
    next();
  };

  var noop = function() {};

  var gridWalker = function(rows, cols, worker, walker) {
    worker || (worker = noop);
    walker || (walker = leftToRight);

    return function(payload, done) {
      if (typeof payload === 'function') done = payload;
      walker(rows, cols, worker, payload, done || noop);
    };
  };

  // Node.js / browserify
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = gridWalker;
  }
  // <script>
  else {
    glob.gridWalker = gridWalker;
  }

}(this);