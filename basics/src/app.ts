function DLogger(log: string) {
  // using an Decorator Factory - usefull when we want to pass arguments
  // into the decorator
  return function(constructor: Function) {
    console.log(log);
    console.log(constructor);
  }
}

function ViewTemplate(data: {selector: string, template: string}) {
  return function(constructor: any) {
    if (data.selector && data.template) {
      const el = document.querySelector(data.selector);
      const p = new constructor();
      if (el && p) {
        el.innerHTML = data.template;
        el.querySelector('h1')!.textContent = p.name;
        el.querySelector('h2')!.textContent = p.subtitle;
        el.querySelector('p')!.innerHTML = p.text;
      }
    }
  }
}

@DLogger('DECORATOR-PARAM')
@ViewTemplate({
  selector: 'app-root',
  template: '<h1></h1><h2></h2><p></p>',
})
class DPerson {
  name = 'Using custom decorators';
  subtitle = '@ViewTemplate';
  text = `The syntax for using this decorator is: <br>
    <span style="color: #00a;">@ViewTemplate(data: {selector: string, template: string})</span>`;

  constructor() {
    console.log('Calling a Person constructor...');
  }
}

const per = new DPerson();