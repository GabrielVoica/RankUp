import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule,Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private session: SessionDataService) {
  }

   rankingCode: string = "";
   userType = this.session.getType();

  @ViewChild('codeInput') codeInput: ElementRef;



  ngOnInit(): void {
  }

  ngAfterViewInit(){
   environment.loading = false;
  }


  viewRanking(){
   if(!(this.rankingCode == "")){
     environment.loading = true;
     this.router.navigate(['home/ranking/', this.rankingCode]);
   }
   else{
     this.codeInput.nativeElement.style.animation = 'input-error 0.5s forwards';

     setTimeout(()=>{
       this.codeInput.nativeElement.style.animation = 'none';    
     },1000)
   }
  }


  updateCode(e){
    this.rankingCode = this.codeInput.nativeElement.value;
  }

}
