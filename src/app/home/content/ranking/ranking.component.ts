import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { RankingService } from 'src/app/ranking.service';
import { environment } from 'src/environments/environment';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css'],
})
export class RankingComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private ranking: RankingService,
    private router: Router
  ) {}

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {
    environment.loading = false;
  }

  private code;
  data;

  ngOnInit(): void {
    this.code = this.route.snapshot.paramMap.get('code');
    this.data = this.ranking.loadRanking(this.code);
    this.data.subscribe(data => this.data = data['data']).add(()=> environment.loading = false);
  }
}