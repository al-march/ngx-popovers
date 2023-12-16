import {
  ApplicationRef,
  ComponentRef,
  createComponent,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Inject,
  Input,
} from '@angular/core';
import { TooltipComponent } from './tooltip.component';
import { DOCUMENT } from '@angular/common';
import { computePosition, flip, offset } from '@floating-ui/dom';

const isEmbeddedViewRef = (obj: unknown): obj is EmbeddedViewRef<any> => {
  if (typeof obj === 'object' && obj !== null) {
    return 'rootNodes' in obj;
  }
  return false;
};

@Directive({
  selector: '[ngxTooltip]',
  standalone: true,
})
export class NgxTooltip {
  @Input('ngxTooltip')
  tooltipText = '';

  tooltipRef?: ComponentRef<TooltipComponent>;

  constructor(
    private el: ElementRef,
    private appRef: ApplicationRef,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  @HostListener('mousemove')
  onMousemove() {
    if (this.tooltipRef) {
      return;
    }
    this.create();
    this.setCoords();
  }

  @HostListener('mouseleave')
  onMouseleave() {
    if (!this.tooltipRef) {
      return;
    }
    this.destroy();
  }

  create() {
    const body = this.doc.body;
    this.tooltipRef = createComponent(TooltipComponent, {
      environmentInjector: this.appRef.injector,
    });

    this.tooltipRef.setInput('text', this.tooltipText);
    this.tooltipRef.hostView.detectChanges();
    this.appRef.attachView(this.tooltipRef.hostView);

    const viewRef = this.tooltipRef.hostView;
    if (isEmbeddedViewRef(viewRef)) {
      const [node] = viewRef.rootNodes;
      body.append(node);
    } else {
      console.error('cannot append component [tooltip] into body');
    }
  }

  destroy() {
    if (!this.tooltipRef) {
      return;
    }
    this.tooltipRef.hostView.detach();
    this.tooltipRef.destroy();
    this.tooltipRef = undefined;
  }

  async setCoords() {
    if (this.tooltipRef) {
      const { x, y } = await this.getCoords();
      this.tooltipRef.setInput('left', x);
      this.tooltipRef.setInput('top', y);
    }
  }

  async getCoords() {
    const trigger = this.el.nativeElement;
    const tooltip = this.tooltipRef?.location.nativeElement;

    if (trigger && tooltip) {
      const { x, y } = await computePosition(trigger, tooltip, {
        middleware: [flip(), offset(6)],
      });
      return { x, y };
    } else {
      return { x: 0, y: 0 };
    }
  }
}
