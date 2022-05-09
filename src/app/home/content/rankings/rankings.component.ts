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
  code: string;
  name: string;
  description: string;

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
              let dataArr = {
                code: null,
                name: null,
                description: null,
                teacher_id: null,
                members: null,
              };
              dataArr.code = data['data']['code'];

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

  updateRanking(code: string) {
    environment.loading = true;
    this.http
      .put(
        this.apiURL +
          `app/rankingdata?ranking_name=${this.rankingName}&description=${this.rankingDesc}&code=${code}`,
        {}
      )
      .subscribe((res) => {
        console.log(res);
        location.reload();
        environment.loading = false;
      });
  }
  delete(code: string) {

    Swal.fire({
      title: '¿Seguro que quieres borrar este ranking?',
      text: 'Este ranking no se va a poder recuperar...',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Borrar',
    }).then((result) => {
      environment.loading = true;
      if (result.isConfirmed) {
        environment.loading = true;
        this.http
          .delete(this.apiURL + `app/rankingdata/${code}`, {})
          .subscribe((res) => {
            console.log(res);
            location.reload();
            environment.loading = false;
          });
      } else {
        environment.loading = false;
      }
    });



  }
  updateCode(code: string) {
    Swal.fire({
      title: '¿Quieres generar un nuevo código?',
      text: 'El codigo de acceso se generará automaticamente',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Generar',
    }).then((result) => {
      environment.loading = true;
      if (result.isConfirmed) {
        this.http
          .put(
            this.apiURL + `app/rankingdata?code=${code}&coderandom=random`,
            {}
          )
          .subscribe((res) => {
            console.log(res);
            location.reload();
            environment.loading = false;
          });
      } else {
        environment.loading = false;
      }
    });
  }
}
