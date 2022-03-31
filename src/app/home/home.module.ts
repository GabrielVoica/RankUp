import { ContentChild, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from '../spinner/spinner.module';
import { DashboardComponent } from './content/dashboard/dashboard.component';
import { ProfileComponent } from './content/profile/profile.component';
import { ContentComponent } from './content/content.component';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    DashboardComponent,
    ProfileComponent,
    ContentComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    BrowserModule
  ]
})
export class HomeModule { }
