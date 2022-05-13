import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService, private cookie: CookieService, private router: Router) { }

  ngOnInit(): void {
    
    if(this.cookie.get('SESSION_ID')){
      this.router.navigate(['home']);
    }
  }

  public email: string;
  public password: string;


  login(){
    this.loginService.checkLogin({email : this.email, password : this.password});
    environment.loading = true;
  }


  loader(){
    if(environment.loading){
      return {opacity: '1', visibility: 'visible'}
    }
    else{
      return {opacity: '0', visibility: 'hidden'}
    }
  }
}
