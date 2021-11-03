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

  return function <
    T extends {
      new (...args: any[]): { name: string; subtitle: string; text: string };
    }
  >(originalConstructor: T) {
    console.log('Rendering template');

    // Returning a new extended class from previous clas
    // plus some additional code.
    // - anonymous class is only syntactic-sugar for returning
    //   an anonymous function (class is function in JS) as well
    //   as constructor
    return class extends originalConstructor {
      // if TS complains that some var is declared but not used
      // put _ as a name of that variable (because that variable
      // must be there for some reason)
      constructor(..._: any[]) {
        super();
        if (data && data.template) {
          const el = document.querySelector(data.selector)!;
          // const p = new originalConstructor(); // we can use 'this' now
          el.innerHTML = data.template;
          el.querySelector('h1')!.textContent = this.name; // previously p.name
          el.querySelector('h2')!.textContent = this.subtitle;
          el.querySelector('p')!.innerHTML = this.text;
        }
      }
    };
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

function ParamDecorator(target: any, nameOfMethod: string, position: number) {
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

//-------------------------------------------------------
function Autobind(
  _: any, // to avoid warnings in TS, name it '_'
  _2: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    enumerable: false,
    configurable: true,

    // get() is like extra-layer between method which is executed and the object which it belongs
    // and the event listener -> hence 'this' won't be overwriten
    get() {
      // 'this' will refer to what is rensposible for triggering the 'set()' method
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return adjustedDescriptor;
}

class Printer {
  private message = 'Print this message';

  @Autobind
  printMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button')!;

// print 'undefined', 'this' is not related to 'p' instance - if @Autobind is not used
button.addEventListener('click', p.printMessage);

// classic approach
// print 'Print this message', 'this' is related to 'p' instance
// button.addEventListener('click', p.printMessage.bind(p));
//
