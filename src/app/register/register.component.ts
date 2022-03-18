import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerService: RegisterService;

  constructor(register: RegisterService) {
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
  }


}
