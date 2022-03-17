import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';





@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ContentModule { }
