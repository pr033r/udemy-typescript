"use strict";
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
    return function (constructor) {
        console.log('Rendering template');
        if (data.selector && data.template) {
            var el = document.querySelector(data.selector);
            var p = new constructor();
            if (el && p) {
                el.innerHTML = data.template;
                el.querySelector('h1').textContent = p.name;
                el.querySelector('h2').textContent = p.subtitle;
                el.querySelector('p').innerHTML = p.text;
            }
        }
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
//# sourceMappingURL=app.js.map