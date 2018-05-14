
export class UserLogin {

    constructor(public emailp?: string, public passwordp?: string, public rememberMep?: boolean) {
        this.email = emailp;
        this.password = passwordp;
        this.rememberMe = rememberMep;
    }

    email: string;
    password: string;
    rememberMe: boolean;
}
