import { AfterViewInit, Component, Inject, inject, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformServer } from '@angular/common';
import anime, { AnimeInstance } from 'animejs';
import { FormsModule } from '@angular/forms';
import { CoreService } from '@demo/core/core.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ngx-popovers-landing',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  platformId = inject(PLATFORM_ID);
  isServer = () => isPlatformServer(this.platformId);

  title = 'ngx-popovers';
  description = 'Angular Floating components';

  blocksCount = new Array(30).fill(0);

  animations: AnimeInstance[] = [];
  isDestroy = false;

  get blockWidth() {
    return (this.doc.documentElement.scrollWidth ?? 0) / 2;
  }

  get blockHeight() {
    return (this.doc.documentElement.scrollHeight ?? 0) / 3;
  }

  constructor(
    public core: CoreService,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngAfterViewInit() {
    if (!this.isServer()) {
      this.ngZone.runOutsideAngular(() => {
        this.animateBlocks();
        this.animateBlocksShadow();

        anime({
          targets: '.landing-header',
          opacity: [0, 1],
          easing: 'linear',
          duration: 300
        });

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
      });
    }
  }

  ngOnDestroy() {
    this.isDestroy = true;
  }

  animateBlocks = () => {
    if (this.isDestroy) {
      return;
    }
    anime({
      targets: '.block',
      translateX: () => anime.random(-this.blockWidth, this.blockWidth),
      translateY: () => anime.random(-this.blockHeight, this.blockHeight),
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
