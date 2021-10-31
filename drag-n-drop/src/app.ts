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

class ProjectInput {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private element: HTMLFormElement;
  private f!: {
    title: HTMLInputElement;
    description: HTMLInputElement;
    people: HTMLInputElement;
  };

  constructor() {
    this.templateElement = _.getElementById(
      'project-input'
    )! as HTMLTemplateElement;
    this.hostElement = _.getElementById('app')! as HTMLDivElement;

    const importedNode = _.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.f = {
      title: this.element.querySelector('#title') as HTMLInputElement,
      description: this.element.querySelector(
        '#description'
      ) as HTMLInputElement,
      people: this.element.querySelector('#people') as HTMLInputElement,
    };

    this.configure();
    this.attach();
  }

  @Autobind
  private submitHandler(e: Event) {
    e.preventDefault(); // do NOT call by default HTTP request
    console.log(this.f.title.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
