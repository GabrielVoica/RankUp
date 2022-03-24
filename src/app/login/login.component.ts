import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
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
