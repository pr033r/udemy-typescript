namespace App {
  export class ProjectItem
    extends Component<HTMLUListElement, HTMLLinkElement>
    implements Draggable
  {
    constructor(hostId: string, private project: Project) {
      super('single-project', hostId, 'beforeend', project.id);
      this.configure();
      this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent): void {
      event.dataTransfer!.setData('text/plain', this.project.id);
      event.dataTransfer!.effectAllowed = 'move';
    }

    @Autobind
    dragEndHandler(_: DragEvent): void {
      console.log('Drag End Handler');
    }

    protected configure(): void {
      this.element.addEventListener('dragstart', this.dragStartHandler);
      this.element.addEventListener('dragend', this.dragEndHandler);
    }

    protected renderContent(): void {
      this.element.querySelector('h2')!.textContent = this.project.title;
      this.element.querySelector(
        'h3'
      )!.textContent = `Count of people: ${this.project.people.toString()}`;
      this.element.querySelector('p')!.textContent = this.project.description;
    }
  }
}
