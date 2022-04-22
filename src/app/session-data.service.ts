import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import {
  HttpClient,
  HttpHeaderResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SessionDataService {

 private userData = {
   id: '',
   username: '',
   email: '',
   center: '',
   image: '',
   type : ''
 };

 
  constructor(
   private http: HttpClient,
   private cookie: CookieService
  ) 
  {

  }

  setId(id){
   localStorage.setItem('id',id);
   this.userData.id = id;
  }

  setUsername(username){
    localStorage.setItem('username',username);
    this.userData.username = username;
  }

  setEmail(email){
    localStorage.setItem('email',email);
    this.userData.email = email;
  }

  setCenter(center){
    localStorage.setItem('center',center);
    this.userData.center = center;
  }

  setImage(image){
    localStorage.setItem('image',image);
    this.userData.image = image;
  }

  setType(type){
    localStorage.setItem('type',type);
    this.userData.type = type;
  }

  getId(){
  return localStorage.getItem('id');
  }

  getUsername(){
   return localStorage.getItem('username');
  }

  getEmail(){
   return localStorage.getItem('email');
  }

  getCenter(){
   return localStorage.getItem('center');
  }

  getImage(){
   return localStorage.getItem('image');
  }

  getType(){
   return localStorage.getItem('type');
  }


  deleteAll(){
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('center');
    localStorage.removeItem('image');
    localStorage.removeItem('type');
  }


}
