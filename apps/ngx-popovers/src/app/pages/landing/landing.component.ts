import { AfterViewInit, Component, inject, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformServer, NgOptimizedImage } from '@angular/common';
import anime from 'animejs';
import { FormsModule } from '@angular/forms';
import { CoreService } from '@demo/core/core.service';
import { RouterLink } from '@angular/router';
import { LandingCloudsComponent } from '@demo/pages/landing/landing-clouds';

@Component({
  selector: 'ngx-popovers-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    LandingCloudsComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  platformId = inject(PLATFORM_ID);
  isServer = () => isPlatformServer(this.platformId);

  title = 'ngx-popovers';
  description = 'Angular Floating components';

  constructor(
    public core: CoreService
  ) {}

  ngAfterViewInit() {
    if (!this.isServer()) {
      this.animateBlocks();
      this.animateBlocksShadow();

      anime.timeline()
        .add({
          targets: '.landing-heading',
          opacity: [0, 1],
          easing: 'linear',
          duration: 400
        })
        .add({
          targets: '.landing-docs-button',
          translateY: [40, 0],
          opacity: [0, 1],
          duration: 400
        });
    }
  }

  ngOnDestroy() {
  }

  animateBlocks = () => {
    anime({
      targets: '.block',
      scale: () => anime.random(1, 3),
      rotate: () => `${anime.random(-15, 15)}deg`,
      duration: 2000,
      delay: anime.stagger(20),
      easing: 'easeOutExpo',
      complete: this.animateBlocks
    });
  };

  animateBlocksShadow = () => {
    return anime({
      targets: '.block',
      boxShadow: '6px 9px 5vw 4px rgb(0 0 0 / 10%)',
      delay: anime.stagger(20),
      duration: 3000,
      easing: 'easeOutExpo'
    });
  };
}
