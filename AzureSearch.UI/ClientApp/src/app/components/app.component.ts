import { Component, ViewEncapsulation, OnInit } from "@angular/core";
import { Router, NavigationStart } from '@angular/router';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { AuthService } from '../services/auth.service';
import { LoginComponent } from "../components/login/login.component";

@Component({
  selector: "app-root",
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  isAppLoaded: boolean;
  isUserLoggedIn: boolean;

  appTitle = "AzureSearch";

  dataLoadingConsecutiveFailurs = 0;

  constructor(storageManager: LocalStoreManager,private authService: AuthService,public router: Router) {
    storageManager.initialiseStorageSyncListener();
  }

    ngOnInit() {

    this.isUserLoggedIn = this.authService.isLoggedIn;

    setTimeout(() => this.isAppLoaded = true, 500);

      if (!this.isUserLoggedIn) {
          this.router.navigateByUrl("/login");
      }

    this.authService.getLoginStatusEvent()
    .subscribe(

        isLoggedIn => {
            this.isUserLoggedIn = isLoggedIn;
    });

    this.router.events.
        subscribe(
            event => {

    if (event instanceof NavigationStart) {
    let url = (<NavigationStart>event).url;

    if (url !== url.toLowerCase()) {
        this.router.navigateByUrl((<NavigationStart>event).url.toLowerCase());
    }
        }
    });

  }

  logout() {

    this.isUserLoggedIn = false;
    this.authService.logout();
    this.authService.redirectLogoutUser();
  }

  getYear() {
    return new Date().getUTCFullYear();
  }

  get userName(): string {
    return this.authService.currentUser ? this.authService.currentUser.userName : "";
  }

  get fullName(): string {
    return this.authService.currentUser ? this.authService.currentUser.fullName : "";
  }
}
