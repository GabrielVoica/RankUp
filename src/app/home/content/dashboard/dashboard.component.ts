import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Routes, RouterModule,Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
    
  }

  session = environment.session.username;
  rankingCode: string;

  @ViewChild('codeInput') codeInput: ElementRef;

  ngOnInit(): void {
  
  }


  viewRanking(){
    this.router.navigate(['home/ranking/' + this.rankingCode]);
  }


  updateCode(e){
    this.rankingCode = this.codeInput.nativeElement.value;
  }

}
