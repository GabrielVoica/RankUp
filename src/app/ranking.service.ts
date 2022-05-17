import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class RankingService {
  private rankingData = {};
  teacherRankings;

  constructor(private http: HttpClient) {}

  myheader = new HttpHeaders().set('Content-Type', 'application/json');
  
  loadRanking(code) {
    return this.http
      .get(
        environment.apiURL + 'app/ranking/' + code,
        {}
      ) 
  }

  loadRankingData(code){
    return this.http.get(
      environment.apiURL + 'app/rankingdata/' + code,
      {}
    )
  }

  checkStatus(code,id){
    return this.http.get(
      environment.apiURL + 'app/ranking/'+code+'/'+id,
      {}
    )
  }

  deleteUserRanking(code,id){
    return this.http.delete(
      environment.apiURL + 'app/ranking/'+code+'/'+id,
      {}
    )
  }



  saveRecentTeacherRankings(rankings){
    this.teacherRankings = rankings;
  }

  getRecentTeacherRankings(){
    return this.teacherRankings;
  }
}
