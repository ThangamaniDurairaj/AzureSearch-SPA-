
import { Injectable } from '@angular/core';
import { Source } from '../models/source.model';
import { Search } from '../models/search.model';

import { SearchEndpoint } from './search-endpoint.service';

@Injectable()
export class SearchService {

    constructor(private searchEndpoint: SearchEndpoint) {
    }

    AddContent(source: Source) {
        try {
            return this.searchEndpoint.AddContentEndpoint<Source>(source);
        }
        catch (e) { console.log(e);}
    }

    GetContent(search: Search) {
        try {
            return this.searchEndpoint.GetContentEndpoint<Search>(search);
        }
        catch (e) { console.log(e); }
    }
}
