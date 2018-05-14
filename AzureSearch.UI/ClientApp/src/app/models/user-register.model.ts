
import { User } from './user.model';

export class UserRegister extends User {

    constructor(password?: string, confirmPassword?: string, userName?: string, email?: string) {
        super();

        this.password = password;
        this.confirmPassword = confirmPassword;
        this.userName = userName;
        this.email = email;
    }

    public password: string;
    public confirmPassword: string;
    public userName: string;
    public email: string;
}
