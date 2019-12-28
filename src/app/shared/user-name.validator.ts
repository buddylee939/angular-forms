import { AbstractControl, ValidatorFn } from '@angular/forms';

// if it fails, it returns an object of type string and the value is of type any,
// if validation passes, it returns null
// export function forbiddenNameValidator(control: AbstractControl): {[key: string]: any} | null {
//   // this tests to see if the value passed in == admin
//   const forbidden = /admin/.test(control.value);
//   // if it fails, it sends back the value that was passed in, if not then null
//   return forbidden ? { forbiddenName: {value: control.value}} : null;
// }


// this is so we can make a generic test, not only for admin, but maybe password
export function forbiddenNameValidator(forbiddenName: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = forbiddenName.test(control.value);
    return forbidden ? { forbiddenName: {value: control.value}} : null;
  };
}
