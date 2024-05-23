import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "login", component: LoginComponent },
    { path: "admin", component: AdminComponent },
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '404', component: NotFoundComponent},
    {path: '**', component: NotFoundComponent}
];
