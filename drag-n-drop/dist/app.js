"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function validate(input) {
    var valid = true;
    if (input.required) {
        valid = valid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === 'string') {
        valid = valid && input.value.toString().length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === 'string') {
        valid = valid && input.value.toString().length <= input.maxLength;
    }
    if (input.min != null && typeof input.value === 'number') {
        valid = valid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === 'number') {
        valid = valid && input.value <= input.max;
    }
    return valid;
}
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
var _ = document;
var ProjectInput = (function () {
    function ProjectInput() {
        this.templateElement = _.getElementById('project-input');
        this.hostElement = _.getElementById('app');
        var importedNode = _.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = 'user-input';
        this.f = {
            title: this.element.querySelector('#title'),
            description: this.element.querySelector('#description'),
            people: this.element.querySelector('#people'),
        };
        this.configure();
        this.attach();
    }
    ProjectInput.prototype.gatherUserInput = function () {
        var enteredTitle = this.f.title.value;
        var enteredDescription = this.f.description.value;
        var enteredPeople = this.f.people.value;
        if (!validate({ value: enteredTitle, required: true, minLength: 5 }) ||
            !validate({
                value: enteredDescription,
                required: true,
                minLength: 5,
                maxLength: 255,
            }) ||
            !validate({ value: +enteredPeople, required: true, min: 1 })) {
            throw new Error('Invalid input');
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    };
    ProjectInput.prototype.clearUserInput = function () {
        this.f.title.value = '';
        this.f.description.value = '';
        this.f.people.value = '';
    };
    ProjectInput.prototype.submitHandler = function (e) {
        e.preventDefault();
        try {
            var formValues = this.gatherUserInput();
            this.clearUserInput();
            console.log(formValues);
        }
        catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    };
    ProjectInput.prototype.configure = function () {
        this.element.addEventListener('submit', this.submitHandler);
    };
    ProjectInput.prototype.attach = function () {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    };
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}());
var projectInput = new ProjectInput();
//# sourceMappingURL=app.js.map