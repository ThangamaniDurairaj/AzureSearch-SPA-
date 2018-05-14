import { Injectable } from '@angular/core';

import { LocalStoreManager } from './local-store-manager.service';
import { DBkeys } from './db-Keys';
import { Utilities } from './utilities';
import { environment } from '../../environments/environment';

type UserConfiguration = {
    language: string,
    homeUrl: string,
    theme: string,
    showDashboardStatistics: boolean,
    showDashboardNotifications: boolean,
    showDashboardTodo: boolean,
    showDashboardBanner: boolean
};

@Injectable()
export class ConfigurationService {

    public static readonly appVersion: string = "2.5.3";

    public baseUrl = environment.baseUrl || Utilities.baseUrl();
    public loginUrl = environment.loginUrl;
    public fallbackBaseUrl = "https://github.com/ThangamaniDurairaj";

    public static readonly defaultLanguage: string = "en";
    public static readonly defaultHomeUrl: string = "/";
    public static readonly defaultTheme: string = "Default";

    private _homeUrl: string;
    private _theme: string;


    constructor(private localStorage: LocalStoreManager) {
    }

    private saveToLocalStore(data: any, key: string) {
        setTimeout(() => this.localStorage.savePermanentData(data, key));
    }

    set homeUrl(value: string) {
        this._homeUrl = value;
        this.saveToLocalStore(value, DBkeys.HOME_URL);
    }
    get homeUrl() {
        if (this._homeUrl != null)
            return this._homeUrl;

        return ConfigurationService.defaultHomeUrl;
    }
}
