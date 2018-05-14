import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { RegResponse } from '../models/reg-response.model';

import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';


@Injectable()
export class AccountEndpoint extends EndpointFactory {

    private readonly _usersUrl: string = "/api/account/register";
    private readonly _currentUserUrl: string = "/api/account/users/me";

    get usersUrl() { return  this.configurations.baseUrl + this._usersUrl; }
    get currentUserUrl() { return this.configurations.baseUrl + this._currentUserUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {

        super(http, configurations, injector);
    }

    getUserEndpoint<T>(userId?: string): Observable<T> {
        let endpointUrl = userId ? `${this.usersUrl}/${userId}` : this.currentUserUrl;

        return this.http.get<T>(endpointUrl, this.getRequestHeaders());
    }

    getNewUserEndpoint<T>(userObject: any): Observable<RegResponse> {
       
        let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

        let params = new HttpParams()
            .append('username', userObject.userName)
            .append('password', userObject.password)
            .append('phoneNumber', userObject.phoneNumber)
            .append('confirmPassword', userObject.confirmPassword)
            .append('jobTitle', userObject.jobTitle)
            .append('fullName', userObject.fullName)
            .append('email', userObject.email)

        let requestBody = params.toString();

        return this.http.post<RegResponse>(this.usersUrl, requestBody, { headers: header }).
            map(response => this.RedirectLogin(response));
    }

    RedirectLogin(response: RegResponse) {
        return response;
    }
}
