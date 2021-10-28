"use strict";
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
    name: 'Must start with a capital character'
};
//# sourceMappingURL=app.js.map