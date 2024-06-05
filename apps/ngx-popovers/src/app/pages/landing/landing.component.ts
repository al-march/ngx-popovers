import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  inject,
  model,
  OnDestroy,
  PLATFORM_ID,
  viewChild
} from '@angular/core';
import { CommonModule, isPlatformServer, NgOptimizedImage } from '@angular/common';
import anime from 'animejs';
import { FormsModule } from '@angular/forms';
import { CoreService } from '@demo/core/core.service';
import { RouterLink } from '@angular/router';
import { LandingCloudsComponent } from '@demo/pages/landing/landing-clouds';
import { PopoverAnchor, PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';
import { DocNavigationComponent } from '@demo/pages/documentation/components/doc-navigation';
import { flip, offset } from '@floating-ui/dom';

@Component({
  selector: 'ngx-popovers-landing',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    LandingCloudsComponent,
    PopoverComponent,
    PopoverTemplate,
    PopoverAnchor,
    DocNavigationComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  platformId = inject(PLATFORM_ID);
  isServer = () => isPlatformServer(this.platformId);

  title = 'ngx-popovers';
  description = 'Angular Floating components';

  popover = model(false);
  popoverContent = viewChild<ElementRef<HTMLElement>>('popoverContent');

  middleware = [
    offset(5),
    flip()
  ];

  constructor(
    public core: CoreService
  ) {
    effect(() => {
      const isOpen = this.popover();
      const target = this.popoverContent()?.nativeElement;

      if (isOpen && target) {

        anime.timeline()
          .add({
            targets: target,
            translateY: '100%',
            duration: 0,
          })
          .add({
            targets: target,
            translateY: '0',
            easing: 'easeOutElastic(1, .6)',
            duration: 400
          });
      }
      console.log('open', isOpen);
    });
  }

  ngAfterViewInit() {
    if (!this.isServer()) {
      anime.timeline()
        .add({
          targets: '.landing-clouds',
          opacity: [0, 1],
          easing: 'linear',
          duration: 400
        })
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
}
