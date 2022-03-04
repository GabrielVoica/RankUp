import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private router: Router, private http: HttpClient, private cookie: CookieService) { }


  checkLogin(){
    this.cookie.set('user_type','fewfw');
   let user =  this.cookie.get('user_type');
    console.log(user);
  }
}
