import { Component, OnInit } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  router: Router;

  constructor(router: Router) { 
    this.router = router;
  }

  ngOnInit(): void {
    this.router.navigate(['/home/dashboard']);
  }


  

}
