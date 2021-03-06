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

  status: boolean = false;
  id = this.session.getId();
  pic = this.session.getImage();

  username = this.session.getUsername();
  nickname = this.username;

  email = this.session.getEmail();
  mail = this.email;

  name = this.session.getName();
  nme = this.name;

  lastname = this.session.getLastname();
  last = this.lastname;
  centro = this.session.getCenter();
  center = this.centro;

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
    if (this.username == this.nickname && this.email == this.mail) {
      this.http
        .put(
          this.apiURL +
            `app/user?name=${this.name}&lastname=${this.lastname}&id=${this.id}&center=${this.centro}`,
          {
      
          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
        });
    }
    if (this.username == this.nickname && this.centro == this.center) {
      this.http
        .put(
          this.apiURL +
            `app/user?name=${this.name}&lastname=${this.lastname}&id=${this.id}&email=${this.email}`,
          {
      
          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
        });
    }
    if (this.centro == this.center && this.email == this.mail) {
      this.http
        .put(
          this.apiURL +
            `app/user?name=${this.name}&lastname=${this.lastname}&id=${this.id}&nick_name=${this.username}`,
          {
      
          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
        });
    }
    if (this.email == this.mail) {
      this.http
        .put(
          this.apiURL +
            `app/user?nick_name=${this.username}&name=${this.name}&lastname=${this.lastname}&id=${this.id}&center=${this.centro}`,
          {

          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
        });
    }
    if (this.centro == this.center) {
      this.http
      .put(
        this.apiURL +
          `app/user?nick_name=${this.username}&name=${this.name}&lastname=${this.lastname}&email=${this.email}&id=${this.id}`,
        {

          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
        });
    }
    if (this.username == this.nickname) {
      this.http
        .put(
          this.apiURL +
            `app/user?name=${this.name}&lastname=${this.lastname}&email=${this.email}&id=${this.id}&center=${this.centro}`,
          {
         
          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
        });
    } else {
      this.http
        .put(
          this.apiURL +
            `app/user?nick_name=${this.username}&name=${this.name}&lastname=${this.lastname}&email=${this.email}&center=${this.centro}&id=${this.id}`,
          {
         
          }
        )
        .subscribe((res) => {
          this.dataUpdate.update(this.id);
          console.log(res);
        });
    }
  }

  deleteimage() {
    environment.loading = true;
    this.http
      .put(this.apiURL + `app/user?image=null&id=${this.id}`, {
        image: this.imageSrc,
      })
      .subscribe((res) => {
        environment.loading = false;
        this.dataUpdate.update(this.id);
        console.log(res)
      });
  }

  saveImage() {
    environment.loading = true;
    this.http
    .put(
      this.apiURL +
        `app/user?image=image&id=${this.id}&id=${this.id}`,
      {
        image: this.imageSrc,
      }
    )
    .subscribe((res) => {
      this.dataUpdate.update(this.id);
      console.log(res);
      environment.loading = false;
    });
  }
}
