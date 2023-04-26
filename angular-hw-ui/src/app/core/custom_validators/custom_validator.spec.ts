import { AbstractControl, ValidatorFn, ValidationErrors, FormGroup, FormControl } from '@angular/forms';

import { ValidateDescription } from './custom_validator';

describe('#ValidateDescription, password should have UpperCase, LowerCase and Numerics', () => {
    let validatorFn: any;

    beforeEach(() => {
        validatorFn = ValidateDescription();
    });

    it('should return null when the input value is a valid password (has both UpperCase, LowerCase and Numerics)', () => {
        const validPassword = 'Abcdefg1';
        const control = new FormControl(validPassword);
        const result = validatorFn(control);
        expect(result).toBeNull();
    });

    it('should return null when the input value is an invalid password (no UpperCase)', () => {
        const invalidPassword = 'bcdefg1';
        const control = new FormControl(invalidPassword);
        const result = validatorFn(control);
        expect(result).toEqual({ descriptionValid: true });
    });

    it('should return null when the input value is an invalid password (no LowerCase)', () => {
        const invalidPassword = 'ABCD12';
        const control = new FormControl(invalidPassword);
        const result = validatorFn(control);
        expect(result).toEqual({ descriptionValid: true });
    });

    it('should return null when the input value is an invalid password (no Numerics)', () => {
        const invalidPassword = 'Abcdefgh';
        const control = new FormControl(invalidPassword);
        const result = validatorFn(control);
        expect(result).toEqual({ descriptionValid: true });
    });
});
