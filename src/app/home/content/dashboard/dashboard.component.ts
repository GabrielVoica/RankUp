import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule,Router } from '@angular/router';
import { AfterViewInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { SessionDataService } from 'src/app/session-data.service';
import { RankingComponent } from '../ranking/ranking.component';
import { RankingService } from 'src/app/ranking.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'; 


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private session: SessionDataService, private rankingService: RankingService) {
  }

   rankingCode: string = "";
   userType = this.session.getType();
   rankingExists: boolean;

  @ViewChild('codeInput') codeInput: ElementRef;



  ngOnInit(): void {
  }

  ngAfterViewInit(){
   environment.loading = false;
  }


  viewRanking(){
   if(!(this.rankingCode == "")){
     environment.loading = true;
     let response = this.rankingService.loadRanking(this.rankingCode);
response.subscribe((data)=>{
 if(data['code'] == 200){
  this.router.navigate(['home/ranking/', this.rankingCode]);
 }
 else if(data['code'] == 404){
   environment.loading = false;
   Swal.fire({
     title: 'El ranking no existe',
     icon: 'error'
   });
 }
});
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