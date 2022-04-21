import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RegisterService } from '../register.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerService: RegisterService;
  loading = environment.loading;
  imageSrc:any = '';
  value_img: string;
  status:boolean = false

  onFileChange(event:any) {
    this.status = false
    const file = event.target.files[0];
    this.status = event.target.files.length>0?true:false
    if(this.status==true){
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => {
          this.imageSrc = reader.result;          
       }
    }
  }

  constructor(register: RegisterService, private renderer: Renderer2, private http: HttpClient) {
    this.registerService = register;
   }

  ngOnInit(): void {
  }

  username: string;
  email: string;
  center: string;
  name: string;
  lastname: string;
  password: string;
  passwordConfirm: string;




  register(){

    if(this.imageSrc == ''){
this.value_img = 'null'
    }else{
      this.value_img = 'image'
    }

    this.registerService.registerUser({username: this.username, email: this.email, center: this.center, name:this.name, lastname: this.lastname, password: this.password, passwordConfirm: this.passwordConfirm, imageSrc: this.imageSrc, value_img: this.value_img});
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
