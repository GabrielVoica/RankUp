import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private rankingData = {};

  constructor(private http: HttpClient) {}

  myheader = new HttpHeaders().set('Content-Type', 'application/json');
  loadRanking(code) {
    return this.http
      .get(
        environment.apiURL + 'app/ranking/' + code,
        {}
      ) 
  }
}
