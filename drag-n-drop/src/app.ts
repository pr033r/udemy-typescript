// for importing an features from namespace, use this syntax (three slashes!!):
// IMPORTANT: once it's compiled, JS will destroy all dependencies because JS
// doesn't know namespaces, so in tsconfig.json, enable "outFile": "./dist/bundle.js"
// for mergin all dependencies into one file
// !!
// USING NAMESPACES is not ideal, in nested file it's also working without refering
// to particular file, which is not good -> rather use ES6 import/export
// for that, in tsconfig.json, target should be ES2015 (ES6) and "outFile": "./dist/bundle.js"
// shouldn't be used -> hence whole project folder structure will be copied to the dist folders
// AND change import in HTML to: <script type="module" src="./dist/bundle.js"></script>
// !!
/*
/// <reference path="./models/drag-drop.ts" />
/// <reference path="./models/project.ts"/>
/// <reference path="project-state.ts" />
/// <reference path="validation.ts" />
/// <reference path="./decorators/autobind.ts" />
/// <reference path="./components/base-component.ts" />
/// <reference path="./components/project-item.ts" />
/// <reference path="./components/project-list.ts" />
/// <reference path="./components/project-input.ts" />
*/

import { ProjectInput } from './components/project-input.js';
import { ProjectList } from './components/project-list.js';

// to use exported Intefaces, whole app must be wrapped in the same 'name' namespace
// namespace App {

// reference to instances are not needed, so we don't need to
// save it into variables
new ProjectInput();
new ProjectList('active');
new ProjectList('finished');
// }
