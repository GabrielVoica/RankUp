import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-rankings',
  templateUrl: './teacher-rankings.component.html',
  styleUrls: ['./teacher-rankings.component.css']
})
export class TeacherRankingsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  rankingsData;

  getRankings(){
    this.http.get(environment.apiURL + "app/")
  }

}