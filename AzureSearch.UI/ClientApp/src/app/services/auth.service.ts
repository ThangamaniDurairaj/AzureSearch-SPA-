import { Injectable } from '@angular/core';
import { Router, NavigationExtras } from "@angular/router";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

import { LocalStoreManager } from './local-store-manager.service';
import { EndpointFactory } from './endpoint-factory.service';
import { DBkeys } from './db-Keys';
import { JwtHelper } from './jwt-helper';
import { Utilities } from './utilities';
import { LoginResponse, IdToken } from '../models/login-response.model';
import { User } from '../models/user.model';
import { ConfigurationService } from './configuration.service';
import { UserLogin } from '../models/user-login.model';

@Injectable()
export class AuthService {

    public get loginUrl() { return this.configurations.loginUrl; }
    public get homeUrl() { return this.configurations.homeUrl; }

    public loginRedirectUrl: string;
    public logoutRedirectUrl: string;

    public reLoginDelegate: () => void;

    private previousIsLoggedInCheck = false;
    private _loginStatus = new Subject<boolean>();


    constructor(private router: Router, private configurations: ConfigurationService,
        private endpointFactory: EndpointFactory, private localStorage: LocalStoreManager) {
        this.initializeLoginStatus();
    }


    private initializeLoginStatus() {
        this.localStorage.getInitEvent().subscribe(() => {
            this.reevaluateLoginStatus();
        });
    }

    redirectLoginUser() {
        let redirect = this.loginRedirectUrl && this.loginRedirectUrl != '/' &&
            this.loginRedirectUrl != ConfigurationService.defaultHomeUrl ? this.loginRedirectUrl : this.homeUrl;
        this.loginRedirectUrl = "/login";


        let urlParamsAndFragment = Utilities.splitInTwo(redirect, '#');
        let urlAndParams = Utilities.splitInTwo(urlParamsAndFragment.firstPart, '?');

        let navigationExtras: NavigationExtras = {
            fragment: urlParamsAndFragment.secondPart,
            queryParams: Utilities.getQueryParamsFromString(urlAndParams.secondPart),
            queryParamsHandling: "merge"
        };

        this.router.navigate([urlAndParams.firstPart], navigationExtras);
    }


    redirectLogoutUser() {
        this.logoutRedirectUrl = "/login";
        this.router.navigate([this.logoutRedirectUrl]);
    }


    redirectForLogin() {
        this.loginRedirectUrl = this.router.url;
        this.router.navigate([this.loginUrl]);
    }


    reLogin() {

        this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);

        if (this.reLoginDelegate) {
            this.reLoginDelegate();
        }
        else {
            this.redirectForLogin();
        }
    }

    login(userloginObject: UserLogin) {

        if (this.isLoggedIn)
            this.logout();

        try {
            return this.endpointFactory.getLoginEndpoint<LoginResponse>(userloginObject.email, userloginObject.password)
                .map(response => this.processLoginResponse(response, userloginObject.rememberMe));
        }
        catch (e) { alert(e); }
    }

    private processLoginResponse(response: LoginResponse, rememberMe: boolean) {

        let accessToken = response.access_token;

        if (accessToken == null)
            throw new Error("Received accessToken was empty");

        let idToken = response.id_token;
        let refreshToken = response.refresh_token || this.refreshToken;
        let expiresIn = response.expires_in;

        let tokenExpiryDate = new Date();
        tokenExpiryDate.setSeconds(tokenExpiryDate.getSeconds() + expiresIn);

        let accessTokenExpiry = tokenExpiryDate;

        let jwtHelper = new JwtHelper();
        let decodedIdToken = <IdToken>jwtHelper.decodeToken(response.id_token);

        let user = new User(
            decodedIdToken.sub,
            decodedIdToken.name,
            decodedIdToken.fullname,
            decodedIdToken.email,
            decodedIdToken.jobtitle,
            decodedIdToken.phone);
        user.isEnabled = true;

        this.saveUserDetails(user, accessToken, idToken, refreshToken, accessTokenExpiry, rememberMe);

        this.reevaluateLoginStatus(user);

        return user;
    }


    private saveUserDetails(user: User, accessToken: string, idToken: string, refreshToken: string, expiresIn: Date, rememberMe: boolean) {

        if (rememberMe) {
            this.localStorage.savePermanentData(accessToken, DBkeys.ACCESS_TOKEN);
            this.localStorage.savePermanentData(idToken, DBkeys.ID_TOKEN);
            this.localStorage.savePermanentData(refreshToken, DBkeys.REFRESH_TOKEN);
            this.localStorage.savePermanentData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
            this.localStorage.savePermanentData(user, DBkeys.CURRENT_USER);
        }
        else {
            this.localStorage.saveSyncedSessionData(accessToken, DBkeys.ACCESS_TOKEN);
            this.localStorage.saveSyncedSessionData(idToken, DBkeys.ID_TOKEN);
            this.localStorage.saveSyncedSessionData(refreshToken, DBkeys.REFRESH_TOKEN);
            this.localStorage.saveSyncedSessionData(expiresIn, DBkeys.TOKEN_EXPIRES_IN);
            this.localStorage.saveSyncedSessionData(user, DBkeys.CURRENT_USER);
        }

        this.localStorage.savePermanentData(rememberMe, DBkeys.REMEMBER_ME);
    }

    logout(): void {
        this.localStorage.deleteData(DBkeys.ACCESS_TOKEN);
        this.localStorage.deleteData(DBkeys.ID_TOKEN);
        this.localStorage.deleteData(DBkeys.REFRESH_TOKEN);
        this.localStorage.deleteData(DBkeys.TOKEN_EXPIRES_IN);
        this.localStorage.deleteData(DBkeys.CURRENT_USER);

        this.reevaluateLoginStatus();
    }


    private reevaluateLoginStatus(currentUser?: User) {

        let user = currentUser || this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
        let isLoggedIn = user != null;

        if (this.previousIsLoggedInCheck != isLoggedIn) {
            setTimeout(() => {
                this._loginStatus.next(isLoggedIn);
            });
        }

        this.previousIsLoggedInCheck = isLoggedIn;
    }


    getLoginStatusEvent(): Observable<boolean> {
        return this._loginStatus.asObservable();
    }


    get currentUser(): User {

        let user = this.localStorage.getDataObject<User>(DBkeys.CURRENT_USER);
        this.reevaluateLoginStatus(user);

        return user;
    }

    get accessToken(): string {

        this.reevaluateLoginStatus();
        return this.localStorage.getData(DBkeys.ACCESS_TOKEN);
    }

    get accessTokenExpiryDate(): Date {

        this.reevaluateLoginStatus();
        return this.localStorage.getDataObject<Date>(DBkeys.TOKEN_EXPIRES_IN, true);
    }

    get isSessionExpired(): boolean {

        if (this.accessTokenExpiryDate == null) {
            return true;
        }

        return !(this.accessTokenExpiryDate.valueOf() > new Date().valueOf());
    }


    get idToken(): string {

        this.reevaluateLoginStatus();
        return this.localStorage.getData(DBkeys.ID_TOKEN);
    }

    get refreshToken(): string {

        this.reevaluateLoginStatus();
        return this.localStorage.getData(DBkeys.REFRESH_TOKEN);
    }

    get isLoggedIn(): boolean {
        return this.currentUser != null;
    }

    get rememberMe(): boolean {
        return this.localStorage.getDataObject<boolean>(DBkeys.REMEMBER_ME) == true;
    }
}
