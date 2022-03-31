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
export class RegisterService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService
  ) {}

  apiUrl = environment.apiURL;
  userSessionData = environment.session;
  userType;

  registerUser({ ...values }) {
    let errors = {};

    if (!this.checkPasswords(values.password, values.passwordConfirm)) {
      errors['password'] = 'Las contraseñas no coinciden';
    }

    const myheader = new HttpHeaders().set('Content-Type', 'application/json');

    this.userType = this.cookie.get('user_type') == 'student' ? 0 : 1;

    let template = `app/register?nick_name=${values.username}&email=${values.email}&password=${values.password}&user_type=${this.userType}`;

    this.http
      .post(
        this.apiUrl +
          `app/register?nick_name=${values.username}&email=${values.email}&password=${values.password}&user_type=${this.userType}&conf_passwd=${values.password}`,
        {},
        { headers: myheader }
      )
      .subscribe((data) => {
        if (data['code'] == 200) {
          console.log(data);
          this.createSession(data, values.email);
          
        } else {
          environment.loading = false;
          console.log(data);
        }
      });

    const isEmpty = Object.keys(errors).length === 0;

    if (isEmpty) {
      this.saveGlobalState(values);
    }
  }

  checkPasswords(password, passwordConfirm) {
    if (password === passwordConfirm) {
      return true;
    } else {
      return false;
    }
  }

  createSession(data, email) {
    this.http
      .get(this.apiUrl + 'app/session/' + email, {})
      .subscribe((data) => {
        console.log(data);
        this.cookie.set('SESSION_ID', data['message']['id']);
        this.router.navigate(['/home']);
      });
  }

  saveGlobalState(data) {
    environment.session.username = data.username;
    environment.session.email = data.email;
    environment.session.center = data.center;
    environment.session.picture = data.picture;

    if(this.userType == 1){
      environment.session.type = 'teacher';
    }
    else{
      environment.session.type = 'student';
    }
  }
}
