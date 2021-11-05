namespace App {
  interface FormInput {
    title: HTMLInputElement;
    description: HTMLInputElement;
    people: HTMLInputElement;
  }
  
  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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
}