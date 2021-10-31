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

class ProjectInput {
  private templateElement: HTMLTemplateElement;
  private hostElement: HTMLDivElement;
  private element: HTMLFormElement;
  private f!: FormInput;

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

  private gatherUserInput(): [string, string, number] {
    const enteredTitle = this.f.title.value;
    const enteredDescription = this.f.description.value;
    const enteredPeople = this.f.people.value;

    if (
      !validate({ value: enteredTitle, required: true, minLength: 5 }) ||
      !validate({
        value: enteredDescription,
        required: true,
        minLength: 5,
        maxLength: 255,
      }) ||
      !validate({ value: +enteredPeople, required: true, min: 1 })
    ) {
      throw new Error('Invalid input');
    }
    return [enteredTitle, enteredDescription, +enteredPeople];
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
      const formValues = this.gatherUserInput();
      this.clearUserInput();
      console.log(formValues);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
