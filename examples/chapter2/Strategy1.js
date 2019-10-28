// 根据等级分发不同的奖金
var calculateBonus = function( performanceLevel, salary) {
    if ( performanceLevel === 'S' ) {
        return salary * 4;
    }

    if ( performanceLevel === 'A' ) {
        return salary * 3;
    }

    if ( performanceLevel === 'B' ) {
        return salary * 2;
    };
}

console.log( calculateBonus( 'B', 20000 ) );
console.log( calculateBonus( 'S', 6000 ) );