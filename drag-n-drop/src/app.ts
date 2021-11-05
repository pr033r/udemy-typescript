// for importing an features from namespace, use this syntax (three slashes!!):
// IMPORTANT: once it's compiled, JS will destroy all dependencies because JS
// doesn't know namespaces, so in tsconfig.json, enable "outFile": "./dist/bundle.js"
// for mergin all dependencies into one file
// !! 
// USING NAMESPACES is not ideal, in nested file it's also working without refering
// to particular file, which is not good -> rather use ES6 import/export 
// !!
/// <reference path="./models/drag-drop.ts" />
/// <reference path="./models/project.ts"/>
/// <reference path="project-state.ts" />
/// <reference path="validation.ts" />
/// <reference path="./decorators/autobind.ts" />
/// <reference path="./components/base-component.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />

// to use exported Intefaces, whole app must be wrapped in the same 'name' namespace
namespace App {

  // reference to instances are not needed, so we don't need to
  // save it into variables
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
