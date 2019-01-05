import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomepageComponent } from './homepage/homepage.component';
import { RegisterComponent } from './register/register.component';
import { UpdateComponent } from './update/update.component';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';

const app_routes: Routes = [
    { path: '', redirectTo: '/app/home', pathMatch: 'full' },
    // { path: 'login', component: LoginComponent },
    {
       path: 'app', component: HomeComponent,
       children: [
        { path: 'home', component: HomepageComponent },
        { path: 'register', component: RegisterComponent },
        { path: 'update/:id', component: UpdateComponent }
      ]
    }
  ];
  @NgModule({
    imports: [RouterModule.forRoot(app_routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {
  }
