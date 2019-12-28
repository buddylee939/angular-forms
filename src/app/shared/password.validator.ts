import { AbstractControl } from '@angular/forms';

//  here the 'control' = registrationForm group, not the individual password or confirm password fields, its the whole group
export function PasswordValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  // this checks to see if the user has typed in the fields, because without it
  // as soon as the user starts typing the password, the confirm already displays an error
  if (password.pristine || confirmPassword.pristine) {
    return null;
  }
  // tests to see that both password and confirmpassword are there, and if the values match
  // if it doesnt then misMatch is true, if it does then null
  return password && confirmPassword && password.value !== confirmPassword.value ?
    { misMatch: true } :
    null;
}
