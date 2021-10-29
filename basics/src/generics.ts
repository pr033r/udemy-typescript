interface Lenghty {
  length: number;
}

// Using generic Contraints enforce that given T type
// MUST HAVE 'length' property (for example: array, string, ...)
// returning TUPLE
function printLength<T extends Lenghty>(data: T): [T, string] {
  let res = 'No data given.';
  if (data.length === 1) {
    res = `Got ${data.length} element.`;
  } else if (data.length > 1) {
    res = `Got ${data.length} elements`;
  }
  return [data, res];
}
console.log(printLength('Hello World!'));

// Using KEYOF keyword. without keyof we'll receive:
// > "No index signature with a parameter of type 'string' was found on type '{}'"
function getPropertyValue<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}

// Using PARTIAL
// For cases that we fill in an object partialy -> during some if statements decisions etc.
// and we don't know the future values for object yet
interface Course {
  name: string;
  sections: string[];
  startDate: Date;
  pointsNeeded: number;
}

function startCourse(retrievedCourse: Course): Course {
  const resultCourse: Partial<Course> = {};
  // ...some code
  resultCourse.name = retrievedCourse.name;
  // ...some code
  resultCourse.sections = retrievedCourse.sections;
  // ...some code
  resultCourse.startDate = retrievedCourse.startDate;
  // ...some code
  resultCourse.pointsNeeded = retrievedCourse.pointsNeeded;
  // we don't want to return Partial<Course>
  // with using 'as' we as programmers know, that object is fully filled-in
  return resultCourse as Course;
}

// Using READONLY
// if we want to lock object or array
const players: Readonly<string[]> = ['Adam', 'Marek', 'Adam'];
type Skills = {
  sword: number,
  power: number,
  magic: number,
}
const skills: Readonly<Skills> = {
  sword: 80,
  power: 56,
  magic: 30,
};
// players.push('Honza') // ERROR -> not allowed
// skills.sword = 85; // ERROR -> not allowed
