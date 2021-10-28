"use strict";
var _a, _b, _c, _d;
function printEmployee(employee) {
    if ('id' in employee) {
        console.log("[" + employee.id + "] " + employee.login);
    }
    if ('privileges' in employee) {
        console.log("-> privileges: " + employee.privileges + " \n\t Start Date: " + employee.startDate);
    }
}
printEmployee({
    id: 270,
    login: 'lasakada',
});
printEmployee({
    privileges: ['admin', 'sys_admin', 'programmer'],
    startDate: new Date(),
});
function printAnimal(animal) {
    var speed = 0;
    switch (animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'lion':
            speed = animal.runingSpeed;
            break;
        default:
            break;
    }
    console.log("Speed = " + speed);
}
var errBag = {
    email: 'Not a valid email',
    name: 'Must start with a capital character',
};
var neco = 'adam lasak';
function _add(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
var splitted = _add('1', '5').split('');
var responseData = {
    name: 'GET',
    status: 200,
    data: {
        body: 'Fetch has been successful',
        params: 'get, 200, json',
        footer: '',
    },
};
var resultOfResponse = (_a = responseData === null || responseData === void 0 ? void 0 : responseData.data) === null || _a === void 0 ? void 0 : _a.body;
var resultFooterWithOR = ((_b = responseData === null || responseData === void 0 ? void 0 : responseData.data) === null || _b === void 0 ? void 0 : _b.footer) || 'DEFAULT';
var resultFooterWithNullish = (_d = (_c = responseData === null || responseData === void 0 ? void 0 : responseData.data) === null || _c === void 0 ? void 0 : _c.footer) !== null && _d !== void 0 ? _d : 'DEFAULT';
console.log("Result footer with || :: " + resultFooterWithOR);
console.log("Result footer with ?? :: " + resultFooterWithNullish);
//# sourceMappingURL=app.js.map