import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
} from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { SessionDataService } from '../session-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  router: Router;
  renderer: Renderer2;
  closed: Boolean = true;
  userType;

  constructor(
    router: Router,
    element: ElementRef,
    renderer: Renderer2,
    private session: SessionDataService,
    private cookie: CookieService
  ) {
    this.router = router;
    this.renderer = renderer;
  }

  @ViewChild('sidebar') sidebar: ElementRef;

  ngOnInit(): void {
    if(!this.cookie.get("SESSION_ID")){
      this.router.navigate(['login']);
    }
    environment.loading = false;
    this.userType = this.session.getType();
  }

  closeSideBar() {
    this.renderer.setAttribute(
      this.sidebar.nativeElement,
      'class',
      this.closed ? 'sidebar' : 'sidebar closed'
    );
    this.closed = !this.closed;
  }

  loader() {
    if (environment.loading == true) {
      return { opacity: '1', visibility: 'visible' };
    } else {
      return { opacity: '0', visibility: 'hidden' };
    }
  }

  exit() {
    environment.loading = true;
    this.cookie.delete('SESSION_ID');
    this.session.deleteAll();
    this.router.navigate(['/']);
  }
}