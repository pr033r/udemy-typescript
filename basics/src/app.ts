interface Admin {
  id: number;
  login: string;
} // same as: type Admin = {...}

interface RegularEmployee {
  privileges: string[];
  startDate: Date;
} // same as: type RegularEmployee = {...}

type ElevatedEmployee = RegularEmployee & Admin;
// interface ElevatedEmployee extends Admin, RegularEmployee {}
type UnknownEmployee = RegularEmployee | Admin;

function printEmployee(employee: UnknownEmployee) {
  // Type Guards
  if ('id' in employee) {
    console.log(`[${employee.id}] ${employee.login}`);
  }
  if ('privileges' in employee) {
    console.log(
      `-> privileges: ${employee.privileges} \n\t Start Date: ${employee.startDate}`
    );
  }
}

printEmployee({
  id: 270,
  login: 'lasakada',
});

printEmployee({
  privileges: ['admin', 'sys_admin', 'programmer'],
  startDate: new Date(),
});

interface Bird {
  type: 'bird'; // Discriminated Unions
  flyingSpeed: number;
}

interface Lion {
  type: 'lion'; // Discriminated Unions
  runingSpeed: number;
}

type Animal = Bird | Lion;

// with Discriminated Unions, we can more comforably
// decide 'type' of an object, otherwise we would need to
// use Type Guards as "if ('id' in employee)", but once
// the count of properties is rising, more if...else statements
// will be needed
// hence -> using 'type' property in interface. Name could be
// anything, not strictly 'type'
function printAnimal(animal: Animal) {
  let speed = 0;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'lion':
      speed = animal.runingSpeed;
      break;
    default:
      break;
  }
  console.log(`Speed = ${speed}`);
}

//==========================================================
// INDEX PROPERTIES

interface ErrorContainer {
  // ui: number; // ERROR -> it's not an string
  // id: string; // could be used -> Pre-defined property structure, but it must be in same format as bellow
  [key: string]: string; // add as many props as you want with this format
}

const errBag: ErrorContainer = {
  email: 'Not a valid email',
  name: 'Must start with a capital character',
};

const neco: String = 'adam lasak';

//==========================================================
// FUNCTION OVERLOADS

type Combined = number | string;

function _add(a: number, b: number): number;
function _add(a: string, b: string): string;
function _add(a: string, b: number): string;
function _add(a: number, b: string): string;
function _add(a: Combined, b: Combined) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const splitted = _add('1', '5').split('');

//==========================================================
// Optional Chaining AND Nullish Coalescing
const responseData = {
  name: 'GET',
  status: 200,
  data: {
    body: 'Fetch has been successful',
    params: 'get, 200, json',
    footer: '',
  },
};

// Optional Chaining
const resultOfResponse = responseData?.data?.body;

// Nullish Coalescing
const resultFooterWithOR = responseData?.data?.footer || 'DEFAULT';
const resultFooterWithNullish = responseData?.data?.footer ?? 'DEFAULT';

console.log(`Result footer with || :: ${resultFooterWithOR}`);
console.log(`Result footer with ?? :: ${resultFooterWithNullish}`);
