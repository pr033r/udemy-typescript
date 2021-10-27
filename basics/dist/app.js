"use strict";
var button = document.querySelector("button");
var message = "Hello World!";
function onClick() {
    var me = this;
    console.log("some message: " + me.message);
}
button.addEventListener("click", onClick.bind(this));
//# sourceMappingURL=app.js.map