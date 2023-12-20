function shallowEqual(objA, objB) {
    // is 비교를 통해 같다면, true반환
    if(Object.is(objA, objB)) {
        return true;
    }
    
    // Object.is로 걸러지지 않은
    if(typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
        return false;
    }
    
    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    // 키의 길이가 다르다면
    if(keysA.length !== keysB.length) {
        return false;
    }

    for(let i = 0; i < keysA.length; i++) {
        const currentKey = keysA[i];
        if(!Object.prototype.hasOwnProperty.call(objB, currentKey) || !is(objA[currentKey], objB[currentKey])) {
            return false;
        }
    }

    return true;
}

function is(x, y) {
    return (
      (x === y && (x !== 0 || 1 / x === 1 / y)) || (x !== x && y !== y) // eslint-disable-line no-self-compare
    );
  }

console.log(is(null, null));