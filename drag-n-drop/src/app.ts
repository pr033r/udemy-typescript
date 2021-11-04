enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (x: T[]) => void;
class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

class ProjectState extends State<Project> {
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
    this.listeners.forEach((listenerFn) => listenerFn(this.projects.slice()));
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(input: Validatable) {
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

function Autobind(
  _: any, // to avoid warnings in TS, name it '_'
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    enumerable: false,
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

const _ = document;

interface FormInput {
  title: HTMLInputElement;
  description: HTMLInputElement;
  people: HTMLInputElement;
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  protected templateElement: HTMLTemplateElement;
  protected hostElement!: T;
  protected element!: U;

  constructor(
    templateId: string,
    hostElemenetId: string,
    where: InsertPosition,
    newElementId?: string
  ) {
    this.templateElement = _.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = _.getElementById(hostElemenetId)! as T;

    const importedNode = _.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(where);
  }

  private attach(where: InsertPosition) {
    this.hostElement.insertAdjacentElement(where, this.element);
  }

  protected abstract configure(): void;
  protected abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLinkElement> {
  constructor(hostId: string, private project: Project) {
    super('single-project', hostId, 'beforeend', project.id);
    this.configure();
    this.renderContent();
  }

  protected configure(): void {}

  protected renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector(
      'h3'
    )!.textContent = `Count of people: ${this.project.people.toString()}`;
    this.element.querySelector('p')!.textContent = this.project.description;
  }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', 'beforeend', `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  protected configure() {
    projectState.addListener((projects: Project[]) => {
      this.gatherProjects(projects);
      this.renderProjects();
    });
  }

  protected renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  private gatherProjects(projects: Project[]) {
    this.assignedProjects = projects.filter((x) => {
      if (this.type === 'active') {
        return x.status === ProjectStatus.Active;
      }
      return x.status === ProjectStatus.Finished;
    });
  }

  private renderProjects() {
    const listEl = _.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = '';
    this.assignedProjects.forEach((project) => {
      // only drawing into DOM, storing into variable is not needed
      new ProjectItem(this.element.querySelector('ul')!.id, project);
    });
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private f!: FormInput;

  constructor() {
    super('project-input', 'app', 'beforeend', 'user-input');
    this.configure();
  }

  protected configure() {
    this.f = {
      title: this.element.querySelector('#title') as HTMLInputElement,
      description: this.element.querySelector(
        '#description'
      ) as HTMLInputElement,
      people: this.element.querySelector('#people') as HTMLInputElement,
    };
    this.element.addEventListener('submit', this.submitHandler);
  }

  protected renderContent() {}

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault(); // do NOT call by default HTTP request
    try {
      const [title, description, people] = this.gatherUserInput();
      this.clearUserInput();
      projectState.addProject(title, description, people);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  }

  private gatherUserInput(): [string, string, number] {
    const title = this.f.title.value;
    const description = this.f.description.value;
    const people = this.f.people.value;

    if (this.verifyUserInput(title, description, people)) {
      throw new Error('Invalid input');
    }
    return [title, description, +people];
  }

  private verifyUserInput(
    enteredTitle: string,
    enteredDescription: string,
    enteredPeople: string
  ) {
    return (
      !validate({ value: enteredTitle, required: true, minLength: 5 }) ||
      !validate({
        value: enteredDescription,
        required: true,
        minLength: 5,
        maxLength: 255,
      }) ||
      !validate({ value: +enteredPeople, required: true, min: 1 })
    );
  }

  private clearUserInput() {
    this.f.title.value = '';
    this.f.description.value = '';
    this.f.people.value = '';
  }
}

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
