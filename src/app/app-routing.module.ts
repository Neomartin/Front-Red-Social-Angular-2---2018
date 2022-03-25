import { NgModule} from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UsersComponent } from './components/users/users.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UserPublicationsComponent } from './components/user-publications/user-publications.component';
import { FollowingComponent } from './components/following/following.component';
// import { TimelineComponent } from './components/timeline/timeline.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'user-edit', component: UserEditComponent },
    { path: 'users', component: UsersComponent },
    { path: 'users/:page', component: UsersComponent },
    { path: 'profile/:id', component: ProfileComponent},
    { path: 'user-publications', component: UserPublicationsComponent},
    { path: 'following/:id/:page', component: FollowingComponent },
    // { path: 'timeline', component: TimelineComponent },
    { path: 'publications', component: PublicationsComponent},
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
        // {enableTracing:true}  <-- debugging purposes only
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}

