namespace App {
  interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  }
  export function validate(input: Validatable) {
    let valid = true;
    if (input.required) {
      valid = valid && input.value.toString().trim().length !== 0;
    }
    if (input.minLength != null && typeof input.value === 'string') {
      valid = valid && input.value.toString().length >= input.minLength;
    }
    if (input.maxLength != null && typeof input.value === 'string') {
      valid = valid && input.value.toString().length <= input.maxLength;
    }
    if (input.min != null && typeof input.value === 'number') {
      valid = valid && input.value >= input.min;
    }
    if (input.max != null && typeof input.value === 'number') {
      valid = valid && input.value <= input.max;
    }
    return valid;
  }
}
