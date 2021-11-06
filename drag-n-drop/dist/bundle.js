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
console.log('helo');

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UUFDeEQsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDM0M7SUFDRCxJQUFJLEtBQUssQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDeEQsS0FBSyxHQUFHLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7S0FDM0M7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7Ozs7Ozs7VUMzQkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNpQjBEO0FBQ0Y7QUFPeEQsSUFBSSxtRUFBWSxFQUFFLENBQUM7QUFDbkIsSUFBSSxpRUFBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQzFCLElBQUksaUVBQVcsQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUc1QixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvY29tcG9uZW50cy9iYXNlLWNvbXBvbmVudC50cyIsIndlYnBhY2s6Ly9kcmFnLW4tZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtaW5wdXQudHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWxpc3QudHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3AvLi9zcmMvZGVjb3JhdG9ycy9hdXRvYmluZC50cyIsIndlYnBhY2s6Ly9kcmFnLW4tZHJvcC8uL3NyYy9tb2RlbHMvcHJvamVjdC50cyIsIndlYnBhY2s6Ly9kcmFnLW4tZHJvcC8uL3NyYy9wcm9qZWN0LXN0YXRlLnRzIiwid2VicGFjazovL2RyYWctbi1kcm9wLy4vc3JjL3ZhbGlkYXRpb24udHMiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3Avd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RyYWctbi1kcm9wL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZHJhZy1uLWRyb3Avd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9kcmFnLW4tZHJvcC8uL3NyYy9hcHAudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmNvbnN0IF8gPSBkb2N1bWVudDtcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDb21wb25lbnQ8VCBleHRlbmRzIEhUTUxFbGVtZW50LCBVIGV4dGVuZHMgSFRNTEVsZW1lbnQ+IHtcclxuICBwcm90ZWN0ZWQgdGVtcGxhdGVFbGVtZW50OiBIVE1MVGVtcGxhdGVFbGVtZW50O1xyXG4gIHByb3RlY3RlZCBob3N0RWxlbWVudCE6IFQ7XHJcbiAgcHJvdGVjdGVkIGVsZW1lbnQhOiBVO1xyXG5cclxuICBjb25zdHJ1Y3RvcihcclxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcclxuICAgIGhvc3RFbGVtZW5ldElkOiBzdHJpbmcsXHJcbiAgICB3aGVyZTogSW5zZXJ0UG9zaXRpb24sXHJcbiAgICBuZXdFbGVtZW50SWQ/OiBzdHJpbmdcclxuICApIHtcclxuICAgIHRoaXMudGVtcGxhdGVFbGVtZW50ID0gXy5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcclxuICAgIHRoaXMuaG9zdEVsZW1lbnQgPSBfLmdldEVsZW1lbnRCeUlkKGhvc3RFbGVtZW5ldElkKSEgYXMgVDtcclxuXHJcbiAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBfLmltcG9ydE5vZGUodGhpcy50ZW1wbGF0ZUVsZW1lbnQuY29udGVudCwgdHJ1ZSk7XHJcbiAgICB0aGlzLmVsZW1lbnQgPSBpbXBvcnRlZE5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcclxuICAgIGlmIChuZXdFbGVtZW50SWQpIHtcclxuICAgICAgdGhpcy5lbGVtZW50LmlkID0gbmV3RWxlbWVudElkO1xyXG4gICAgfVxyXG4gICAgdGhpcy5hdHRhY2god2hlcmUpO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBhdHRhY2god2hlcmU6IEluc2VydFBvc2l0aW9uKSB7XHJcbiAgICB0aGlzLmhvc3RFbGVtZW50Lmluc2VydEFkamFjZW50RWxlbWVudCh3aGVyZSwgdGhpcy5lbGVtZW50KTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBhYnN0cmFjdCBjb25maWd1cmUoKTogdm9pZDtcclxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVuZGVyQ29udGVudCgpOiB2b2lkO1xyXG59XHJcbi8vIH1cclxuIiwiaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgcHJvamVjdFN0YXRlIH0gZnJvbSAnLi4vcHJvamVjdC1zdGF0ZSc7XHJcbmltcG9ydCB7IHZhbGlkYXRlIH0gZnJvbSAnLi4vdmFsaWRhdGlvbic7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmludGVyZmFjZSBGb3JtSW5wdXQge1xyXG4gIHRpdGxlOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIGRlc2NyaXB0aW9uOiBIVE1MSW5wdXRFbGVtZW50O1xyXG4gIHBlb3BsZTogSFRNTElucHV0RWxlbWVudDtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFByb2plY3RJbnB1dCBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEZvcm1FbGVtZW50PiB7XHJcbiAgcHJpdmF0ZSBmITogRm9ybUlucHV0O1xyXG5cclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCdwcm9qZWN0LWlucHV0JywgJ2FwcCcsICdiZWZvcmVlbmQnLCAndXNlci1pbnB1dCcpO1xyXG4gICAgdGhpcy5jb25maWd1cmUoKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmYgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3RpdGxlJykgYXMgSFRNTElucHV0RWxlbWVudCxcclxuICAgICAgZGVzY3JpcHRpb246IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gICAgICAgICcjZGVzY3JpcHRpb24nXHJcbiAgICAgICkgYXMgSFRNTElucHV0RWxlbWVudCxcclxuICAgICAgcGVvcGxlOiB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Blb3BsZScpIGFzIEhUTUxJbnB1dEVsZW1lbnQsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIHRoaXMuc3VibWl0SGFuZGxlcik7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgcmVuZGVyQ29udGVudCgpIHt9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIHByaXZhdGUgc3VibWl0SGFuZGxlcihlOiBFdmVudCkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpOyAvLyBkbyBOT1QgY2FsbCBieSBkZWZhdWx0IEhUVFAgcmVxdWVzdFxyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgW3RpdGxlLCBkZXNjcmlwdGlvbiwgcGVvcGxlXSA9IHRoaXMuZ2F0aGVyVXNlcklucHV0KCk7XHJcbiAgICAgIHRoaXMuY2xlYXJVc2VySW5wdXQoKTtcclxuICAgICAgcHJvamVjdFN0YXRlLmFkZFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uLCBwZW9wbGUpO1xyXG4gICAgfSBjYXRjaCAoZXJyKSB7XHJcbiAgICAgIGlmIChlcnIgaW5zdGFuY2VvZiBFcnJvcikge1xyXG4gICAgICAgIGFsZXJ0KGVyci5tZXNzYWdlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBnYXRoZXJVc2VySW5wdXQoKTogW3N0cmluZywgc3RyaW5nLCBudW1iZXJdIHtcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5mLnRpdGxlLnZhbHVlO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSB0aGlzLmYuZGVzY3JpcHRpb24udmFsdWU7XHJcbiAgICBjb25zdCBwZW9wbGUgPSB0aGlzLmYucGVvcGxlLnZhbHVlO1xyXG5cclxuICAgIGlmICh0aGlzLnZlcmlmeVVzZXJJbnB1dCh0aXRsZSwgZGVzY3JpcHRpb24sIHBlb3BsZSkpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGlucHV0Jyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gW3RpdGxlLCBkZXNjcmlwdGlvbiwgK3Blb3BsZV07XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIHZlcmlmeVVzZXJJbnB1dChcclxuICAgIGVudGVyZWRUaXRsZTogc3RyaW5nLFxyXG4gICAgZW50ZXJlZERlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBlbnRlcmVkUGVvcGxlOiBzdHJpbmdcclxuICApIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICF2YWxpZGF0ZSh7IHZhbHVlOiBlbnRlcmVkVGl0bGUsIHJlcXVpcmVkOiB0cnVlLCBtaW5MZW5ndGg6IDUgfSkgfHxcclxuICAgICAgIXZhbGlkYXRlKHtcclxuICAgICAgICB2YWx1ZTogZW50ZXJlZERlc2NyaXB0aW9uLFxyXG4gICAgICAgIHJlcXVpcmVkOiB0cnVlLFxyXG4gICAgICAgIG1pbkxlbmd0aDogNSxcclxuICAgICAgICBtYXhMZW5ndGg6IDI1NSxcclxuICAgICAgfSkgfHxcclxuICAgICAgIXZhbGlkYXRlKHsgdmFsdWU6ICtlbnRlcmVkUGVvcGxlLCByZXF1aXJlZDogdHJ1ZSwgbWluOiAxIH0pXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHJpdmF0ZSBjbGVhclVzZXJJbnB1dCgpIHtcclxuICAgIHRoaXMuZi50aXRsZS52YWx1ZSA9ICcnO1xyXG4gICAgdGhpcy5mLmRlc2NyaXB0aW9uLnZhbHVlID0gJyc7XHJcbiAgICB0aGlzLmYucGVvcGxlLnZhbHVlID0gJyc7XHJcbiAgfVxyXG59XHJcbi8vIH1cclxuIiwiaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgRHJhZ2dhYmxlIH0gZnJvbSAnLi4vbW9kZWxzL2RyYWctZHJvcCc7XHJcbmltcG9ydCB7IFByb2plY3QgfSBmcm9tICcuLi9tb2RlbHMvcHJvamVjdCc7XHJcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gJy4vYmFzZS1jb21wb25lbnQnO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0SXRlbVxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxVTGlzdEVsZW1lbnQsIEhUTUxMaW5rRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdnYWJsZVxyXG57XHJcbiAgY29uc3RydWN0b3IoaG9zdElkOiBzdHJpbmcsIHByaXZhdGUgcHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgc3VwZXIoJ3NpbmdsZS1wcm9qZWN0JywgaG9zdElkLCAnYmVmb3JlZW5kJywgcHJvamVjdC5pZCk7XHJcbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xyXG4gICAgdGhpcy5yZW5kZXJDb250ZW50KCk7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGV2ZW50LmRhdGFUcmFuc2ZlciEuc2V0RGF0YSgndGV4dC9wbGFpbicsIHRoaXMucHJvamVjdC5pZCk7XHJcbiAgICBldmVudC5kYXRhVHJhbnNmZXIhLmVmZmVjdEFsbG93ZWQgPSAnbW92ZSc7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnRW5kSGFuZGxlcihfOiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnNvbGUubG9nKCdEcmFnIEVuZCBIYW5kbGVyJyk7XHJcbiAgfVxyXG5cclxuICBwcm90ZWN0ZWQgY29uZmlndXJlKCk6IHZvaWQge1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdzdGFydCcsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ2VuZCcsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoKTogdm9pZCB7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignaDInKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QudGl0bGU7XHJcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgJ2gzJ1xyXG4gICAgKSEudGV4dENvbnRlbnQgPSBgQ291bnQgb2YgcGVvcGxlOiAke3RoaXMucHJvamVjdC5wZW9wbGUudG9TdHJpbmcoKX1gO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3AnKSEudGV4dENvbnRlbnQgPSB0aGlzLnByb2plY3QuZGVzY3JpcHRpb247XHJcbiAgfVxyXG59XHJcbi8vIH1cclxuIiwiaW1wb3J0IHsgQXV0b2JpbmQgfSBmcm9tICcuLi9kZWNvcmF0b3JzL2F1dG9iaW5kJztcclxuaW1wb3J0IHsgRHJhZ1RhcmdldCB9IGZyb20gJy4uL21vZGVscy9kcmFnLWRyb3AnO1xyXG5pbXBvcnQgeyBQcm9qZWN0LCBQcm9qZWN0U3RhdHVzIH0gZnJvbSAnLi4vbW9kZWxzL3Byb2plY3QnO1xyXG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tICcuLi9wcm9qZWN0LXN0YXRlJztcclxuaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnLi9iYXNlLWNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSAnLi9wcm9qZWN0LWl0ZW0nO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbmNvbnN0IF8gPSBkb2N1bWVudDtcclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0TGlzdFxyXG4gIGV4dGVuZHMgQ29tcG9uZW50PEhUTUxEaXZFbGVtZW50LCBIVE1MRWxlbWVudD5cclxuICBpbXBsZW1lbnRzIERyYWdUYXJnZXRcclxue1xyXG4gIGFzc2lnbmVkUHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6ICdhY3RpdmUnIHwgJ2ZpbmlzaGVkJykge1xyXG4gICAgc3VwZXIoJ3Byb2plY3QtbGlzdCcsICdhcHAnLCAnYmVmb3JlZW5kJywgYCR7dHlwZX0tcHJvamVjdHNgKTtcclxuICAgIHRoaXMuY29uZmlndXJlKCk7XHJcbiAgICB0aGlzLnJlbmRlckNvbnRlbnQoKTtcclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyYWdPdmVySGFuZGxlcihldmVudDogRHJhZ0V2ZW50KTogdm9pZCB7XHJcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gJ3RleHQvcGxhaW4nKSB7XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7IC8vIGFsbG93aW5nIERyYWcgJiBEcm9wLCBieSBkZWZhdWx0IGl0J3MgdHVybmVkIG9mZlxyXG4gICAgICBjb25zdCBsaXN0RWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcigndWwnKSE7XHJcbiAgICAgIGxpc3RFbC5jbGFzc0xpc3QuYWRkKCdkcm9wcGFibGUnKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBBdXRvYmluZFxyXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IHByb2plY3RJZCA9IGV2ZW50LmRhdGFUcmFuc2ZlciEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgcHJvamVjdFN0YXRlLm1vdmVQcm9qZWN0KFxyXG4gICAgICBwcm9qZWN0SWQsXHJcbiAgICAgIHRoaXMudHlwZSA9PT0gJ2FjdGl2ZScgPyBQcm9qZWN0U3RhdHVzLkFjdGl2ZSA6IFByb2plY3RTdGF0dXMuRmluaXNoZWRcclxuICAgICk7XHJcbiAgfVxyXG5cclxuICBAQXV0b2JpbmRcclxuICBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcclxuICAgIGNvbnN0IGxpc3RFbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCd1bCcpITtcclxuICAgIGxpc3RFbC5jbGFzc0xpc3QucmVtb3ZlKCdkcm9wcGFibGUnKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBjb25maWd1cmUoKSB7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJhZ292ZXInLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XHJcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZHJvcCcsIHRoaXMuZHJvcEhhbmRsZXIpO1xyXG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2RyYWdsZWF2ZScsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XHJcbiAgICBwcm9qZWN0U3RhdGUuYWRkTGlzdGVuZXIoKHByb2plY3RzOiBQcm9qZWN0W10pID0+IHtcclxuICAgICAgdGhpcy5nYXRoZXJQcm9qZWN0cyhwcm9qZWN0cyk7XHJcbiAgICAgIHRoaXMucmVuZGVyUHJvamVjdHMoKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIHJlbmRlckNvbnRlbnQoKSB7XHJcbiAgICBjb25zdCBsaXN0SWQgPSBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkID0gbGlzdElkO1xyXG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ2gyJykhLnRleHRDb250ZW50ID1cclxuICAgICAgdGhpcy50eXBlLnRvVXBwZXJDYXNlKCkgKyAnIFBST0pFQ1RTJztcclxuICB9XHJcblxyXG4gIHByaXZhdGUgZ2F0aGVyUHJvamVjdHMocHJvamVjdHM6IFByb2plY3RbXSkge1xyXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKCh4KSA9PiB7XHJcbiAgICAgIGlmICh0aGlzLnR5cGUgPT09ICdhY3RpdmUnKSB7XHJcbiAgICAgICAgcmV0dXJuIHguc3RhdHVzID09PSBQcm9qZWN0U3RhdHVzLkFjdGl2ZTtcclxuICAgICAgfVxyXG4gICAgICByZXR1cm4geC5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuRmluaXNoZWQ7XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgcmVuZGVyUHJvamVjdHMoKSB7XHJcbiAgICBjb25zdCBsaXN0RWwgPSBfLmdldEVsZW1lbnRCeUlkKFxyXG4gICAgICBgJHt0aGlzLnR5cGV9LXByb2plY3RzLWxpc3RgXHJcbiAgICApISBhcyBIVE1MVUxpc3RFbGVtZW50O1xyXG4gICAgbGlzdEVsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgdGhpcy5hc3NpZ25lZFByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcclxuICAgICAgLy8gb25seSBkcmF3aW5nIGludG8gRE9NLCBzdG9yaW5nIGludG8gdmFyaWFibGUgaXMgbm90IG5lZWRlZFxyXG4gICAgICBuZXcgUHJvamVjdEl0ZW0odGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3VsJykhLmlkLCBwcm9qZWN0KTtcclxuICAgIH0pO1xyXG4gIH1cclxufVxyXG4vLyB9XHJcbiIsIi8vIG5hbWVzcGFjZSBBcHAge1xyXG5leHBvcnQgZnVuY3Rpb24gQXV0b2JpbmQoXHJcbiAgXzogYW55LCAvLyB0byBhdm9pZCB3YXJuaW5ncyBpbiBUUywgbmFtZSBpdCAnXydcclxuICBfMjogc3RyaW5nLFxyXG4gIGRlc2NyaXB0b3I6IFByb3BlcnR5RGVzY3JpcHRvclxyXG4pIHtcclxuICBjb25zdCBvcmlnaW5hbE1ldGhvZCA9IGRlc2NyaXB0b3IudmFsdWU7XHJcbiAgY29uc3QgYWRqdXN0ZWREZXNjcmlwdG9yOiBQcm9wZXJ0eURlc2NyaXB0b3IgPSB7XHJcbiAgICBlbnVtZXJhYmxlOiBmYWxzZSxcclxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcclxuICAgIGdldCgpIHtcclxuICAgICAgY29uc3QgYm91bmRGbiA9IG9yaWdpbmFsTWV0aG9kLmJpbmQodGhpcyk7XHJcbiAgICAgIHJldHVybiBib3VuZEZuO1xyXG4gICAgfSxcclxuICB9O1xyXG4gIHJldHVybiBhZGp1c3RlZERlc2NyaXB0b3I7XHJcbn1cclxuLy8gfVxyXG4iLCIvLyBuYW1lc3BhY2UgQXBwIHtcclxuZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XHJcbiAgQWN0aXZlLFxyXG4gIEZpbmlzaGVkLFxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUHJvamVjdCB7XHJcbiAgY29uc3RydWN0b3IoXHJcbiAgICBwdWJsaWMgaWQ6IHN0cmluZyxcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nLFxyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXHJcbiAgICBwdWJsaWMgcGVvcGxlOiBudW1iZXIsXHJcbiAgICBwdWJsaWMgc3RhdHVzOiBQcm9qZWN0U3RhdHVzXHJcbiAgKSB7fVxyXG59XHJcbi8vIH1cclxuIiwiaW1wb3J0IHsgUHJvamVjdCwgUHJvamVjdFN0YXR1cyB9IGZyb20gJy4vbW9kZWxzL3Byb2plY3QnO1xyXG5cclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcbnR5cGUgTGlzdGVuZXI8VD4gPSAoeDogVFtdKSA9PiB2b2lkO1xyXG5jbGFzcyBTdGF0ZTxUPiB7XHJcbiAgcHJvdGVjdGVkIGxpc3RlbmVyczogTGlzdGVuZXI8VD5bXSA9IFtdO1xyXG5cclxuICBhZGRMaXN0ZW5lcihsaXN0ZW5lckZuOiBMaXN0ZW5lcjxUPikge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChsaXN0ZW5lckZuKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBQcm9qZWN0U3RhdGUgZXh0ZW5kcyBTdGF0ZTxQcm9qZWN0PiB7XHJcbiAgcHJpdmF0ZSBwcm9qZWN0czogUHJvamVjdFtdID0gW107XHJcbiAgc3RhdGljIGluc3RhbmNlOiBQcm9qZWN0U3RhdGUgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgcHJpdmF0ZSBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgfVxyXG5cclxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XHJcbiAgICBpZiAodGhpcy5pbnN0YW5jZSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5pbnN0YW5jZTtcclxuICAgIH1cclxuICAgIHJldHVybiBuZXcgUHJvamVjdFN0YXRlKCk7XHJcbiAgfVxyXG5cclxuICBhZGRQcm9qZWN0KHRpdGxlOiBzdHJpbmcsIGRlc2NyaXB0aW9uOiBzdHJpbmcsIHBlb3BsZTogbnVtYmVyKSB7XHJcbiAgICBjb25zdCBuZXdQcm9qZWN0OiBQcm9qZWN0ID0gbmV3IFByb2plY3QoXHJcbiAgICAgIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoKSxcclxuICAgICAgdGl0bGUsXHJcbiAgICAgIGRlc2NyaXB0aW9uLFxyXG4gICAgICBwZW9wbGUsXHJcbiAgICAgIFByb2plY3RTdGF0dXMuQWN0aXZlXHJcbiAgICApO1xyXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKG5ld1Byb2plY3QpO1xyXG4gICAgdGhpcy5pbmZvcm1MaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIG1vdmVQcm9qZWN0KHByb2plY3RJZDogc3RyaW5nLCBwcm9qZWN0U3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XHJcbiAgICB0aGlzLnByb2plY3RzLm1hcCgocHJqOiBQcm9qZWN0LCBpbmRleDogbnVtYmVyKSA9PiB7XHJcbiAgICAgIGlmIChwcmouaWQgPT09IHByb2plY3RJZCAmJiBwcmouc3RhdHVzICE9IHByb2plY3RTdGF0dXMpIHtcclxuICAgICAgICBwcmouc3RhdHVzID0gcHJvamVjdFN0YXR1cztcclxuICAgICAgICB0aGlzLmluZm9ybUxpc3RlbmVycygpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIHByaXZhdGUgaW5mb3JtTGlzdGVuZXJzKCkge1xyXG4gICAgdGhpcy5saXN0ZW5lcnMuZm9yRWFjaCgobGlzdGVuZXJGbikgPT4gbGlzdGVuZXJGbih0aGlzLnByb2plY3RzLnNsaWNlKCkpKTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjb25zdCBwcm9qZWN0U3RhdGUgPSBQcm9qZWN0U3RhdGUuZ2V0SW5zdGFuY2UoKTtcclxuLy8gfVxyXG4iLCIvLyBuYW1lc3BhY2UgQXBwIHtcclxuZXhwb3J0IGludGVyZmFjZSBWYWxpZGF0YWJsZSB7XHJcbiAgdmFsdWU6IHN0cmluZyB8IG51bWJlcjtcclxuICByZXF1aXJlZD86IGJvb2xlYW47XHJcbiAgbWluTGVuZ3RoPzogbnVtYmVyO1xyXG4gIG1heExlbmd0aD86IG51bWJlcjtcclxuICBtaW4/OiBudW1iZXI7XHJcbiAgbWF4PzogbnVtYmVyO1xyXG59XHJcbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZShpbnB1dDogVmFsaWRhdGFibGUpIHtcclxuICBsZXQgdmFsaWQgPSB0cnVlO1xyXG4gIGlmIChpbnB1dC5yZXF1aXJlZCkge1xyXG4gICAgdmFsaWQgPSB2YWxpZCAmJiBpbnB1dC52YWx1ZS50b1N0cmluZygpLnRyaW0oKS5sZW5ndGggIT09IDA7XHJcbiAgfVxyXG4gIGlmIChpbnB1dC5taW5MZW5ndGggIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdzdHJpbmcnKSB7XHJcbiAgICB2YWxpZCA9IHZhbGlkICYmIGlucHV0LnZhbHVlLnRvU3RyaW5nKCkubGVuZ3RoID49IGlucHV0Lm1pbkxlbmd0aDtcclxuICB9XHJcbiAgaWYgKGlucHV0Lm1heExlbmd0aCAhPSBudWxsICYmIHR5cGVvZiBpbnB1dC52YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgIHZhbGlkID0gdmFsaWQgJiYgaW5wdXQudmFsdWUudG9TdHJpbmcoKS5sZW5ndGggPD0gaW5wdXQubWF4TGVuZ3RoO1xyXG4gIH1cclxuICBpZiAoaW5wdXQubWluICE9IG51bGwgJiYgdHlwZW9mIGlucHV0LnZhbHVlID09PSAnbnVtYmVyJykge1xyXG4gICAgdmFsaWQgPSB2YWxpZCAmJiBpbnB1dC52YWx1ZSA+PSBpbnB1dC5taW47XHJcbiAgfVxyXG4gIGlmIChpbnB1dC5tYXggIT0gbnVsbCAmJiB0eXBlb2YgaW5wdXQudmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICB2YWxpZCA9IHZhbGlkICYmIGlucHV0LnZhbHVlIDw9IGlucHV0Lm1heDtcclxuICB9XHJcbiAgcmV0dXJuIHZhbGlkO1xyXG59XHJcbi8vIH1cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvLyBmb3IgaW1wb3J0aW5nIGFuIGZlYXR1cmVzIGZyb20gbmFtZXNwYWNlLCB1c2UgdGhpcyBzeW50YXggKHRocmVlIHNsYXNoZXMhISk6XHJcbi8vIElNUE9SVEFOVDogb25jZSBpdCdzIGNvbXBpbGVkLCBKUyB3aWxsIGRlc3Ryb3kgYWxsIGRlcGVuZGVuY2llcyBiZWNhdXNlIEpTXHJcbi8vIGRvZXNuJ3Qga25vdyBuYW1lc3BhY2VzLCBzbyBpbiB0c2NvbmZpZy5qc29uLCBlbmFibGUgXCJvdXRGaWxlXCI6IFwiLi9kaXN0L2J1bmRsZS5qc1wiXHJcbi8vIGZvciBtZXJnaW4gYWxsIGRlcGVuZGVuY2llcyBpbnRvIG9uZSBmaWxlXHJcbi8vICEhXHJcbi8vIFVTSU5HIE5BTUVTUEFDRVMgaXMgbm90IGlkZWFsLCBpbiBuZXN0ZWQgZmlsZSBpdCdzIGFsc28gd29ya2luZyB3aXRob3V0IHJlZmVyaW5nXHJcbi8vIHRvIHBhcnRpY3VsYXIgZmlsZSwgd2hpY2ggaXMgbm90IGdvb2QgLT4gcmF0aGVyIHVzZSBFUzYgaW1wb3J0L2V4cG9ydFxyXG4vLyBmb3IgdGhhdCwgaW4gdHNjb25maWcuanNvbiwgdGFyZ2V0IHNob3VsZCBiZSBFUzIwMTUgKEVTNikgYW5kIFwib3V0RmlsZVwiOiBcIi4vZGlzdC9idW5kbGUuanNcIlxyXG4vLyBzaG91bGRuJ3QgYmUgdXNlZCAtPiBoZW5jZSB3aG9sZSBwcm9qZWN0IGZvbGRlciBzdHJ1Y3R1cmUgd2lsbCBiZSBjb3BpZWQgdG8gdGhlIGRpc3QgZm9sZGVyc1xyXG4vLyBBTkQgY2hhbmdlIGltcG9ydCBpbiBIVE1MIHRvOiA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIiBzcmM9XCIuL2Rpc3QvYnVuZGxlLmpzXCI+PC9zY3JpcHQ+XHJcbi8vICEhXHJcbi8qXHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL21vZGVscy9kcmFnLWRyb3AudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9tb2RlbHMvcHJvamVjdC50c1wiLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cInByb2plY3Qtc3RhdGUudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwidmFsaWRhdGlvbi50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2RlY29yYXRvcnMvYXV0b2JpbmQudHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9jb21wb25lbnRzL2Jhc2UtY29tcG9uZW50LnRzXCIgLz5cclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIi4vY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHNcIiAvPlxyXG4vLy8gPHJlZmVyZW5jZSBwYXRoPVwiLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dC50c1wiIC8+XHJcbiovXHJcblxyXG5pbXBvcnQgeyBQcm9qZWN0SW5wdXQgfSBmcm9tICcuL2NvbXBvbmVudHMvcHJvamVjdC1pbnB1dCc7XHJcbmltcG9ydCB7IFByb2plY3RMaXN0IH0gZnJvbSAnLi9jb21wb25lbnRzL3Byb2plY3QtbGlzdCc7XHJcblxyXG4vLyB0byB1c2UgZXhwb3J0ZWQgSW50ZWZhY2VzLCB3aG9sZSBhcHAgbXVzdCBiZSB3cmFwcGVkIGluIHRoZSBzYW1lICduYW1lJyBuYW1lc3BhY2VcclxuLy8gbmFtZXNwYWNlIEFwcCB7XHJcblxyXG4vLyByZWZlcmVuY2UgdG8gaW5zdGFuY2VzIGFyZSBub3QgbmVlZGVkLCBzbyB3ZSBkb24ndCBuZWVkIHRvXHJcbi8vIHNhdmUgaXQgaW50byB2YXJpYWJsZXNcclxubmV3IFByb2plY3RJbnB1dCgpO1xyXG5uZXcgUHJvamVjdExpc3QoJ2FjdGl2ZScpO1xyXG5uZXcgUHJvamVjdExpc3QoJ2ZpbmlzaGVkJyk7XHJcbi8vIH1cclxuXHJcbmNvbnNvbGUubG9nKCdoZWxvJyk7XHJcblxyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=