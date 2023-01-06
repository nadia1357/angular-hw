import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ValidateDescription(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNoNumeric = !(/[0-9]+/.test(value)); // description shouldn't contain numerics
    const descriptionValid = hasUpperCase && hasLowerCase && hasNoNumeric;

    return !descriptionValid ? { descriptionValid: true } : null;
  }
}