import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { CommonModule, isPlatformServer, NgOptimizedImage } from '@angular/common';
import anime from 'animejs';
import { FormsModule } from '@angular/forms';
import { CoreService } from '@demo/core/core.service';
import { RouterLink } from '@angular/router';
import { LandingCloudsComponent } from '@demo/pages/landing/landing-clouds';
import { PopoverAnchor, PopoverComponent, PopoverTemplate } from '@ngx-popovers/popover';
import { DocNavigationComponent } from '@demo/pages/documentation/ui/components/doc-navigation';
import { FloatingComponent, PlatformService } from '@ngx-popovers/core';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import {
  LandingExFlipComponent,
  LandingExPlacementComponent,
  LandingExShiftComponent,
  LandingExSizeComponent
} from '@demo/pages/landing/landing-examples';

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
    DocNavigationComponent,
    FloatingComponent,
    NgxTooltip,
    LandingExPlacementComponent,
    LandingExShiftComponent,
    LandingExFlipComponent,
    LandingExSizeComponent
  ],
  providers: [PlatformService],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-theme': 'dark'
  }
})
export class LandingComponent implements AfterViewInit, OnDestroy {
  platformId = inject(PLATFORM_ID);
  isServer = () => isPlatformServer(this.platformId);

  title = 'ngx-popovers';
  description = 'Angular Floating components';

  year = signal(new Date().getFullYear());

  constructor(
    public core: CoreService
  ) {
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
