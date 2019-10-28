var performanceS = function ( salary ) {
    return salary * 4;
};

var performanceA = function ( salary ) {
    return salary * 3;
};

var performanceB = function ( salary ) {
    return salary * 2;
};

// 根据等级分发不同的奖金
var calculateBonus = function( performanceLevel, salary) {
    if ( performanceLevel === 'S' ) {
        return performanceS( salary );
    }

    if ( performanceLevel === 'A' ) {
        return performanceA( salary );
    }

    if ( performanceLevel === 'B' ) {
        return performanceB( salary );
    };
}

console.log( calculateBonus( 'B', 20000 ) );
console.log( calculateBonus( 'S', 6000 ) );