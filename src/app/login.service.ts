import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { SessionDataService } from './session-data.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService,
    private sessionData: SessionDataService
  ) {}

  apiUrl = environment.apiURL;
  userType;

  checkLogin(data) {
    let userMail = data.email;
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    let loginResult = null;
    this.userType = data.type;

    this.http
      .post(
        this.apiUrl +
          'app/login?email=' +
          data.email +
          '&password=' +
          data.password,
        {},
        { headers: myheader }
      )
      .subscribe((data) => {
        this.createSession(data,userMail);
      });
  }

  createSession(data,email){
    if(data['code'] == 200){
      this.http.get(this.apiUrl + 'app/session/' + email ,{}).subscribe(data =>{
        let time = Date.now() + ((3600 * 1000) * 2);
        this.cookie.set('SESSION_ID',data['message']['id'],time);
      });

      this.saveGlobalState(data['data']['id']);

    }
    else if(data['code'] == 404){
      environment.loading = false;
    } 
  }


  saveGlobalState(id) {

    this.http.get(this.apiUrl + 'app/user/' + id,{}).subscribe(data =>{
      this.sessionData.setId(data['data']['id']);
      this.sessionData.setUsername(data['data']['nick_name']);
      this.sessionData.setEmail(data['data']['email']);
      this.sessionData.setCenter(data['data']['center']);
      this.sessionData.setImage(data['data']['image']);
      this.sessionData.setName(data['data']['name']);
      this.sessionData.setLastname(data['data']['lastname']);

      if(data['data']['user_type'] == 1){
       this.sessionData.setType('teacher');
      }
      else if(data['data']['user_type'] == 0){
        this.sessionData.setType('student');
      }
       this.router.navigate(['/home']);
       window.location.reload();
    });
  }
}
