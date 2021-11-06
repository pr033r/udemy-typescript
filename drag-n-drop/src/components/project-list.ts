import { Autobind } from '../decorators/autobind';
import { DragTarget } from '../models/drag-drop';
import { Project, ProjectStatus } from '../models/project';
import { projectState } from '../project-state';
import { Component } from './base-component';
import { ProjectItem } from './project-item';

// namespace App {
const _ = document;

export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProjects: Project[] = [];

  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', 'beforeend', `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  @Autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault(); // allowing Drag & Drop, by default it's turned off
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @Autobind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      projectId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @Autobind
  dragLeaveHandler(event: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  protected configure() {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
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
// }
