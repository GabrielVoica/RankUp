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
import Swal from 'sweetalert2';
import { SessionDataService } from './session-data.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService,
    private session: SessionDataService
  ) {}

  apiUrl = environment.apiURL;
  userSessionData = environment.session;
  userType;
  message: any;

  registerUser({ ...values }) {
    let errors = {};

    if (!this.checkPasswords(values.password, values.passwordConfirm)) {
      errors['password'] = 'Las contraseñas no coinciden';
    }

    const myheader = new HttpHeaders().set('Content-Type', 'application/json');

    this.userType = this.cookie.get('user_type') == 'student' ? 0 : 1;

    let template = `app/register?nick_name=${values.username}&email=${values.email}&name=${values.name}&lastname=${values.lastname}&password=${values.password}&user_type=${this.userType}`;

    this.http
      .post(
        this.apiUrl +
          `app/register?nick_name=${values.username}&email=${values.email}&name=${values.name}&lastname=${values.lastname}&password=${values.password}&user_type=${this.userType}&conf_passwd=${values.password}&image=${values.value_img}&center=${values.center}`,
        { image: values.imageSrc },
        { headers: myheader }
      )
      .subscribe((data) => {
        if (data['code'] == 200) {
          this.createSession(data, values.email);
          console.log(data);
        } else {
          console.log(data);
          this.message = data
          Swal.fire({
            title: 'Campos erroneos',
            text: ''+this.message.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
          environment.loading = false;
        }
      });

    const isEmpty = Object.keys(errors).length === 0;
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
        this.cookie.set('SESSION_ID', data['message']['id']);
        this.setUserData(data['message']['user_id']);
      });
  }

  setUserData(id){
     this.http
          .get(this.apiUrl + 'app/user/' + id, {})
          .subscribe((data) => {
            this.session.setId(data['data']['id']);
            this.session.setUsername(data['data']['nick_name']);
            this.session.setEmail(data['data']['email']);
            this.session.setCenter(data['data']['center']);
            this.session.setImage(data['data']['image']);

            console.log(data['data']['image']);

            if (this.userType == 1) {
              this.session.setType('teacher');
            } else {
              this.session.setType('student');
            }

            this.router.navigate(['/home']);
          });
  }
}


