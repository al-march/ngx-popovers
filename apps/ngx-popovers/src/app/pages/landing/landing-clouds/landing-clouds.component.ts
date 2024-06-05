import { AfterViewInit, Component, ElementRef, inject, PLATFORM_ID, signal, viewChildren } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { CloudComponent } from '@demo/pages/landing/landing-clouds/cloud';
import anime from 'animejs';

function randomScale() {
  return anime.random(60, 90) / 100;
}

@Component({
  selector: 'ngx-clouds',
  standalone: true,
  imports: [CommonModule, CloudComponent],
  templateUrl: './landing-clouds.component.html',
  styleUrl: './landing-clouds.component.scss'
})
export class LandingCloudsComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);
  isServer = () => isPlatformServer(this.platformId);

  clouds = signal([
    {
      scale: randomScale(),
      top: 10,
      left: 7
    },
    {
      scale: randomScale(),
      top: 2,
      left: 90
    },
    {
      scale: 0.7,
      top: 32,
      left: 40
    },
    {
      scale: 0.4,
      top: 50,
      left: 58
    },
    {
      scale: 0.6,
      top: 12,
      left: 32
    },
    {
      scale: 0.5,
      top: 90,
      left: 80
    }
  ]);

  cloudsList = viewChildren<ElementRef<HTMLElement>>('cloudItem');

  ngAfterViewInit() {
    if (!this.isServer()) {
      const clouds = this.cloudsList().map(cloud => {
        return cloud.nativeElement;
      });

      anime.timeline()
        .add({
          targets: clouds,
          translateX: () => anime.random(-200, 200),
          translateY: () => anime.random(-50, 250),
          duration: 0
        })
        .add({
          direction: 'alternate',
          targets: clouds,
          translateX: () => anime.random(-500, 500),
          translateY: () => anime.random(-120, 120),
          duration: () => anime.random(20_000, 45_000),
          easing: 'linear',
          delay: anime.stagger(20),
          loop: true
        });
    }
  }

}
