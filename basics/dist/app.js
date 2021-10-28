"use strict";
function printLength(data) {
    var res = 'No data given.';
    if (data.length === 1) {
        res = "Got " + data.length + " element.";
    }
    else if (data.length > 1) {
        res = "Got " + data.length + " elements";
    }
    return [data, res];
}
console.log(printLength('Hello World!'));
function getPropertyValue(obj, key) {
    return obj[key];
}
//# sourceMappingURL=app.js.map