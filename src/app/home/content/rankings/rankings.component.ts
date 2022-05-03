import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';
import { RankingComponent } from '../ranking/ranking.component';
import { RankingService } from 'src/app/ranking.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css'],
})
export class RankingsComponent implements OnInit {
  constructor(
    private router: Router,
    private session: SessionDataService,
    private rankingService: RankingService,
    private http: HttpClient,
    route: ActivatedRoute
  ) {}
  apiURL = environment.apiURL;
  rankingCode: string = '';
  userType = this.session.getType();
  rankingExists: boolean;
  rankingCodes: Array<String> = [];
  rankingData: Array<{}> = [];
  rankingName: string;
  rankingDesc: string;
  actualRanking: string;

  @ViewChild('codeInput') codeInput: ElementRef;

  ngOnInit(): void {
    this.http
      .get(environment.apiURL + 'app/user/' + this.session.getId(), {})
      .subscribe((data) => {
        let rankings = data['data']['code'];
   

        rankings.forEach((element) => {
          this.rankingCodes.push(element);
        });

        this.rankingCodes.forEach((code) => {
          this.http
            .get(environment.apiURL + 'app/rankingdata/' + code, {})
            .subscribe((data) => {
              let dataArr = { code: null, name: null, description: null, teacher_id: null, members: null };
             this.actualRanking=  dataArr.code = data['data']['code'];

              dataArr.name = data['data']['ranking_name'];
              dataArr.description = data['data']['description'];
              dataArr.teacher_id = data['data']['nick_name'];
              dataArr.members = data['data']['members'];
              this.rankingData.push(dataArr);
              console.log(this.rankingData);
            });
        });
      });
  }

  ngAfterViewInit() {
    environment.loading = false;
  }

  updateRanking() {
    this.http
      .put(
        this.apiURL +
          `app/rankingdata?ranking_name=${this.rankingName}&description=${this.rankingDesc}&code=${this.actualRanking}`,
        {}
      )
      .subscribe((res) => {
        console.log(this.actualRanking);
        console.log(this.rankingData['code']);
      });
  }
  delete() {
    // console.log(this.rankingCodes[0]);

    this.http
    .delete(
      this.apiURL +
        `app/rankingdata/${this.actualRanking}`,
      {}
    )
    .subscribe((res) => {
      console.log(res);
      console.log(this.actualRanking);
    });
  }
  go() {
    // console.log(this.actualRanking);
    document.location.href = 'http://localhost:4200/home/add-ranking';
  }
}
