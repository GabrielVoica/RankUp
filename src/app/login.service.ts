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

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  apiUrl = environment.apiURL;

  checkLogin(data) {
    let userMail = data.email;
    const myheader = new HttpHeaders().set('Content-Type', 'application/json');
    let loginResult = null;

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
        this.cookie.set('SESSION_ID',data['message']['id']);
         this.router.navigate(['/home']);
      });
    }
    else if(data['code'] == 404){
      environment.loading = false;
    }
  }
}
