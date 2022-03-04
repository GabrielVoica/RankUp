import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor(private router: Router, private http: HttpClient, private cookies: CookieService) {}

  apiUrl = environment.apiURL;

  entry(userType: string) {
    let httpUser: number;

    if (userType == 'student') {
      httpUser = 0;
    } else if (userType == 'teacher') {
      httpUser = 1;
    }

    let url = this.apiUrl + 'app/entry?user_type=' + httpUser;

    let response = this.http.post(
      this.apiUrl + 'app/entry?user_type=' + httpUser,
      null,
      {withCredentials: true} 
    );

    response.subscribe((data) =>{
      this.router.navigate(['login']);
    })

  }
}
