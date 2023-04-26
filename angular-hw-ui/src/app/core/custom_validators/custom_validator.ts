import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function ValidateDescription(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]+/.test(value);
    const hasLowerCase = /[a-z]+/.test(value);
    const hasNumeric = (/[0-9]+/.test(value)); 
    const descriptionValid = hasUpperCase && hasLowerCase && hasNumeric;

    return !descriptionValid ? { descriptionValid: true } : null;
  }
}
