import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SessionDataService } from 'src/app/session-data.service';
import { DataUpdateService } from 'src/app/data-update.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private session: SessionDataService,
    private dataUpdate: DataUpdateService
  ) {}
  apiURL = environment.apiURL;
  imageSrc: any = '';

  username: string;
  email: string;
  name: string;
  lastname: string;

  status: boolean = false;
  id = this.session.getId();
  pic = this.session.getImage();
  user = this.session.getUsername();
  mail = this.session.getEmail();
  ngOnInit(): void {}
  onFileChange(event: any) {
    this.status = false;
    const file = event.target.files[0];
    this.status = event.target.files.length > 0 ? true : false;
    if (this.status == true) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
    }
  }
  submit() {
    environment.loading = true;
    this.http
      .put(this.apiURL + `app/user?nick_name=${this.username}&name=${this.name}&lastname=${this.lastname}&email=${this.email}&image=image&id=${this.id}`, {
        image: this.imageSrc,
      })
      .subscribe((res) => {
        this.dataUpdate.update(this.id);
      });
    
  }
  deleteimage() {
    this.http
      .put(this.apiURL + `app/user?image=null&id=${this.id}`, {
        image: this.imageSrc,
      })
      .subscribe((res) => {
        this.dataUpdate.update(this.id);
      });

  }
}
