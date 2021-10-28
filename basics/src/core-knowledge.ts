const add = (...args: number[]) => {
  return args.reduce((previous, current) => previous + current, 0);
};

const result = add(1, 5, 6, 2, 5.3);
console.log(result);

const hobbies = ['Programming', 'Hiking', 'Swimming'];
const user = {
  name: 'Adam',
  age: 25,
  skills: [{ programming: 10 }],
};
const [hobby1, hobby2, ...remainingHobbies] = hobbies; // destructuring an array -> does not change original array
const { name: userName, ...restParams } = user; // destructuring an object -> name prop of object stores in userName const variable

console.log(userName, restParams);

const addShort: (a: number, b: number) => number = (a, b) => a + b;

//-------------------------------------------------------------------------------------
// Check the generated US file
abstract class Logger {
  abstract log(message: string, code?: string | number): void;
}

class User extends Logger {
  log(message: string, code?: string | number): void {
    console.log(code, message);
  }
  private counterForLogout = 360;
  public static readonly VERSION = '1.1';
  private static instance: User;

  public get counter(): number {
    if (this.counterForLogout <= 0) {
      throw new Error('Your session expired');
    }
    return this.counterForLogout;
  }

  public set counter(v: number) {
    this.counterForLogout = v;
  }

  // with private, we enforces that user cannot create instance -> singleton
  private constructor(public login: string, public password: string) {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    return new User('lasakada', '12345');
  }

  whosLogged() {
    console.log(`> ${this.login} logged`);
  }

  // using this: User, prevents from unexptected behaviour as shown bellow
  decreaseCounterOfLogout(this: User, by: number) {
    this.counterForLogout -= by;
  }
}

// const loginUser = new User("lasakada@tietoevry.com", "12345"); // not working with singleton
const loginUser = User.getInstance();
const coppyUser = {
  decreaseCounterOfLogout: loginUser.decreaseCounterOfLogout,
};

// UNXPECTED BEHAVIOUR - prevented with using this: User in User class method
// coppyUser.decreaseCounterOfLogout(1); // ERROR: coppyUser Object has no same blueprint as User class
interface Nameble {
  name: string;
  getName?(): string;
}

interface Employee extends Nameble{
  work(): void;
  todo(): void;
  currentWork(): void;
}

abstract class Technican implements Employee {
  name = 'pr033r';
  work(): void {
    console.log('work() :: Call from abstract class Technican');
  }
  todo(): void {
    console.log('todo() :: Call from abstract class Technican');
  }
  currentWork(): void {
    console.log('currentWork() :: Call from abstract class Technican');
  }
  abstract jobDone(): void;
}

class Programmer extends Technican implements Employee {
  jobDone(): void {
    throw new Error('Method not implemented.');
  }
  todo(): void {
    console.log('todo() :: Call from class Programmer');
  }
  currentWork(): void {
    super.currentWork();
    console.log('currentWork() :: Call from class Programmer');
  }
}

const programmer = new Programmer();
programmer.todo(); // log -> todo() :: Call from class Programmer
programmer.work(); // log -> work() :: Call from abstract class Technican

// log -> currentWork() :: Call from abstract class Technican \n
// currentWork() :: Call from class Programmer
programmer.currentWork();
