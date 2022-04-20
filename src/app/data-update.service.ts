import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SessionDataService } from './session-data.service';

@Injectable({
  providedIn: 'root',
})
export class DataUpdateService {
  constructor(private http: HttpClient, private session:  SessionDataService) {}

  update(id) {
    this.http.get(environment.apiURL + 'app/user/' + id, {}).subscribe((data) => {
      this.session.setImage(data['data']['image']);
      this.session.setUsername(data['data']['nick_name']);
      this.session.setEmail(data['data']['email']);
      location.reload();
      environment.loading = false;
    });
  }
}
