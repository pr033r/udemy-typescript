"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function DLogger(log) {
    return function (constructor) {
        console.log(log);
        console.log(constructor);
    };
}
function ViewTemplate(data) {
    return function (constructor) {
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
var DPerson = (function () {
    function DPerson() {
        this.name = 'Using custom decorators';
        this.subtitle = '@ViewTemplate';
        this.text = "The syntax for using this decorator is: <br>\n    <span style=\"color: #00a;\">@ViewTemplate(data: {selector: string, template: string})</span>";
        console.log('Calling a Person constructor...');
    }
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