import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'ngx-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortalComponent implements OnInit, OnDestroy {
  @ViewChild(TemplateRef, { static: true })
  portalContent?: TemplateRef<HTMLElement>;

  private view?: EmbeddedViewRef<HTMLElement>;
  private panelRef?: HTMLElement;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.portalContent) {
      this.view = this.viewContainerRef.createEmbeddedView(this.portalContent);
      this.panelRef = this.view.rootNodes[0];
      if (this.panelRef) {
        this.renderer.appendChild(this.document.body, this.panelRef);
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
