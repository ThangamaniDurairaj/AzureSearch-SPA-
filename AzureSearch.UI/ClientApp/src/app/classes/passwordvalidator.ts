import { AbstractControl } from '@angular/forms';

export class Passwordvalidator {

    static MatchPassword(AC: AbstractControl) {
        let password = AC.get('password').value; 
        let confirmPassword = AC.get('conpassword').value; 
        if (password != confirmPassword) {
            AC.get('conpassword').setErrors({ MatchPassword: true })
        } else {
            return null
        }
    }

}

