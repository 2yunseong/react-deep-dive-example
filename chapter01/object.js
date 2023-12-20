console.log(-0 == +0)
console.log(NaN == NaN)

console.log(-0 === +0)
console.log(NaN === NaN)

console.log(Object.is(NaN, NaN))
console.log(Object.is(+0, -0))

const neg = 1 / -0;
const pos = 1 / +0;
console.log(neg, pos);
console.log(neg === pos);