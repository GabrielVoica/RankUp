import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  apiURL = environment.apiURL;
  imageSrc:any = '';
  status:boolean = false
  constructor(private http: HttpClient) { }
  ngOnInit(): void { }
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
  submit(){
    this.http.put(this.apiURL+'app/user?image=image&id=791', {'image':this.imageSrc})
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
      })
  }
}

