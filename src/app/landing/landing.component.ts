import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  HostListener,
  Renderer2,
  AfterContentInit,
} from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  constructor(private element: ElementRef, private renderer: Renderer2) {}

  @ViewChild('ball') ball: ElementRef;

  public interval: any;

  public mouseX: number = 0;
  public mouseY: number = 0;

  public ballY: number = 600;
  public ballX: number = 300;

  public dx: number = 0;
  public dy: number = 0;

  public ballWidth:number = 0;
  public ballHeight: number = 0;

  ngOnInit(): void {
    this.moveBall();
  }

  ballColor = 'rgba(0,0,0,0.2)';
  

  public moveBall() {
    setInterval(() => {
      this.dx = (this.mouseX - this.ballX) * 0.075;
      this.dy = (this.mouseY - this.ballY) * 0.075;

      this.ballX += this.dx - 1.2 - (this.ballWidth / 50);
      this.ballY += this.dy + 0.2 + (this.ballHeight / 200);

      this.renderer.setStyle(this.ball.nativeElement, 'top', (this.ballY + document.querySelector('html').scrollTop) + 'px');

      this.ballWidth = 35 + document.querySelector('html').scrollTop / 2;
      this.ballHeight = 35 + document.querySelector('html').scrollTop / 2;

      if(this.ballWidth > 150){
        this.ballWidth = 150;
        this.ballHeight = 80;
      }
    

      this.renderer.setStyle(this.ball.nativeElement,'width', this.ballWidth + 'px');
      this.renderer.setStyle(this.ball.nativeElement,'height', this.ballHeight + 'px');

      this.renderer.setStyle(
        this.ball.nativeElement,
        'left',
        this.ballX + 'px'
      );

    }, 10);
  }

  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  public x = 0;
  public y = 0;
}
