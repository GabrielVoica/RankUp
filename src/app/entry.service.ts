import { Injectable, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  constructor(private router: Router, private http: HttpClient, private cookies: CookieService) {}

  apiUrl = environment.apiURL;

  entry(userType: string) {
    this.cookies.set('user_type',userType);
    this.router.navigate(['/login']);
  }
}
