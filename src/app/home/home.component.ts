import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { Routes, RouterModule,Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  router: Router;
  renderer: Renderer2;
  closed: Boolean = true;

  constructor(router: Router, element: ElementRef, renderer: Renderer2) { 
    this.router = router;
    this.renderer = renderer;
  }

  @ViewChild('sidebar') sidebar: ElementRef;

  ngOnInit(): void {
    
  }

  closeSideBar(){
    this.renderer.setAttribute(this.sidebar.nativeElement,'class',this.closed ? 'sidebar' : 'sidebar closed');
    this.closed = !this.closed;
  }

  

}
