import { Component, effect, ElementRef, input, OnDestroy, viewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import anime from 'animejs';

@Component({
  selector: 'ngx-cloud',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cloud.component.html',
  styleUrl: './cloud.component.scss'
})
export class CloudComponent implements OnDestroy {
  scale = input(1);
  reverse = input(false);

  circles = viewChildren<ElementRef<HTMLElement>>('circle');

  private isDestroyed = false;


  constructor() {
    effect(() => {
      const circles = this.circles();

      if (circles) {
        circles.forEach((circle) => {
          this.animateCloudCircle(circle.nativeElement);
        });
      }
    });
  }

  ngOnDestroy() {
    this.isDestroyed = true;
  }

  animateCloudCircle = (circle: HTMLElement) => {
    if (this.isDestroyed) {
      return;
    }
    anime({
      targets: circle,
      scale: this.getRandomScale(),
      duration: this.getRandomDuration(),
      translateY: this.getRandomTranslate(),
      complete: this.animateCloudCircle.bind(this, circle),
      easing: 'linear'
    });
  };

  getRandomScale() {
    return anime.random(90, 100) / 100;
  }

  getRandomTranslate() {
    return anime.random(-50, 50) / 10;
  }

  getRandomDuration() {
    return anime.random(2000, 5000);
  }
}
