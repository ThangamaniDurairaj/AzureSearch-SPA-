import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { SearchService } from "../../services/search.service";
import { Source } from '../../models/source.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-source',
  templateUrl: './source.component.html',
  styleUrls: ['./source.component.css']
})
export class SourceComponent implements OnInit {

    public source: Source = new Source();

    constructor(private searchService: SearchService, public toastr: ToastsManager, vcr: ViewContainerRef)
    {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit()
    {
    }

    uploadFormControl = new FormControl('', [
        Validators.required
    ]);

    tagsFormControl = new FormControl('', [
        Validators.required
    ]);

    keywordsFormControl = new FormControl('', [
        Validators.required
    ]);

    websiteFormControl = new FormControl('', [
        Validators.required
    ]);

    linksFormControl = new FormControl('', [
        Validators.required
    ]);

    descriptionFormControl = new FormControl('', [
        Validators.required
    ]);

    AddContent() {

        this.searchService.AddContent(this.source)
            .subscribe(
            source => {
                setTimeout(() => {
                    this.toastr.success('Posted!', 'Success!');
                }, 500);
            },
            error => {
                setTimeout(() => {
                    this.toastr.error('Not posted!', 'Error!');
                }, 500);
            }
            );
    }
}
