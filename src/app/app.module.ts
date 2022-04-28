import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { EntryComponent } from './entry/entry.component';
import { CanvasComponent } from './canvas/canvas.component';
import { LandingComponent } from './landing/landing.component';
import { SecondComponent } from './landing/second/second.component';
import { RegisterComponent } from './register/register.component';
import { CookieModule } from 'ngx-cookie';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { ContentComponent } from './home/content/content.component';
import { ProfileComponent } from './home/content/profile/profile.component';
import { DashboardComponent } from './home/content/dashboard/dashboard.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { RankingsComponent } from './home/content/rankings/rankings.component';
import { RankingComponent } from './home/content/ranking/ranking.component';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { SessionDataService } from './session-data.service';
import { TeacherRankingsComponent } from './home/content/teacher-rankings/teacher-rankings.component';
import { AddRankingComponent } from './home/content/add-ranking/add-ranking.component';

const routes: Routes = [
  { path: 'entry', component: EntryComponent },
  { path: '', component: LandingComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'home', component: HomeComponent, 
  
  children: [
    {path: 'profile', component: ProfileComponent},
    {path: '',component: DashboardComponent},
    {path: 'rankings', component: RankingsComponent},
    {path: 'teacherRankings', component: TeacherRankingsComponent},
    {path: 'ranking/:code', component: RankingComponent},
    {path: 'add-ranking', component: AddRankingComponent}
   
  ]},
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryComponent,
    CanvasComponent,
    LandingComponent,
    SecondComponent,
    RegisterComponent,
    HomeComponent,
    SidebarComponent,
    ContentComponent,                         
    ProfileComponent,
    SpinnerComponent,
    DashboardComponent,
    RankingComponent,
    NotfoundComponent,
    RankingsComponent,
    AddRankingComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    CookieModule.forRoot(),
    FormsModule,
    CommonModule
  ],

  providers: [
    CookieService,
    SessionDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
