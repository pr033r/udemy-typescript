function DLogger(log: string) {
  // using an Decorator Factory - usefull when we want to pass arguments
  // into the decorator
  console.log('DLOGGER FACTORY');

  return function (constructor: Function) {
    console.log(log);
    console.log(constructor);
  };
}

function ViewTemplate(data: { selector: string; template: string }) {
  console.log('ViewTemplate FACTORY');

  return function (constructor: any) {
    console.log('Rendering template');
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
  };
}

function PropertyDecorator(target: any, name: string | Symbol) {
  const color = 'color: #a00;';
  console.log('%c @PropertyDecorator', color);
  console.log(`%c \t name = ${name}`, color);
  console.log('%c \t target = ' + target, color);
}

function AccessorDecorator(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const color = 'color: #0a0;';
  console.log('%c @AccessorDecorator', color);
  console.log(`%c \t name = ${name}`, color);
  console.log(`%c \t target = ${target}`, color);
  console.log(`%c \t descriptor = ${descriptor}`, color);
}

function MethodDecorator(
  target: any,
  name: string | Symbol,
  descriptor: PropertyDescriptor
) {
  const color = 'color: #00a;';
  console.log('%c @MethodDecorator', color);
  console.log(`%c \t name = ${name}`, color);
  console.log(`%c \t target = ${target}`, color);
  console.log(`%c \t descriptor = ${descriptor}`, color);
}

function ParamDecorator(target:any, nameOfMethod: string, position: number) {
  const color = 'color: #abc;';
  console.log('%c @ParamDecorator', color);
  console.log(`%c \t nameOfMethod = ${nameOfMethod}`, color);
  console.log(`%c \t target = ${target}`, color);
  console.log(`%c \t position = ${position}`, color);
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

  @PropertyDecorator
  private paramDecoratorProperty: string;

  @AccessorDecorator
  public set paramDecorator(v: string) {
    this.paramDecoratorProperty = v;
  }

  constructor(paramDec: string = 'paramDecoratorProperty') {
    this.paramDecoratorProperty = paramDec;
    console.log('Calling a Person constructor...');
  }

  @MethodDecorator
  getString(@ParamDecorator a: number, @ParamDecorator b: number) {
    return a + b;
  }
}

const per = new DPerson();
