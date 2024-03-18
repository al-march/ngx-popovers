import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  inject,
  NgZone,
  PLATFORM_ID,
  QueryList,
  ViewChildren
} from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformServer } from '@angular/common';
import anime from 'animejs';
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
export class LandingComponent implements AfterViewInit {
  platformId = inject(PLATFORM_ID);
  isServer = () => isPlatformServer(this.platformId);

  title = 'ngx-popovers';
  description = 'Angular Floating components';

  blocksCount = new Array(80).fill(0);

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

        anime
          .timeline()
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

  animateBlocks = () => {
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
    anime({
      targets: '.block',
      boxShadow: '6px 9px 5vw 4px rgb(0 0 0 / 10%)',
      delay: anime.stagger(20),
      duration: 3000,
      easing: 'easeOutExpo'
    });
  };

  htmlFromQueryList(list: QueryList<ElementRef<HTMLElement>>) {
    return list.map(ref => ref.nativeElement);
  }
}
