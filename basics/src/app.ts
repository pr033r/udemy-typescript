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
