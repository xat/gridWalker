# grid-walker

Walk through each cell of a grid and do some processing.

## Usage

```javascript

var $ = require('jquery');
var gridWalker = require('grid-walker');

var walker = gridWalker(2, 2, function(x, y, $cell, next) {
    // this function gets called for each cell
    // in the grid.

    // continue with the next cell after
    // the animation has completed
    $cell.fadeIn(1000, next);
});

walker($('.cell'), function() {
    // all cells have been processed
    console.log('all done!');
});

```

## Installation

### bower

```bower install grid-walker```


## License
Copyright (c) 2014 Simon Kusterer
Licensed under the MIT license.