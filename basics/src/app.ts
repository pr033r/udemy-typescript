const button = document.querySelector("button")!;
const message = "Hello World!";

function onClick(this: any) {
  const me = this;
  console.log(`some message: ${me.message}`);
}

button.addEventListener("click", onClick.bind(this));
