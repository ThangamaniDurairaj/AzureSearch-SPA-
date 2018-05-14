import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Response } from '@angular/http';


import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Source } from '../models/source.model';
import { Search } from '../models/search.model';


import { EndpointFactory } from './endpoint-factory.service';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class SearchEndpoint extends EndpointFactory {

    private readonly _searchUrl: string = "/api/search/document";
    private readonly _docPostUrl: string = "/api/search/document/post";

    get searchUrl() { return this.configurations.baseUrl + this._searchUrl; }
    get docPostUrl() { return this.configurations.baseUrl + this._docPostUrl; }

    constructor(http: HttpClient, configurations: ConfigurationService, injector: Injector) {
        super(http, configurations, injector);
    }

    AddContentEndpoint<T>(Source: any): Observable<T> {

        let header = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'  });

        let params = new HttpParams()
            .append('id', Source.id)
            .append('website', Source.website)
            .append('tags', Source.tags)
            .append('links', Source.links)
            .append('description', Source.description)
            .append('keywords', Source.keywords)

        let requestBody = params.toString();

        return this.http.post<T>(this.docPostUrl, requestBody, { headers: header });
    }

    GetContentEndpoint<T>(Search: Search): Observable<Response> {
       
        return this.http.get<Response>(this.searchUrl + "//" + Search.text, this.getRequestHeaders());
    }
}
