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
function startCourse(retrievedCourse) {
    var resultCourse = {};
    resultCourse.name = retrievedCourse.name;
    resultCourse.sections = retrievedCourse.sections;
    resultCourse.startDate = retrievedCourse.startDate;
    resultCourse.pointsNeeded = retrievedCourse.pointsNeeded;
    return resultCourse;
}
//# sourceMappingURL=app.js.map