"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Logger = (function () {
    function Logger() {
    }
    return Logger;
}());
var User = (function (_super) {
    __extends(User, _super);
    function User(login, password) {
        var _this = _super.call(this) || this;
        _this.login = login;
        _this.password = password;
        _this.counterForLogout = 360;
        return _this;
    }
    User.prototype.log = function (message, code) {
        console.log(code, message);
    };
    Object.defineProperty(User.prototype, "counter", {
        get: function () {
            if (this.counterForLogout <= 0) {
                throw new Error("Your session expired");
            }
            return this.counterForLogout;
        },
        set: function (v) {
            this.counterForLogout = v;
        },
        enumerable: false,
        configurable: true
    });
    User.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        return new User('lasakada', '12345');
    };
    User.prototype.whosLogged = function () {
        console.log("> " + this.login + " logged");
    };
    User.prototype.decreaseCounterOfLogout = function (by) {
        this.counterForLogout -= by;
    };
    User.VERSION = "1.1";
    return User;
}(Logger));
var loginUser = User.getInstance();
var coppyUser = {
    decreaseCounterOfLogout: loginUser.decreaseCounterOfLogout,
};
//# sourceMappingURL=app.js.map