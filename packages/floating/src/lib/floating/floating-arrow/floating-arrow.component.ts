import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloatingComponent, NGX_FLOATING_ARROW_COMPONENT } from '@ngx-popovers/floating';

@Component({
  selector: 'ngx-floating-arrow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-arrow.component.html',
  styleUrl: './floating-arrow.component.scss'
})
export class FloatingArrowComponent implements AfterViewInit {
  arrowComponent = inject(NGX_FLOATING_ARROW_COMPONENT);
  floating = inject(FloatingComponent);

  @ViewChild('arrow')
  arrowRef?: ElementRef<HTMLElement>;

  get arrowStyles() {
    return this.floating.arrowStyles;
  }

  ngAfterViewInit() {
    this.floating.setArrow(this.arrowRef!.nativeElement);
  }
}
