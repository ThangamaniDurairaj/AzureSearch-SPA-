import { Component, OnInit, OnDestroy, Input, ViewContainerRef  } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { AccountService } from "../../services/account.service";

import { UserLogin } from '../../models/user-login.model';
import { UserRegister } from '../../models/user-register.model';
import { Router, NavigationStart } from '@angular/router';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Passwordvalidator } from '../../classes/passwordvalidator';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
    selector: "app-login",
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

    public user: UserRegister = new UserRegister();
    public userLogin: UserLogin = new UserLogin();
    public hide: boolean = true;
    public hidec: boolean = true;

    selectedIndex: number = 0;

    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.email,
    ]);

    passwordFormControl = new FormControl('', [
        Validators.required
    ]);

    passwordGroup = new FormGroup({
        password: new FormControl('', []),
        conpassword: new FormControl('', [])
    });

    rememberMeFormControl = new FormControl('', [
        Validators.required
    ]);

    fullnameFormControl = new FormControl('', [
        Validators.required
    ]);

    usernameFormControl = new FormControl('', [
        Validators.required
    ]);

    phonenoFormControl = new FormControl('', [
        Validators.required
    ]);

    isLoading = false;
    formResetToggle = true;

    @Input()
    isModal = false;

    constructor(public authService: AuthService, private accountService: AccountService,
        public router: Router, public toastr: ToastsManager, vcr: ViewContainerRef,
        public fb: FormBuilder)
    {
        this.toastr.setRootViewContainerRef(vcr);

        this.passwordGroup = fb.group({
            password: ['', Validators.required],
            conpassword: ['', Validators.required]
        }, {
                validator: Passwordvalidator.MatchPassword  
            })
    }

    ngOnInit() {

        this.router.navigated = false;
        
        this.userLogin.rememberMe = this.authService.rememberMe;
        if (this.authService.isLoggedIn)
            this.router.navigateByUrl("/");
    }

    getShouldRedirect() {
        return !this.isModal && this.authService.isLoggedIn && !this.authService.isSessionExpired;
    }

    login() {
        this.isLoading = true;
       
        this.authService.login(this.userLogin)
            .subscribe(
            user =>  {
                setTimeout(() => {
                    this.isLoading = false;
                    this.reset();
                    this.router.navigateByUrl("/");
                }, 500);
            },
            error => {
                setTimeout(() => {
                    this.isLoading = false;
                    this.toastr.error('Invalid Email or Password !', 'Error!');
                }, 500);
            }
        );
    }

    newUser() {
        this.accountService.newUser(this.user)
            .subscribe(
            user => {
                setTimeout(() => {

                    if (user.result) {
                        this.selectedIndex -= 1;
                        this.toastr.success('Registered!', 'Success!');
                    }

                }, 500);
            },
            error => {
                setTimeout(() => {
                }, 500);
            }
            );
    }

    reset() {
        this.formResetToggle = false;

        setTimeout(() => {
            this.formResetToggle = true;
        });
    }
}
