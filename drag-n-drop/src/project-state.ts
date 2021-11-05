namespace App {
  type Listener<T> = (x: T[]) => void;
  class State<T> {
    protected listeners: Listener<T>[] = [];

    addListener(listenerFn: Listener<T>) {
      this.listeners.push(listenerFn);
    }
  }

  export class ProjectState extends State<Project> {
    private projects: Project[] = [];
    static instance: ProjectState | null = null;

    private constructor() {
      super();
    }

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      return new ProjectState();
    }

    addProject(title: string, description: string, people: number) {
      const newProject: Project = new Project(
        Math.random().toString(),
        title,
        description,
        people,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.informListeners();
    }

    moveProject(projectId: string, projectStatus: ProjectStatus) {
      this.projects.map((prj: Project, index: number) => {
        if (prj.id === projectId && prj.status != projectStatus) {
          prj.status = projectStatus;
          this.informListeners();
        }
      });
    }

    private informListeners() {
      this.listeners.forEach((listenerFn) => listenerFn(this.projects.slice()));
    }
  }

  export const projectState = ProjectState.getInstance();
}
