import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  username: string;
  email: string;
  center: string;
  password: string;
  passwordConfirm: string;


  register(){
    console.log(this.email);
  }


}
