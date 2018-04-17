/*
 * Sum up values in a accumulutor object with the next values
 * @param {String} property The property of the objects to roll up
 * @param {Object} accum The accumulator object
 * @param {Object} next The object containing next values
 */
function sumAccumulate (property, accum, next) {
    if (Object.prototype.toString.call(next[property]) === '[object Object]') {
        const newProps = {};
        for (const innerKey in next[property]) {
            const accumProp = accum[property] || {};
            newProps[innerKey] = sumAccumulate(innerKey, accumProp, next[property]);
        }
        return Object.assign({}, accum[property], newProps);
    } else {
        const previous = accum[property] || 0;
        const nextVal = next[property] || 0; // disallow null
        return previous + nextVal; // perform sum
    }
}

module.exports = {
    sumAccumulate
};
