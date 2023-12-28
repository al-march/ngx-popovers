import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'ngx-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild(TemplateRef, { static: true })
  portalContent?: TemplateRef<HTMLElement>;

  @Input()
  bindTo?: HTMLElement | string;

  private view?: EmbeddedViewRef<HTMLElement>;
  private panelRef?: HTMLElement;

  get parent() {
    if (this.bindTo instanceof HTMLElement) {
      return this.bindTo;
    }
    if (typeof this.bindTo === 'string') {
      return this.parentBySelector(this.bindTo) ?? this.document.body;
    }
    return this.document.body;
  }

  parentBySelector(selector: string) {
    const element = this.document.querySelector(selector);
    if (!element) {
      console.error(`cannot find HTMLElement with query selector: ${selector}`);
    }
    return element;
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.bind();
  }

  ngOnChanges() {
    this.bind();
  }

  bind() {
    if (this.portalContent) {
      this.view = this.viewContainerRef.createEmbeddedView(this.portalContent);
      this.panelRef = this.view.rootNodes[0];
      if (this.panelRef) {
        this.renderer.appendChild(this.parent, this.panelRef);
      } else {
        console.error('cannot render component into body');
      }
    }
  }

  ngOnDestroy() {
    this.panelRef?.remove();
    this.view?.destroy();
  }
}
