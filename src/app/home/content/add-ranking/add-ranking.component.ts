import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';
import { RankingService } from 'src/app/ranking.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-ranking',
  templateUrl: './add-ranking.component.html',
  styleUrls: ['./add-ranking.component.css'],
})
export class AddRankingComponent implements OnInit {
  constructor(
    private router: Router,
    private session: SessionDataService,
    private rankingService: RankingService,
    private http: HttpClient
  ) {}
  ngOnInit(): void {

  }
  apiURL = environment.apiURL;
  rankingCode: string = '';
  userType = this.session.getType();
  rankingExists: boolean;
  rankingCodes: Array<String> = [];
  rankingData: Array<{}> = [];
  rankingName: string;
  rankingDesc: string;
  id = this.session.getId();

  addRanking() {
    this.http
      .post(this.apiURL +  `app/rankingdata?ranking_name=${this.rankingName}&description=${this.rankingDesc}&teacher_id=${this.id}&code=random&creationdate=CURRENT_TIMESTAMP`,{})
      .subscribe((res) => {console.log(res)});
  }
}
