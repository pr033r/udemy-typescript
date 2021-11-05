const _ = document;
export class Component {
    constructor(templateId, hostElemenetId, where, newElementId) {
        this.templateElement = _.getElementById(templateId);
        this.hostElement = _.getElementById(hostElemenetId);
        const importedNode = _.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        if (newElementId) {
            this.element.id = newElementId;
        }
        this.attach(where);
    }
    attach(where) {
        this.hostElement.insertAdjacentElement(where, this.element);
    }
}
//# sourceMappingURL=base-component.js.map