import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EntryComponent } from './entry/entry.component';
import { CanvasComponent } from './canvas/canvas.component';
import { LandingComponent } from './landing/landing.component';
import { SecondComponent } from './landing/second/second.component';
import { RegisterComponent } from './register/register.component';
import { CookieModule } from 'ngx-cookie';


const routes: Routes = [
  { path: 'entry', component: EntryComponent },
  { path: '', component: LandingComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent,
    CanvasComponent,
    LandingComponent,
    SecondComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CookieModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
