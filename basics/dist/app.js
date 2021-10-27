"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var add = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (previous, current) { return previous + current; }, 0);
};
var result = add(1, 5, 6, 2, 5.3);
console.log(result);
var hobbies = ["Programming", "Hiking", "Swimming"];
var user = {
    name: "Adam",
    age: 25,
    skills: [{ programming: 10 }],
};
var hobby1 = hobbies[0], hobby2 = hobbies[1], remainingHobbies = hobbies.slice(2);
var userName = user.name, restParams = __rest(user, ["name"]);
console.log(userName, restParams);
var addShort = function (a, b) { return a + b; };
var User = (function () {
    function User(login, password) {
        this.login = login;
        this.password = password;
        this.counterForLogout = 360;
    }
    Object.defineProperty(User.prototype, "counter", {
        get: function () {
            if (this.counterForLogout <= 0) {
                throw new Error('Your session expired');
            }
            return this.counterForLogout;
        },
        set: function (v) {
            this.counterForLogout = v;
        },
        enumerable: false,
        configurable: true
    });
    User.prototype.whosLogged = function () {
        console.log("> " + this.login + " logged");
    };
    User.prototype.decreaseCounterOfLogout = function (by) {
        this.counterForLogout -= by;
    };
    User.VERSION = "1.1";
    return User;
}());
var loginUser = new User("lasakada@tietoevry.com", "12345");
var coppyUser = {
    decreaseCounterOfLogout: loginUser.decreaseCounterOfLogout,
};
//# sourceMappingURL=app.js.map