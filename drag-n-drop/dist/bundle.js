/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base-component.ts":
/*!******************************************!*\
  !*** ./src/components/base-component.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Component": () => (/* binding */ Component)
/* harmony export */ });
const _ = document;
class Component {
    constructor(templateId, hostElemenetId, where, newElementId) {
        this.templateElement = _.getElementById(templateId);
        this.hostElement = _.getElementById(hostElemenetId);
        const importedNode = _.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(where);
    }
    attach(where) {
        this.hostElement.insertAdjacentElement(where, this.element);
    }
}


/***/ }),

/***/ "./src/components/project-input.ts":
/*!*****************************************!*\
  !*** ./src/components/project-input.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectInput": () => (/* binding */ ProjectInput)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _project_state__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../project-state */ "./src/project-state.ts");
/* harmony import */ var _validation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../validation */ "./src/validation.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectInput extends _base_component__WEBPACK_IMPORTED_MODULE_3__.Component {
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
            _project_state__WEBPACK_IMPORTED_MODULE_1__.projectState.addProject(title, description, people);
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
        return (!(0,_validation__WEBPACK_IMPORTED_MODULE_2__.validate)({ value: enteredTitle, required: true, minLength: 5 }) ||
            !(0,_validation__WEBPACK_IMPORTED_MODULE_2__.validate)({
                value: enteredDescription,
                required: true,
                minLength: 5,
                maxLength: 255,
            }) ||
            !(0,_validation__WEBPACK_IMPORTED_MODULE_2__.validate)({ value: +enteredPeople, required: true, min: 1 }));
    }
    clearUserInput() {
        this.f.title.value = '';
        this.f.description.value = '';
        this.f.people.value = '';
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.Autobind
], ProjectInput.prototype, "submitHandler", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


class ProjectItem extends _base_component__WEBPACK_IMPORTED_MODULE_1__.Component {
    constructor(hostId, project) {
        super('single-project', hostId, 'beforeend', project.id);
        this.project = project;
        this.configure();
        this.renderContent();
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_) {
        console.log('Drag End Handler');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    renderContent() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = `Count of people: ${this.project.people.toString()}`;
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.Autobind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.Autobind
], ProjectItem.prototype, "dragEndHandler", null);


/***/ }),

/***/ "./src/components/project-list.ts":
/*!****************************************!*\
  !*** ./src/components/project-list.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectList": () => (/* binding */ ProjectList)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../models/project */ "./src/models/project.ts");
/* harmony import */ var _project_state__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../project-state */ "./src/project-state.ts");
/* harmony import */ var _base_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./base-component */ "./src/components/base-component.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const _ = document;
class ProjectList extends _base_component__WEBPACK_IMPORTED_MODULE_3__.Component {
    constructor(type) {
        super('project-list', 'app', 'beforeend', `${type}-projects`);
        this.type = type;
        this.assignedProjects = [];
        this.configure();
        this.renderContent();
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listEl = this.element.querySelector('ul');
            listEl.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData('text/plain');
        _project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.moveProject(projectId, this.type === 'active' ? _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active : _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished);
    }
    dragLeaveHandler(event) {
        const listEl = this.element.querySelector('ul');
        listEl.classList.remove('droppable');
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        _project_state__WEBPACK_IMPORTED_MODULE_2__.projectState.addListener((projects) => {
            this.gatherProjects(projects);
            this.renderProjects();
        });
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent =
            this.type.toUpperCase() + ' PROJECTS';
    }
    gatherProjects(projects) {
        this.assignedProjects = projects.filter((x) => {
            if (this.type === 'active') {
                return x.status === _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Active;
            }
            return x.status === _models_project__WEBPACK_IMPORTED_MODULE_1__.ProjectStatus.Finished;
        });
    }
    renderProjects() {
        const listEl = _.getElementById(`${this.type}-projects-list`);
        listEl.innerHTML = '';
        this.assignedProjects.forEach((project) => {
            new _project_item__WEBPACK_IMPORTED_MODULE_4__.ProjectItem(this.element.querySelector('ul').id, project);
        });
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.Autobind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.Autobind
], ProjectList.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.Autobind
], ProjectList.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Autobind": () => (/* binding */ Autobind)
/* harmony export */ });
function Autobind(_, _2, descriptor) {
    const originalMethod = descriptor.value;
    const adjustedDescriptor = {
        enumerable: false,
        configurable: true,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        },
    };
    return adjustedDescriptor;
}


/***/ }),

/***/ "./src/models/project.ts":
/*!*******************************!*\
  !*** ./src/models/project.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "Project": () => (/* binding */ Project)
/* harmony export */ });
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}


/***/ }),

/***/ "./src/project-state.ts":
/*!******************************!*\
  !*** ./src/project-state.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectState": () => (/* binding */ ProjectState),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
/* harmony import */ var _models_project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/project */ "./src/models/project.ts");

class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        return new ProjectState();
    }
    addProject(title, description, people) {
        const newProject = new _models_project__WEBPACK_IMPORTED_MODULE_0__.Project(Math.random().toString(), title, description, people, _models_project__WEBPACK_IMPORTED_MODULE_0__.ProjectStatus.Active);
        this.projects.push(newProject);
        this.informListeners();
    }
    moveProject(projectId, projectStatus) {
        this.projects.map((prj, index) => {
            if (prj.id === projectId && prj.status != projectStatus) {
                prj.status = projectStatus;
                this.informListeners();
            }
        });
    }
    informListeners() {
        this.listeners.forEach((listenerFn) => listenerFn(this.projects.slice()));
    }
}
ProjectState.instance = null;
const projectState = ProjectState.getInstance();


/***/ }),

/***/ "./src/validation.ts":
/*!***************************!*\
  !*** ./src/validation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "validate": () => (/* binding */ validate)
/* harmony export */ });
function validate(input) {
    let valid = true;
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-input */ "./src/components/project-input.ts");
/* harmony import */ var _components_project_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-list */ "./src/components/project-list.ts");


new _components_project_input__WEBPACK_IMPORTED_MODULE_0__.ProjectInput();
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('active');
new _components_project_list__WEBPACK_IMPORTED_MODULE_1__.ProjectList('finished');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDeEQsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDM0M7SUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDeEQsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDM0M7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7Ozs7VUMzQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNpQjBEO0FBQ0Y7QUFPeEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2RyYWctbi1kcm9wLy4vc3JjL2NvbXBvbmVudHMvYmFzZS1jb21wb25lbnQudHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWlucHV0LnRzIiwid2VicGFjazovL2RyYWctbi1kcm9wLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzIiwid2VicGFjazovL2RyYWctbi1kcm9wLy4vc3JjL2NvbXBvbmVudHMvcHJvamVjdC1saXN0LnRzIiwid2VicGFjazovL2RyYWctbi1kcm9wLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvbW9kZWxzL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvcHJvamVjdC1zdGF0ZS50cyIsIndlYnBhY2s6Ly9kcmFnLW4tZHJvcC8uL3NyYy92YWxpZGF0aW9uLnRzIiwid2VicGFjazovL2RyYWctbi1kcm9wL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RyYWctbi1kcm9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9kcmFnLW4tZHJvcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RyYWctbi1kcm9wL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIG5hbWVzcGFjZSBBcHAge1xyXG5jb25zdCBfID0gZG9jdW1lbnQ7XHJcblxyXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29tcG9uZW50PFQgZXh0ZW5kcyBIVE1MRWxlbWVudCwgVSBleHRlbmRzIEhUTUxFbGVtZW50PiB7XHJcbiAgcHJvdGVjdGVkIHRlbXBsYXRlRWxlbWVudDogSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICBwcm90ZWN0ZWQgaG9zdEVsZW1lbnQhOiBUO1xyXG4gIHByb3RlY3RlZCBlbGVtZW50ITogVTtcclxuXHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICB0ZW1wbGF0ZUlkOiBzdHJpbmcsXHJcbiAgICBob3N0RWxlbWVuZXRJZDogc3RyaW5nLFxyXG4gICAgd2hlcmU6IEluc2VydFBvc2l0aW9uLFxyXG4gICAgbmV3RWxlbWVudElkPzogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICB0aGlzLnRlbXBsYXRlRWxlbWVudCA9IF8uZ2V0RWxlbWVudEJ5SWQodGVtcGxhdGVJZCkhIGFzIEhUTUxUZW1wbGF0ZUVsZW1lbnQ7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50ID0gXy5nZXRFbGVtZW50QnlJZChob3N0RWxlbWVuZXRJZCkhIGFzIFQ7XHJcblxyXG4gICAgY29uc3QgaW1wb3J0ZWROb2RlID0gXy5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGVFbGVtZW50LmNvbnRlbnQsIHRydWUpO1xyXG4gICAgdGhpcy5lbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkIGFzIFU7XHJcbiAgICBpZiAobmV3RWxlbWVudElkKSB7XHJcbiAgICAgIHRoaXMuZWxlbWVudC5pZCA9IG5ld0VsZW1lbnRJZDtcclxuICAgIH1cclxuICAgIHRoaXMuYXR0YWNoKHdoZXJlKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgYXR0YWNoKHdoZXJlOiBJbnNlcnRQb3NpdGlvbikge1xyXG4gICAgdGhpcy5ob3N0RWxlbWVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQod2hlcmUsIHRoaXMuZWxlbWVudCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY29uZmlndXJlKCk6IHZvaWQ7XHJcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlbmRlckNvbnRlbnQoKTogdm9pZDtcclxufVxyXG4vLyB9XHJcbiIsImltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XHJcbmltcG9ydCB7IHByb2plY3RTdGF0ZSB9IGZyb20gJy4uL3Byb2plY3Qtc3RhdGUnO1xyXG5pbXBvcnQgeyB2YWxpZGF0ZSB9IGZyb20gJy4uL3ZhbGlkYXRpb24nO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuXHJcbi8vIG5hbWVzcGFjZSBBcHAge1xyXG5pbnRlcmZhY2UgRm9ybUlucHV0IHtcclxuICB0aXRsZTogSFRNTElucHV0RWxlbWVudDtcclxuICBkZXNjcmlwdGlvbjogSFRNTElucHV0RWxlbWVudDtcclxuICBwZW9wbGU6IEhUTUxJbnB1dEVsZW1lbnQ7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SW5wdXQgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xyXG4gIHByaXZhdGUgZiE6IEZvcm1JbnB1dDtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigncHJvamVjdC1pbnB1dCcsICdhcHAnLCAnYmVmb3JlZW5kJywgJ3VzZXItaW5wdXQnKTtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5mID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyN0aXRsZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQsXHJcbiAgICAgIGRlc2NyaXB0aW9uOiB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgICAnI2Rlc2NyaXB0aW9uJ1xyXG4gICAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQsXHJcbiAgICAgIHBlb3BsZTogdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwZW9wbGUnKSBhcyBIVE1MSW5wdXRFbGVtZW50LFxyXG4gICAgfTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCB0aGlzLnN1Ym1pdEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoKSB7fVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBwcml2YXRlIHN1Ym1pdEhhbmRsZXIoZTogRXZlbnQpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTsgLy8gZG8gTk9UIGNhbGwgYnkgZGVmYXVsdCBIVFRQIHJlcXVlc3RcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IFt0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZV0gPSB0aGlzLmdhdGhlclVzZXJJbnB1dCgpO1xyXG4gICAgICB0aGlzLmNsZWFyVXNlcklucHV0KCk7XHJcbiAgICAgIHByb2plY3RTdGF0ZS5hZGRQcm9qZWN0KHRpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlKTtcclxuICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICBpZiAoZXJyIGluc3RhbmNlb2YgRXJyb3IpIHtcclxuICAgICAgICBhbGVydChlcnIubWVzc2FnZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2F0aGVyVXNlcklucHV0KCk6IFtzdHJpbmcsIHN0cmluZywgbnVtYmVyXSB7XHJcbiAgICBjb25zdCB0aXRsZSA9IHRoaXMuZi50aXRsZS52YWx1ZTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdGhpcy5mLmRlc2NyaXB0aW9uLnZhbHVlO1xyXG4gICAgY29uc3QgcGVvcGxlID0gdGhpcy5mLnBlb3BsZS52YWx1ZTtcclxuXHJcbiAgICBpZiAodGhpcy52ZXJpZnlVc2VySW5wdXQodGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUpKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBpbnB1dCcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIFt0aXRsZSwgZGVzY3JpcHRpb24sICtwZW9wbGVdO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSB2ZXJpZnlVc2VySW5wdXQoXHJcbiAgICBlbnRlcmVkVGl0bGU6IHN0cmluZyxcclxuICAgIGVudGVyZWREZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgZW50ZXJlZFBlb3BsZTogc3RyaW5nXHJcbiAgKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAhdmFsaWRhdGUoeyB2YWx1ZTogZW50ZXJlZFRpdGxlLCByZXF1aXJlZDogdHJ1ZSwgbWluTGVuZ3RoOiA1IH0pIHx8XHJcbiAgICAgICF2YWxpZGF0ZSh7XHJcbiAgICAgICAgdmFsdWU6IGVudGVyZWREZXNjcmlwdGlvbixcclxuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcclxuICAgICAgICBtaW5MZW5ndGg6IDUsXHJcbiAgICAgICAgbWF4TGVuZ3RoOiAyNTUsXHJcbiAgICAgIH0pIHx8XHJcbiAgICAgICF2YWxpZGF0ZSh7IHZhbHVlOiArZW50ZXJlZFBlb3BsZSwgcmVxdWlyZWQ6IHRydWUsIG1pbjogMSB9KVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgY2xlYXJVc2VySW5wdXQoKSB7XHJcbiAgICB0aGlzLmYudGl0bGUudmFsdWUgPSAnJztcclxuICAgIHRoaXMuZi5kZXNjcmlwdGlvbi52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5mLnBlb3BsZS52YWx1ZSA9ICcnO1xyXG4gIH1cclxufVxyXG4vLyB9XHJcbiIsImltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XHJcbmltcG9ydCB7IERyYWdnYWJsZSB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBQcm9qZWN0IH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xyXG5pbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICcuL2Jhc2UtY29tcG9uZW50JztcclxuXHJcbi8vIG5hbWVzcGFjZSBBcHAge1xyXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MVUxpc3RFbGVtZW50LCBIVE1MTGlua0VsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnZ2FibGVcclxue1xyXG4gIGNvbnN0cnVjdG9yKGhvc3RJZDogc3RyaW5nLCBwcml2YXRlIHByb2plY3Q6IFByb2plY3QpIHtcclxuICAgIHN1cGVyKCdzaW5nbGUtcHJvamVjdCcsIGhvc3RJZCwgJ2JlZm9yZWVuZCcsIHByb2plY3QuaWQpO1xyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICAgIHRoaXMucmVuZGVyQ29udGVudCgpO1xyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ1N0YXJ0SGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLnNldERhdGEoJ3RleHQvcGxhaW4nLCB0aGlzLnByb2plY3QuaWQpO1xyXG4gICAgZXZlbnQuZGF0YVRyYW5zZmVyIS5lZmZlY3RBbGxvd2VkID0gJ21vdmUnO1xyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ0VuZEhhbmRsZXIoXzogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zb2xlLmxvZygnRHJhZyBFbmQgSGFuZGxlcicpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGNvbmZpZ3VyZSgpOiB2b2lkIHtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnc3RhcnQnLCB0aGlzLmRyYWdTdGFydEhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdlbmQnLCB0aGlzLmRyYWdFbmRIYW5kbGVyKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZW5kZXJDb250ZW50KCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICdoMydcclxuICAgICkhLnRleHRDb250ZW50ID0gYENvdW50IG9mIHBlb3BsZTogJHt0aGlzLnByb2plY3QucGVvcGxlLnRvU3RyaW5nKCl9YDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdwJykhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LmRlc2NyaXB0aW9uO1xyXG4gIH1cclxufVxyXG4vLyB9XHJcbiIsImltcG9ydCB7IEF1dG9iaW5kIH0gZnJvbSAnLi4vZGVjb3JhdG9ycy9hdXRvYmluZCc7XHJcbmltcG9ydCB7IERyYWdUYXJnZXQgfSBmcm9tICcuLi9tb2RlbHMvZHJhZy1kcm9wJztcclxuaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4uL21vZGVscy9wcm9qZWN0JztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vcHJvamVjdC1zdGF0ZSc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBQcm9qZWN0SXRlbSB9IGZyb20gJy4vcHJvamVjdC1pdGVtJztcclxuXHJcbi8vIG5hbWVzcGFjZSBBcHAge1xyXG5jb25zdCBfID0gZG9jdW1lbnQ7XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdExpc3RcclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XHJcbiAgaW1wbGVtZW50cyBEcmFnVGFyZ2V0XHJcbntcclxuICBhc3NpZ25lZFByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSB0eXBlOiAnYWN0aXZlJyB8ICdmaW5pc2hlZCcpIHtcclxuICAgIHN1cGVyKCdwcm9qZWN0LWxpc3QnLCAnYXBwJywgJ2JlZm9yZWVuZCcsIGAke3R5cGV9LXByb2plY3RzYCk7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnT3ZlckhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xyXG4gICAgaWYgKGV2ZW50LmRhdGFUcmFuc2ZlciAmJiBldmVudC5kYXRhVHJhbnNmZXIudHlwZXNbMF0gPT09ICd0ZXh0L3BsYWluJykge1xyXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBhbGxvd2luZyBEcmFnICYgRHJvcCwgYnkgZGVmYXVsdCBpdCdzIHR1cm5lZCBvZmZcclxuICAgICAgY29uc3QgbGlzdEVsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhO1xyXG4gICAgICBsaXN0RWwuY2xhc3NMaXN0LmFkZCgnZHJvcHBhYmxlJyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcm9wSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBwcm9qZWN0SWQgPSBldmVudC5kYXRhVHJhbnNmZXIhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgIHByb2plY3RTdGF0ZS5tb3ZlUHJvamVjdChcclxuICAgICAgcHJvamVjdElkLFxyXG4gICAgICB0aGlzLnR5cGUgPT09ICdhY3RpdmUnID8gUHJvamVjdFN0YXR1cy5BY3RpdmUgOiBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgQEF1dG9iaW5kXHJcbiAgZHJhZ0xlYXZlSGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XHJcbiAgICBsaXN0RWwuY2xhc3NMaXN0LnJlbW92ZSgnZHJvcHBhYmxlJyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY29uZmlndXJlKCkge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdvdmVyJywgdGhpcy5kcmFnT3ZlckhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Ryb3AnLCB0aGlzLmRyb3BIYW5kbGVyKTtcclxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdkcmFnbGVhdmUnLCB0aGlzLmRyYWdMZWF2ZUhhbmRsZXIpO1xyXG4gICAgcHJvamVjdFN0YXRlLmFkZExpc3RlbmVyKChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB7XHJcbiAgICAgIHRoaXMuZ2F0aGVyUHJvamVjdHMocHJvamVjdHMpO1xyXG4gICAgICB0aGlzLnJlbmRlclByb2plY3RzKCk7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCByZW5kZXJDb250ZW50KCkge1xyXG4gICAgY29uc3QgbGlzdElkID0gYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCA9IGxpc3RJZDtcclxuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCdoMicpIS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHlwZS50b1VwcGVyQ2FzZSgpICsgJyBQUk9KRUNUUyc7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdhdGhlclByb2plY3RzKHByb2plY3RzOiBQcm9qZWN0W10pIHtcclxuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigoeCkgPT4ge1xyXG4gICAgICBpZiAodGhpcy50eXBlID09PSAnYWN0aXZlJykge1xyXG4gICAgICAgIHJldHVybiB4LnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHguc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkZpbmlzaGVkO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHJlbmRlclByb2plY3RzKCkge1xyXG4gICAgY29uc3QgbGlzdEVsID0gXy5nZXRFbGVtZW50QnlJZChcclxuICAgICAgYCR7dGhpcy50eXBlfS1wcm9qZWN0cy1saXN0YFxyXG4gICAgKSEgYXMgSFRNTFVMaXN0RWxlbWVudDtcclxuICAgIGxpc3RFbC5pbm5lckhUTUwgPSAnJztcclxuICAgIHRoaXMuYXNzaWduZWRQcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XHJcbiAgICAgIC8vIG9ubHkgZHJhd2luZyBpbnRvIERPTSwgc3RvcmluZyBpbnRvIHZhcmlhYmxlIGlzIG5vdCBuZWVkZWRcclxuICAgICAgbmV3IFByb2plY3RJdGVtKHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpIS5pZCwgcHJvamVjdCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuLy8gfVxyXG4iLCIvLyBuYW1lc3BhY2UgQXBwIHtcclxuZXhwb3J0IGZ1bmN0aW9uIEF1dG9iaW5kKFxyXG4gIF86IGFueSwgLy8gdG8gYXZvaWQgd2FybmluZ3MgaW4gVFMsIG5hbWUgaXQgJ18nXHJcbiAgXzI6IHN0cmluZyxcclxuICBkZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3JcclxuKSB7XHJcbiAgY29uc3Qgb3JpZ2luYWxNZXRob2QgPSBkZXNjcmlwdG9yLnZhbHVlO1xyXG4gIGNvbnN0IGFkanVzdGVkRGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yID0ge1xyXG4gICAgZW51bWVyYWJsZTogZmFsc2UsXHJcbiAgICBjb25maWd1cmFibGU6IHRydWUsXHJcbiAgICBnZXQoKSB7XHJcbiAgICAgIGNvbnN0IGJvdW5kRm4gPSBvcmlnaW5hbE1ldGhvZC5iaW5kKHRoaXMpO1xyXG4gICAgICByZXR1cm4gYm91bmRGbjtcclxuICAgIH0sXHJcbiAgfTtcclxuICByZXR1cm4gYWRqdXN0ZWREZXNjcmlwdG9yO1xyXG59XHJcbi8vIH1cclxuIiwiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmV4cG9ydCBlbnVtIFByb2plY3RTdGF0dXMge1xyXG4gIEFjdGl2ZSxcclxuICBGaW5pc2hlZCxcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3Qge1xyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyxcclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nLFxyXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxyXG4gICAgcHVibGljIHN0YXR1czogUHJvamVjdFN0YXR1c1xyXG4gICkge31cclxufVxyXG4vLyB9XHJcbiIsImltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tICcuL21vZGVscy9wcm9qZWN0JztcclxuXHJcbi8vIG5hbWVzcGFjZSBBcHAge1xyXG50eXBlIExpc3RlbmVyPFQ+ID0gKHg6IFRbXSkgPT4gdm9pZDtcclxuY2xhc3MgU3RhdGU8VD4ge1xyXG4gIHByb3RlY3RlZCBsaXN0ZW5lcnM6IExpc3RlbmVyPFQ+W10gPSBbXTtcclxuXHJcbiAgYWRkTGlzdGVuZXIobGlzdGVuZXJGbjogTGlzdGVuZXI8VD4pIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLnB1c2gobGlzdGVuZXJGbik7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdFN0YXRlIGV4dGVuZHMgU3RhdGU8UHJvamVjdD4ge1xyXG4gIHByaXZhdGUgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xyXG4gIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICBzdXBlcigpO1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgaWYgKHRoaXMuaW5zdGFuY2UpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbmV3IFByb2plY3RTdGF0ZSgpO1xyXG4gIH1cclxuXHJcbiAgYWRkUHJvamVjdCh0aXRsZTogc3RyaW5nLCBkZXNjcmlwdGlvbjogc3RyaW5nLCBwZW9wbGU6IG51bWJlcikge1xyXG4gICAgY29uc3QgbmV3UHJvamVjdDogUHJvamVjdCA9IG5ldyBQcm9qZWN0KFxyXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXHJcbiAgICAgIHRpdGxlLFxyXG4gICAgICBkZXNjcmlwdGlvbixcclxuICAgICAgcGVvcGxlLFxyXG4gICAgICBQcm9qZWN0U3RhdHVzLkFjdGl2ZVxyXG4gICAgKTtcclxuICAgIHRoaXMucHJvamVjdHMucHVzaChuZXdQcm9qZWN0KTtcclxuICAgIHRoaXMuaW5mb3JtTGlzdGVuZXJzKCk7XHJcbiAgfVxyXG5cclxuICBtb3ZlUHJvamVjdChwcm9qZWN0SWQ6IHN0cmluZywgcHJvamVjdFN0YXR1czogUHJvamVjdFN0YXR1cykge1xyXG4gICAgdGhpcy5wcm9qZWN0cy5tYXAoKHByajogUHJvamVjdCwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICBpZiAocHJqLmlkID09PSBwcm9qZWN0SWQgJiYgcHJqLnN0YXR1cyAhPSBwcm9qZWN0U3RhdHVzKSB7XHJcbiAgICAgICAgcHJqLnN0YXR1cyA9IHByb2plY3RTdGF0dXM7XHJcbiAgICAgICAgdGhpcy5pbmZvcm1MaXN0ZW5lcnMoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGluZm9ybUxpc3RlbmVycygpIHtcclxuICAgIHRoaXMubGlzdGVuZXJzLmZvckVhY2goKGxpc3RlbmVyRm4pID0+IGxpc3RlbmVyRm4odGhpcy5wcm9qZWN0cy5zbGljZSgpKSk7XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XHJcbi8vIH1cclxuIiwiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGFibGUge1xyXG4gIHZhbHVlOiBzdHJpbmcgfCBudW1iZXI7XHJcbiAgcmVxdWlyZWQ/OiBib29sZWFuO1xyXG4gIG1pbkxlbmd0aD86IG51bWJlcjtcclxuICBtYXhMZW5ndGg/OiBudW1iZXI7XHJcbiAgbWluPzogbnVtYmVyO1xyXG4gIG1heD86IG51bWJlcjtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGUoaW5wdXQ6IFZhbGlkYXRhYmxlKSB7XHJcbiAgbGV0IHZhbGlkID0gdHJ1ZTtcclxuICBpZiAoaW5wdXQucmVxdWlyZWQpIHtcclxuICAgIHZhbGlkID0gdmFsaWQgJiYgaW5wdXQudmFsdWUudG9TdHJpbmcoKS50cmltKCkubGVuZ3RoICE9PSAwO1xyXG4gIH1cclxuICBpZiAoaW5wdXQubWluTGVuZ3RoICE9IG51bGwgJiYgdHlwZW9mIGlucHV0LnZhbHVlID09PSAnc3RyaW5nJykge1xyXG4gICAgdmFsaWQgPSB2YWxpZCAmJiBpbnB1dC52YWx1ZS50b1N0cmluZygpLmxlbmd0aCA+PSBpbnB1dC5taW5MZW5ndGg7XHJcbiAgfVxyXG4gIGlmIChpbnB1dC5tYXhMZW5ndGggIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB2YWxpZCA9IHZhbGlkICYmIGlucHV0LnZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoIDw9IGlucHV0Lm1heExlbmd0aDtcclxuICB9XHJcbiAgaWYgKGlucHV0Lm1pbiAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gJ251bWJlcicpIHtcclxuICAgIHZhbGlkID0gdmFsaWQgJiYgaW5wdXQudmFsdWUgPj0gaW5wdXQubWluO1xyXG4gIH1cclxuICBpZiAoaW5wdXQubWF4ICE9IG51bGwgJiYgdHlwZW9mIGlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgdmFsaWQgPSB2YWxpZCAmJiBpbnB1dC52YWx1ZSA8PSBpbnB1dC5tYXg7XHJcbiAgfVxyXG4gIHJldHVybiB2YWxpZDtcclxufVxyXG4vLyB9XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gZm9yIGltcG9ydGluZyBhbiBmZWF0dXJlcyBmcm9tIG5hbWVzcGFjZSwgdXNlIHRoaXMgc3ludGF4ICh0aHJlZSBzbGFzaGVzISEpOlxyXG4vLyBJTVBPUlRBTlQ6IG9uY2UgaXQncyBjb21waWxlZCwgSlMgd2lsbCBkZXN0cm95IGFsbCBkZXBlbmRlbmNpZXMgYmVjYXVzZSBKU1xyXG4vLyBkb2Vzbid0IGtub3cgbmFtZXNwYWNlcywgc28gaW4gdHNjb25maWcuanNvbiwgZW5hYmxlIFwib3V0RmlsZVwiOiBcIi4vZGlzdC9idW5kbGUuanNcIlxyXG4vLyBmb3IgbWVyZ2luIGFsbCBkZXBlbmRlbmNpZXMgaW50byBvbmUgZmlsZVxyXG4vLyAhIVxyXG4vLyBVU0lORyBOQU1FU1BBQ0VTIGlzIG5vdCBpZGVhbCwgaW4gbmVzdGVkIGZpbGUgaXQncyBhbHNvIHdvcmtpbmcgd2l0aG91dCByZWZlcmluZ1xyXG4vLyB0byBwYXJ0aWN1bGFyIGZpbGUsIHdoaWNoIGlzIG5vdCBnb29kIC0+IHJhdGhlciB1c2UgRVM2IGltcG9ydC9leHBvcnRcclxuLy8gZm9yIHRoYXQsIGluIHRzY29uZmlnLmpzb24sIHRhcmdldCBzaG91bGQgYmUgRVMyMDE1IChFUzYpIGFuZCBcIm91dEZpbGVcIjogXCIuL2Rpc3QvYnVuZGxlLmpzXCJcclxuLy8gc2hvdWxkbid0IGJlIHVzZWQgLT4gaGVuY2Ugd2hvbGUgcHJvamVjdCBmb2xkZXIgc3RydWN0dXJlIHdpbGwgYmUgY29waWVkIHRvIHRoZSBkaXN0IGZvbGRlcnNcclxuLy8gQU5EIGNoYW5nZSBpbXBvcnQgaW4gSFRNTCB0bzogPHNjcmlwdCB0eXBlPVwibW9kdWxlXCIgc3JjPVwiLi9kaXN0L2J1bmRsZS5qc1wiPjwvc2NyaXB0PlxyXG4vLyAhIVxyXG4vKlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9tb2RlbHMvZHJhZy1kcm9wLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vbW9kZWxzL3Byb2plY3QudHNcIi8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJwcm9qZWN0LXN0YXRlLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInZhbGlkYXRpb24udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9kZWNvcmF0b3JzL2F1dG9iaW5kLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbXBvbmVudHMvcHJvamVjdC1pdGVtLnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHNcIiAvPlxyXG4qL1xyXG5cclxuaW1wb3J0IHsgUHJvamVjdElucHV0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQnO1xyXG5pbXBvcnQgeyBQcm9qZWN0TGlzdCB9IGZyb20gJy4vY29tcG9uZW50cy9wcm9qZWN0LWxpc3QnO1xyXG5cclxuLy8gdG8gdXNlIGV4cG9ydGVkIEludGVmYWNlcywgd2hvbGUgYXBwIG11c3QgYmUgd3JhcHBlZCBpbiB0aGUgc2FtZSAnbmFtZScgbmFtZXNwYWNlXHJcbi8vIG5hbWVzcGFjZSBBcHAge1xyXG5cclxuLy8gcmVmZXJlbmNlIHRvIGluc3RhbmNlcyBhcmUgbm90IG5lZWRlZCwgc28gd2UgZG9uJ3QgbmVlZCB0b1xyXG4vLyBzYXZlIGl0IGludG8gdmFyaWFibGVzXHJcbm5ldyBQcm9qZWN0SW5wdXQoKTtcclxubmV3IFByb2plY3RMaXN0KCdhY3RpdmUnKTtcclxubmV3IFByb2plY3RMaXN0KCdmaW5pc2hlZCcpO1xyXG4vLyB9XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==