import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule, Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';
import { RankingComponent } from '../ranking/ranking.component';
import { RankingService } from 'src/app/ranking.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private router: Router,
    private session: SessionDataService,
    private rankingService: RankingService,
    private http: HttpClient,
    private rankings: RankingService
  ) {}

  rankingCode: string = '';
  userType = this.session.getType();
  rankingExists: boolean;
  rankingCodes: Array<String> = [];
  rankingData: Array<{ code }> = [];
  rankinuser: any;
  status: any;
  id = this.session.getId();
  //
  @ViewChild('codeInput') codeInput: ElementRef;

  ngOnInit(): void {
    this.http
      .get(environment.apiURL + 'app/user/' + this.session.getId(), {})
      .subscribe((data) => {
        let rankings = data['data']['code'];

        if (rankings != undefined) {
          rankings.forEach((element) => {
            this.rankingCodes.push(element);
          });

          this.rankingData = [];

          this.rankingCodes.forEach((code) => {
            this.http
              .get(environment.apiURL + 'app/rankingdata/' + code, {})
              .subscribe((data) => {
                let dataArr = { code: null, name: null, description: null };
                dataArr.code = data['data']['code'];
                dataArr.name = data['data']['ranking_name'];
                dataArr.description = data['data']['description'];
                this.rankingData.push(dataArr);
                this.rankingData = this.rankingData.slice(0, 4);
                this.rankings.saveRecentTeacherRankings(this.rankingData);

                console.log(this.rankingData[0]);
              });
          });
        } else {
          this.rankingData[0] = { code: 'no rankings' };
          this.rankings.saveRecentTeacherRankings(this.rankingData);
        }
      });
  }

  ngAfterViewInit() {
    environment.loading = false;
  }

  viewRanking() {
    this.rankingService
      .checkStatus(this.rankingCode, this.id)
      .subscribe((data) => {
        if (data['code'] != 404) {
          this.rankinuser = data;
          this.status = this.rankinuser.data['status'];
      console.log(this.status);
      

          if (this.status == 1) {
            environment.loading = true;
            if (!(this.rankingCode == '')) {
              let response = this.rankingService.loadRanking(this.rankingCode);
              response.subscribe((data) => {
                if (data['code'] == 200) {
                  this.http
                    .post(
                      environment.apiURL +
                        'app/ranking?code=' +
                        this.rankingCode +
                        '&id=' +
                        this.session.getId(),
                      {}
                    )
                    .subscribe((data) => {
                      environment.loading = false;
                      this.router.navigate(['home/ranking/', this.rankingCode]);
                    });
                } else if (data['code'] == 404) {
                  environment.loading = false;
                  Swal.fire({
                    title: 'El ranking no existe',
                    icon: 'error',
                  });
                }
              });
            } else {
              this.codeInput.nativeElement.style.animation =
                'input-error 0.5s forwards';

              setTimeout(() => {
                this.codeInput.nativeElement.style.animation = 'none';
              }, 1000);
            }
          } else if (this.status == 0) {
            console.log('aqui');
            this.http
              .post(
                environment.apiURL +
                  'app/ranking?code=' +
                  this.rankingCode +
                  '&id=' +
                  this.session.getId(),
                {}
              )
              .subscribe((data) => {
                environment.loading = false;
              });
            Swal.fire({
              title: 'Solicitud para unirse enviada!',
              text: 'Un profesor esta revisando tu petición, puede tardar unas horas...',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
          } else {
            Swal.fire({
              title: 'Este código no existe!',
              text: 'Pon un código válido para enviar la solicitud',
              icon: 'error',
              confirmButtonText: 'Ok',
            });
          }
        }
      });
  }

  updateCode(e) {
    this.rankingCode = this.codeInput.nativeElement.value;
  }
}
