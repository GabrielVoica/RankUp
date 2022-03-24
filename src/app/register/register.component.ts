import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RegisterService } from '../register.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerService: RegisterService;
  loading = environment.loading;


  constructor(register: RegisterService, private renderer: Renderer2) {
    this.registerService = register;
   }

  ngOnInit(): void {
  }

  username: string;
  email: string;
  center: string;
  password: string;
  passwordConfirm: string;


  register(){
    this.registerService.registerUser({username: this.username, email: this.email, center: this.center, password: this.password, passwordConfirm: this.passwordConfirm});
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
