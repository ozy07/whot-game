const SUITS_AND_NUMBERS = {
    'circle'    : [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14],
    'cross'     : [1, 2, 3, 5, 7, 10, 11, 13, 14],
    'star'      : [1, 2, 3, 4, 5, 7, 8],
    'square'    : [1, 2, 3, 5, 7, 10, 11, 13, 14],
    'triangle'  : [1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14],
    'whot'      : [20, 20, 20, 20, 20]
};

const IMAGES = {
    'circle'    : require('../assets/solid_circle.png'),
    'cross'     : require('../assets/solid_cross.png'),
    'star'      : require('../assets/solid_star.png'),
    'square'    : require('../assets/solid_square.png'),
    'triangle'  : require('../assets/solid_triangle.png'),
    'whot'      : require('../assets/whort.png'),
    'market'    : require('../assets/market.png')
};

const SHAPES =  ['circle', 'cross', 'star', 'square', 'triangle'];

export {SHAPES, IMAGES, SUITS_AND_NUMBERS};