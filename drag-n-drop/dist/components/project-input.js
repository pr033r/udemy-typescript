var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Autobind } from '../decorators/autobind.js';
import { projectState } from '../project-state.js';
import { validate } from '../validation.js';
import { Component } from './base-component.js';
export class ProjectInput extends Component {
    constructor() {
        super('project-input', 'app', 'beforeend', 'user-input');
        this.configure();
    }
    configure() {
        this.f = {
            title: this.element.querySelector('#title'),
            description: this.element.querySelector('#description'),
            people: this.element.querySelector('#people'),
        };
        this.element.addEventListener('submit', this.submitHandler);
    }
    renderContent() { }
    submitHandler(e) {
        e.preventDefault();
        try {
            const [title, description, people] = this.gatherUserInput();
            this.clearUserInput();
            projectState.addProject(title, description, people);
        }
        catch (err) {
            if (err instanceof Error) {
                alert(err.message);
            }
        }
    }
    gatherUserInput() {
        const title = this.f.title.value;
        const description = this.f.description.value;
        const people = this.f.people.value;
        if (this.verifyUserInput(title, description, people)) {
            throw new Error('Invalid input');
        }
        return [title, description, +people];
    }
    verifyUserInput(enteredTitle, enteredDescription, enteredPeople) {
        return (!validate({ value: enteredTitle, required: true, minLength: 5 }) ||
            !validate({
                value: enteredDescription,
                required: true,
                minLength: 5,
                maxLength: 255,
            }) ||
            !validate({ value: +enteredPeople, required: true, min: 1 }));
    }
    clearUserInput() {
        this.f.title.value = '';
        this.f.description.value = '';
        this.f.people.value = '';
    }
}
__decorate([
    Autobind
], ProjectInput.prototype, "submitHandler", null);
//# sourceMappingURL=project-input.js.map