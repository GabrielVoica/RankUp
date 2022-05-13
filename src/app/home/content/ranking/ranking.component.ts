import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { RankingService } from 'src/app/ranking.service';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ranking: RankingService,
    private router: Router,
    private session: SessionDataService,
    private http: HttpClient
  ) {}

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    environment.loading = false;
  }

  private code;
  data;
  rankingData;
  rankingPositionsData = [
    {
      id: null,
      nick_name: null,
      points: 0,
      pointsSpend: 0,
      image: null,
      responsabilidad: 0,
      cooperacion: 0,
      autonomia_e_iniciativa: 0,
      gestion_emocional: 0,
      habilidades_de_pensamiento: 0,
    },
  ];
  userId;
  userPosition;
  userPointsToSpend;

  badge;
  studentBadged;
  pointsBadged;
  messageBadged;
  selectedUser;
  pointsAddedFromTeacher;
  pointsGivenByStudent = 0;
  unacceptedUsers;

  teacherName;
  rankingName;
  userType;
  expandedOptions = false;
  teacherOptionsMenuTitle = 'Alumnos';
  rankingTasks;

  ngOnInit(): void {
    environment.loading = true;
    this.userType = this.session.getType();
    this.code = this.route.snapshot.paramMap.get('code');
    this.userId = this.session.getId();
    this.data = this.ranking.loadRankingData(this.code);
    this.data.subscribe((data) => {
      this.rankingData = data['data'];

      if (
        this.rankingData.members <= 0 &&
        this.session.getType() == 'student'
      ) {
        this.router.navigate(['home']);
      }
      this.rankingName = data['data']['ranking_name'];

      this.http
        .get(environment.apiURL + 'app/user/' + data['data']['teacher_id'])
        .subscribe((data) => {
          this.teacherName = data['data']['nick_name'];
        });
    });

    this.data = this.ranking.loadRanking(this.code);
    this.data
      .subscribe((data) => {
        if (data['data']['accepted'][0] !== null) {
          this.rankingPositionsData = data['data']['accepted'];
          console.log(this.rankingPositionsData[0]);

          if (this.rankingPositionsData[0].id == null) {
            this.router.navigate(['home']);
          }
        } else {
          console.log('Helloooo');
        }

        this.rankingPositionsData.forEach((row) => {
          if (row.id == this.userId) {
            this.userPointsToSpend = row.pointsSpend;
          }
        });

        if (data['data']['unaccepted'][0] !== null) {
          this.unacceptedUsers = data['data']['unaccepted'];
        }


        console.log(this.rankingData.code);

       this.http.get(environment.apiURL + "app/rankingtask/" + this.rankingData.code).subscribe((data)=>{
          this.rankingTasks = data['data'];
          console.log(this.rankingTasks);
       });


      })
      .add(() =>
        setTimeout(() => {
          environment.loading = false;
        }, 500)
      );
  }

  loggedUserInRanking(userId, position) {
    if (this.userId == userId) {
      this.userPosition = position;
      return { background: 'black', cursor: 'default' };
    } else if (this.studentBadged == userId) {
      return { background: 'rgb(201, 78, 231)', transition: '0.3s background' };
    } else {
      return null;
    }
  }

  printPoints() {
    console.log(this.pointsGivenByStudent);
  }

  setBadge(badgeName, badgeOrder) {
    this.badge = badgeName;

    switch (badgeOrder) {
      case 1:
        (document.getElementById('badge-one') as HTMLElement).classList.add(
          'active'
        );
        (document.getElementById('badge-two') as HTMLElement).classList.remove(
          'active'
        );
        (
          document.getElementById('badge-three') as HTMLElement
        ).classList.remove('active');
        (document.getElementById('badge-four') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-five') as HTMLElement).classList.remove(
          'active'
        );
        break;
      case 2:
        (document.getElementById('badge-two') as HTMLElement).classList.add(
          'active'
        );
        (document.getElementById('badge-one') as HTMLElement).classList.remove(
          'active'
        );
        (
          document.getElementById('badge-three') as HTMLElement
        ).classList.remove('active');
        (document.getElementById('badge-four') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-five') as HTMLElement).classList.remove(
          'active'
        );
        break;
      case 3:
        (document.getElementById('badge-three') as HTMLElement).classList.add(
          'active'
        );
        (document.getElementById('badge-two') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-one') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-four') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-five') as HTMLElement).classList.remove(
          'active'
        );
        break;
      case 4:
        (document.getElementById('badge-four') as HTMLElement).classList.add(
          'active'
        );
        (document.getElementById('badge-two') as HTMLElement).classList.remove(
          'active'
        );
        (
          document.getElementById('badge-three') as HTMLElement
        ).classList.remove('active');
        (document.getElementById('badge-one') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-five') as HTMLElement).classList.remove(
          'active'
        );
        break;
      case 5:
        (document.getElementById('badge-five') as HTMLElement).classList.add(
          'active'
        );
        (document.getElementById('badge-two') as HTMLElement).classList.remove(
          'active'
        );
        (
          document.getElementById('badge-three') as HTMLElement
        ).classList.remove('active');
        (document.getElementById('badge-four') as HTMLElement).classList.remove(
          'active'
        );
        (document.getElementById('badge-one') as HTMLElement).classList.remove(
          'active'
        );
        break;
    }
  }

  setUserImage(imageLink, nickName) {
    if (imageLink !== null) {
      return { background: `url("${imageLink}")` };
    } else {
      return {
        backgroundImage: `url("https://avatars.dicebear.com/api/bottts/${nickName}.svg")`,
        backgroundSize: '90%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
      };
    }
  }

  selectUser(id, nickname) {
    if (this.userId !== id) {
      this.studentBadged = id;
      this.selectedUser = nickname;
    }
  }

  showPoints() {
    if (this.selectedUser == undefined) {
      alert('Error');
    } else if (
      this.pointsAddedFromTeacher > 10000 ||
      this.pointsAddedFromTeacher < -10000 ||
      this.pointsAddedFromTeacher == undefined
    ) {
      alert('Error');
    } else {
      environment.loading = true;
      this.http
        .put(
          environment.apiURL +
            'app/ranking?code=' +
            this.rankingData.code +
            '&id=' +
            this.studentBadged +
            '&points=' +
            this.pointsAddedFromTeacher,
          {}
        )
        .subscribe((data) => {
          window.location.reload();
          environment.loading = false;
        });
    }
  }


  showUsers(){

  }


  showTasks(){
    
  }

  appearOptions() {
    if (this.expandedOptions == false) {
      (document.querySelector('.teacher-controls') as HTMLElement).style.right =
        '0px';
      this.expandedOptions = true;
    } else {
      (document.querySelector('.teacher-controls') as HTMLElement).style.right =
        '-450px';
      this.expandedOptions = false;
    }
  }

  addBadgePoints() {
    if (this.userPointsToSpend >= this.pointsGivenByStudent) {
      let badge = '';
      environment.loading = true;

      switch (this.badge) {
        case 'responsability':
          badge = 'responsabilidad';
          break;
        case 'autonomy':
          badge = 'autonomia_e_iniciativa';
          break;
        case 'cooperation':
          badge = 'cooperacion';
          break;
        case 'autonomy':
          badge = 'autonomia_e_iniciativa';
          break;
        case 'gestion':
          badge = 'gestion_emocional';
          break;
        case 'habilidades':
          badge = 'habilidades_de_pensamiento';
          break;
      }

      this.http
        .put(
          environment.apiURL +
            'app/ranking?code=' +
            this.rankingData['code'] +
            '&' +
            badge +
            '=' +
            this.pointsGivenByStudent +
            '&id=' +
            this.studentBadged,
          {}
        )
        .subscribe((data) => {
          this.http
            .put(
              environment.apiURL +
                'app/ranking?code=' +
                this.rankingData['code'] +
                '&id=' +
                this.userId +
                '&pointsSpend=' +
                -this.pointsGivenByStudent,
              {}
            )
            .subscribe((data) => {
              location.reload();
              environment.loading = false;
            });
        });
    } else {
      alert('No tienes suficientes puntos');
    }
  }

  setBadgeBackground(badgeType, points) {
    let badge = '';

    switch (badgeType) {
      case 'responsability':
        badge = 'r';
        break;
      case 'cooperation':
        badge = 'c';
        break;
      case 'autonomy':
        badge = 'a';
        break;
      case 'emotional':
        badge = 'g';
        break;
      case 'thinking':
        badge = 'h';
        break;
    }

    if (points < 1000) {
      return null;
    } else if (points >= 1000 && points < 2000) {
      return { background: "url('/assets/badges/" + badge + "_uno.png')" };
    } else if (points >= 2000 && points < 4000) {
      return { background: "url('/assets/badges/" + badge + "_dos.png')" };
    } else if (points >= 4000 && points < 7000) {
      return { background: "url('/assets/badges/" + badge + "_tres.png')" };
    } else if (points >= 7000 && points < 10000) {
      return { background: "url('/assets/badges/" + badge + "_cuatro.png')" };
    } else {
      return { background: "url('/assets/badges/" + badge + "_cinco.png')" };
    }
  }

  acceptUser(id) {
    environment.loading = true;
    this.http
      .put(
        environment.apiURL +
          'app/ranking?code=' +
          this.rankingData['code'] +
          '&id=' +
          id +
          '&status=1',
        {}
      )
      .subscribe((data) => {
        location.reload();
        environment.loading = false;
      });
  }

  rejectUser(id) {
    environment.loading = true;
    this.http
      .delete(
        environment.apiURL +
          'app/ranking/' +
          this.rankingData['code'] +
          '/' +
          id
      )
      .subscribe((data) => {
        location.reload();
        environment.loading = false;
      });
  }
}
