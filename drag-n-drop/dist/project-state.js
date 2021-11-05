import { Project, ProjectStatus } from './models/project.js';
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
export class ProjectState extends State {
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
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
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
export const projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map