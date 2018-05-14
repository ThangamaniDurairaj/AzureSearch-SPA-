
import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class EndpointFactory {

    static readonly apiVersion: string = "1";

    private readonly _loginUrl: string = "/connect/token";

    private get loginUrl() { return this.configurations.baseUrl + this._loginUrl; }

    private _authService: AuthService;

    private get authService() {
        if (!this._authService)
            this._authService = this.injector.get(AuthService);

        return this._authService;
    }

    constructor(protected http: HttpClient, protected configurations: ConfigurationService,  private injector: Injector) {

    }

    getLoginEndpoint<T>(userName: string, password: string): Observable<T> {

        try {
            let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

            let params = new HttpParams()
                .append('username', userName)
                .append('password', password)
                .append('grant_type', 'password')
                .append('scope', 'openid email phone profile offline_access roles')
                .append('resource', window.location.origin);

            let requestBody = params.toString();

            return this.http.post<T>(this.loginUrl, requestBody, { headers: header });
        }
        catch (ex) {
            alert(ex);
        }
    }

    protected getRequestHeaders(): { headers: HttpHeaders | { [header: string]: string | string[]; } } {
        let headers = new HttpHeaders({
            'Authorization': 'Bearer ' + this.authService.accessToken,
            'Content-Type': 'application/json',
            'Accept': `application/vnd.iman.v${EndpointFactory.apiVersion}+json, application/json, text/plain, */*`,
            'App-Version': '1.0'
        });

        return { headers: headers };
    }

}
