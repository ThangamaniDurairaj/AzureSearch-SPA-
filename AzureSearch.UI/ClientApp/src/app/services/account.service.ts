
import { Injectable } from '@angular/core';
import { AccountEndpoint } from './account-endpoint.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { UserEdit } from '../models/user-edit.model';
import { UserRegister } from '../models/user-register.model';

@Injectable()
export class AccountService {

    constructor(private authService: AuthService, private accountEndpoint: AccountEndpoint) {
    }

    getUser(userId?: string) {
        return this.accountEndpoint.getUserEndpoint<User>(userId);
    }

    newUser(user: UserRegister) {
        return this.accountEndpoint.getNewUserEndpoint<User>(user);
    }

    login(user: UserRegister) { };

    get currentUser() {
        return this.authService.currentUser;
    }

}
