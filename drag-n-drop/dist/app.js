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
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
var Project = (function () {
    function Project(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
    return Project;
}());
var ProjectState = (function () {
    function ProjectState() {
        this.listeners = [];
        this.projects = [];
    }
    ProjectState.getInstance = function () {
        if (this.instance) {
            return this.instance;
        }
        return new ProjectState();
    };
    ProjectState.prototype.addListener = function (listenerFn) {
        this.listeners.push(listenerFn);
    };
    ProjectState.prototype.addProject = function (title, description, people) {
        var _this = this;
        var newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(newProject);
        this.listeners.forEach(function (listenerFn) { return listenerFn(_this.projects.slice()); });
    };
    ProjectState.instance = null;
    return ProjectState;
}());
var projectState = ProjectState.getInstance();
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
var Component = (function () {
    function Component(templateId, hostElemenetId, where, newElementId) {
        this.templateElement = _.getElementById(templateId);
        this.hostElement = _.getElementById(hostElemenetId);
        var importedNode = _.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(where);
    }
    Component.prototype.attach = function (where) {
        this.hostElement.insertAdjacentElement(where, this.element);
    };
    return Component;
}());
var ProjectList = (function (_super) {
    __extends(ProjectList, _super);
    function ProjectList(type) {
        var _this = _super.call(this, 'project-list', 'app', 'beforeend', type + "-projects") || this;
        _this.type = type;
        _this.assignedProjects = [];
        projectState.addListener(function (projects) {
            _this.gatherProjects(projects);
            _this.renderProjects();
        });
        _this.renderContent();
        return _this;
    }
    ProjectList.prototype.gatherProjects = function (projects) {
        var _this = this;
        this.assignedProjects = projects.filter(function (x) {
            if (_this.type === 'active') {
                return x.status === ProjectStatus.Active;
            }
            return x.status === ProjectStatus.Finished;
        });
    };
    ProjectList.prototype.renderProjects = function () {
        var listEl = _.getElementById(this.type + "-projects-list");
        listEl.innerHTML = '';
        this.assignedProjects.forEach(function (project) {
            var listItem = document.createElement('li');
            listItem.textContent = project.title;
            listEl.appendChild(listItem);
        });
    };
    ProjectList.prototype.renderContent = function () {
        var listId = this.type + "-projects-list";
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    };
    ProjectList.prototype.configure = function () {
        throw new Error('Method not implemented.');
    };
    return ProjectList;
}(Component));
var ProjectInput = (function (_super) {
    __extends(ProjectInput, _super);
    function ProjectInput() {
        var _this = _super.call(this, 'project-input', 'app', 'beforeend', 'user-input') || this;
        _this.initFormInputs();
        _this.configure();
        return _this;
    }
    ProjectInput.prototype.initFormInputs = function () {
        this.f = {
            title: this.element.querySelector('#title'),
            description: this.element.querySelector('#description'),
            people: this.element.querySelector('#people'),
        };
    };
    ProjectInput.prototype.gatherUserInput = function () {
        var title = this.f.title.value;
        var description = this.f.description.value;
        var people = this.f.people.value;
        if (this.verifyUserInput(title, description, people)) {
            throw new Error('Invalid input');
        }
        return [title, description, +people];
    };
    ProjectInput.prototype.verifyUserInput = function (enteredTitle, enteredDescription, enteredPeople) {
        return (!validate({ value: enteredTitle, required: true, minLength: 5 }) ||
            !validate({
                value: enteredDescription,
                required: true,
                minLength: 5,
                maxLength: 255,
            }) ||
            !validate({ value: +enteredPeople, required: true, min: 1 }));
    };
    ProjectInput.prototype.clearUserInput = function () {
        this.f.title.value = '';
        this.f.description.value = '';
        this.f.people.value = '';
    };
    ProjectInput.prototype.submitHandler = function (e) {
        e.preventDefault();
        try {
            var _a = this.gatherUserInput(), title = _a[0], description = _a[1], people = _a[2];
            this.clearUserInput();
            projectState.addProject(title, description, people);
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
    ProjectInput.prototype.renderContent = function () {
        throw new Error('Method not implemented.');
    };
    __decorate([
        Autobind
    ], ProjectInput.prototype, "submitHandler", null);
    return ProjectInput;
}(Component));
var projectInput = new ProjectInput();
var activeProjectsList = new ProjectList('active');
var finishedProjectsList = new ProjectList('finished');
//# sourceMappingURL=app.js.map