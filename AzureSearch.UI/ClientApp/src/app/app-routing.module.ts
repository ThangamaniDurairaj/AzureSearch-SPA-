import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HomeComponent } from "./components/home/home.component";
import { ProfileComponent } from './components/profile/profile.component';
import { SourceComponent } from './components/source/source.component';


import { AuthService } from './services/auth.service';
import { SearchComponent } from './components/search/search.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: "", component: HomeComponent, data: { title: "Home" } },
            { path: "login", component: LoginComponent, data: { title: "Login" } },
            { path: "profile", component: ProfileComponent, data: { title: "Profile" } },
            { path: "source", component: SourceComponent, data: { title: "Source" } },
            { path: "search", component: SearchComponent, data: { title: "Search" } },
            { path: "home", redirectTo: "/", pathMatch: "full" },
        ])
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthService 
    ]
})
export class AppRoutingModule { }
