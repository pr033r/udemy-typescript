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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function DLogger(log) {
    console.log('DLOGGER FACTORY');
    return function (constructor) {
        console.log(log);
        console.log(constructor);
    };
}
function ViewTemplate(data) {
    console.log('ViewTemplate FACTORY');
    return function (originalConstructor) {
        console.log('Rendering template');
        return (function (_super) {
            __extends(class_1, _super);
            function class_1() {
                var _ = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    _[_i] = arguments[_i];
                }
                var _this = _super.call(this) || this;
                if (data && data.template) {
                    var el = document.querySelector(data.selector);
                    el.innerHTML = data.template;
                    el.querySelector('h1').textContent = _this.name;
                    el.querySelector('h2').textContent = _this.subtitle;
                    el.querySelector('p').innerHTML = _this.text;
                }
                return _this;
            }
            return class_1;
        }(originalConstructor));
    };
}
function PropertyDecorator(target, name) {
    var color = 'color: #a00;';
    console.log('%c @PropertyDecorator', color);
    console.log("%c \t name = " + name, color);
    console.log('%c \t target = ' + target, color);
}
function AccessorDecorator(target, name, descriptor) {
    var color = 'color: #0a0;';
    console.log('%c @AccessorDecorator', color);
    console.log("%c \t name = " + name, color);
    console.log("%c \t target = " + target, color);
    console.log("%c \t descriptor = " + descriptor, color);
}
function MethodDecorator(target, name, descriptor) {
    var color = 'color: #00a;';
    console.log('%c @MethodDecorator', color);
    console.log("%c \t name = " + name, color);
    console.log("%c \t target = " + target, color);
    console.log("%c \t descriptor = " + descriptor, color);
}
function ParamDecorator(target, nameOfMethod, position) {
    var color = 'color: #abc;';
    console.log('%c @ParamDecorator', color);
    console.log("%c \t nameOfMethod = " + nameOfMethod, color);
    console.log("%c \t target = " + target, color);
    console.log("%c \t position = " + position, color);
}
var DPerson = (function () {
    function DPerson(paramDec) {
        if (paramDec === void 0) { paramDec = 'paramDecoratorProperty'; }
        this.name = 'Using custom decorators';
        this.subtitle = '@ViewTemplate';
        this.text = "The syntax for using this decorator is: <br>\n    <span style=\"color: #00a;\">@ViewTemplate(data: {selector: string, template: string})</span>";
        this.paramDecoratorProperty = paramDec;
        console.log('Calling a Person constructor...');
    }
    Object.defineProperty(DPerson.prototype, "paramDecorator", {
        set: function (v) {
            this.paramDecoratorProperty = v;
        },
        enumerable: false,
        configurable: true
    });
    DPerson.prototype.getString = function (a, b) {
        return a + b;
    };
    __decorate([
        PropertyDecorator
    ], DPerson.prototype, "paramDecoratorProperty", void 0);
    __decorate([
        AccessorDecorator
    ], DPerson.prototype, "paramDecorator", null);
    __decorate([
        MethodDecorator,
        __param(0, ParamDecorator),
        __param(1, ParamDecorator)
    ], DPerson.prototype, "getString", null);
    DPerson = __decorate([
        DLogger('DECORATOR-PARAM'),
        ViewTemplate({
            selector: 'app-root',
            template: '<h1></h1><h2></h2><p></p>',
        })
    ], DPerson);
    return DPerson;
}());
var per = new DPerson();
function Autobind(_, _2, descriptor) {
    var originalMethod = descriptor.value;
    var adjustedDescriptor = {
        enumerable: false,
        configurable: true,
        get: function () {
            var boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}
var Printer = (function () {
    function Printer() {
        this.message = 'Print this message';
    }
    Printer.prototype.printMessage = function () {
        console.log(this.message);
    };
    __decorate([
        Autobind
    ], Printer.prototype, "printMessage", null);
    return Printer;
}());
var p = new Printer();
var button = document.querySelector('button');
button.addEventListener('click', p.printMessage);
//# sourceMappingURL=app.js.map