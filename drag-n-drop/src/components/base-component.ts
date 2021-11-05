namespace App {
  const _ = document;

  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    protected templateElement: HTMLTemplateElement;
    protected hostElement!: T;
    protected element!: U;

    constructor(
      templateId: string,
      hostElemenetId: string,
      where: InsertPosition,
      newElementId?: string
    ) {
      this.templateElement = _.getElementById(
        templateId
      )! as HTMLTemplateElement;
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
}