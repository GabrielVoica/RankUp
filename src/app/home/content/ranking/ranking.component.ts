import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { RankingService } from 'src/app/ranking.service';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';

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
    private session: SessionDataService
  ) {}

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    environment.loading = false;
  }

  private code;
  data;
  rankingData;
  rankingPositionsData;
  userId;
  userPosition;

  badge;
  studentBadged;
  pointsBadged;
  messageBadged;

  ngOnInit(): void {
    environment.loading = true;
    this.code = this.route.snapshot.paramMap.get('code');
    this.userId = this.session.getId();
    this.data = this.ranking.loadRankingData(this.code);
    this.data.subscribe((data) => {
      this.rankingData = data['data'];
    });

    this.data = this.ranking.loadRanking(this.code);
    this.data
      .subscribe((data) => {
        this.rankingPositionsData = data['data'];
        console.log(this.rankingData);
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
      return { background: 'black' };
    } else if (this.studentBadged == userId) {
      return { background: 'rgb(201, 78, 231)', transition: '0.3s background' };
    } else {
      return null;
    }
  }

  setBadge(badgeName) {
    this.badge = badgeName;
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
}
