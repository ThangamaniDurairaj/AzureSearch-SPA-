import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SearchService } from "../../services/search.service";
import { Source } from '../../models/source.model';
import { Search } from '../../models/search.model';
import { PageEvent } from '@angular/material';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    public source: Source = new Source();
    public search: Search = new Search();

    p: number;

    public data: Object;

    constructor(private searchService: SearchService, public toastr: ToastsManager, vcr: ViewContainerRef)
    {
        this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {
  }

    SearchFormControl = new FormControl('', [
        Validators.required
    ]);

    length = 10;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];

    pageEvent: PageEvent;

    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
   
    GetContent() {

        this.searchService.GetContent(this.search)
            .subscribe(searchr => {
                setTimeout(() => {
                    this.data = searchr;
                    this.toastr.success('Search Found!', 'Success!');
                }, 500);
            },
            error => {
                setTimeout(() => {
                    this.toastr.info('No Search Found!', 'Info!');
                    this.toastr.warning('Unauthorized!', 'Warn!');
                }, 500);
            }
            );
    }

}
