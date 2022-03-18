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

 private userData = [];

 
  constructor(
   private http: HttpClient,
   private cookie: CookieService
  ) 
  {

  }




}
