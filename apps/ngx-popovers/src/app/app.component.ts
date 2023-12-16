import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { computePosition } from '@floating-ui/dom';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'ngx-popovers-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('button')
  button!: ElementRef<HTMLButtonElement>;

  @ViewChild('tooltip')
  tooltip!: ElementRef<HTMLElement>;

  isShowing = false;

  showPopup() {
    const button = this.button.nativeElement;
    const tooltip = this.tooltip.nativeElement;
    this.isShowing = true;

    computePosition(button, tooltip).then((result) => {
      console.log(result);
      Object.assign(tooltip.style, {
        left: `${result.x}px`,
        top: `${result.y}px`,
      });
    });
  }
}
