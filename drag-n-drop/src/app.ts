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

type Listener = (projects: Project[]) => void;

// Project State Management
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  static instance: ProjectState | null = null;

  private constructor() {}

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new ProjectState();
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
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

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', 'beforeend', `${type}-projects`);

    projectState.addListener((projects: Project[]) => {
      this.gatherProjects(projects);
      this.renderProjects();
    });
    this.renderContent();
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
      const listItem = document.createElement('li');
      listItem.textContent = project.title;
      listEl.appendChild(listItem);
    });
  }

  protected renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' PROJECTS';
  }

  protected configure(): void {
    throw new Error('Method not implemented.');
  }
}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  private f!: FormInput;

  constructor() {
    super('project-input', 'app', 'beforeend', 'user-input');
    this.initFormInputs();
    this.configure();
  }

  private initFormInputs() {
    this.f = {
      title: this.element.querySelector('#title') as HTMLInputElement,
      description: this.element.querySelector(
        '#description'
      ) as HTMLInputElement,
      people: this.element.querySelector('#people') as HTMLInputElement,
    };
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

  protected configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  protected renderContent(): void {
    throw new Error('Method not implemented.');
  }
}

const projectInput = new ProjectInput();
const activeProjectsList = new ProjectList('active');
const finishedProjectsList = new ProjectList('finished');
