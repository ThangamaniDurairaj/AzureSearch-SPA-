import { Component, OnInit } from '@angular/core';
import { AccountService } from "../../services/account.service";
import { User } from '../../models/user.model';
import { UserRegister } from '../../models/user-register.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    public user: User = new User();

    constructor(private accountService: AccountService) { }

    ngOnInit() {
        this.loaduser();
  }


     private loaduser() {
        this.accountService.getUser()
            .subscribe(user => this.onCurrentUserDataLoadSuccessful(user),
             error => { });


    }

    private onCurrentUserDataLoadSuccessful(user: User) {
        this.user = user;

    }
}
