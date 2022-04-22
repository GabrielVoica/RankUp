import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerModule } from 'src/app/spinner/spinner.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContentComponent } from './content.component';
import { BrowserModule } from '@angular/platform-browser';
import { TeacherRankingsComponent } from './teacher-rankings/teacher-rankings.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ContentComponent,
    TeacherRankingsComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    FormsModule,
    BrowserModule
  ]
})
export class ContentModule { }
