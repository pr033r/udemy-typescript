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
//# sourceMappingURL=app.js.map