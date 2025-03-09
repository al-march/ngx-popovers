import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EmbeddedViewRef,
  Inject,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  viewChild,
  ViewContainerRef
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { PlatformService } from '../platform.service';
import { isServer } from '../injections';
import { isHTML, isString } from '../utils/utils';

@Component({
  selector: 'ngx-portal',
  imports: [CommonModule],
  providers: [
    PlatformService
  ],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortalComponent implements OnInit, OnChanges, OnDestroy {
  isServer = isServer();

  portalContent = viewChild<TemplateRef<HTMLElement>>(TemplateRef);
  bindTo = input<HTMLElement | string | undefined>();

  parent = computed(() => {
    const bindTo = this.bindTo();
    if (isHTML(bindTo)) {
      return bindTo;
    }
    if (isString(bindTo)) {
      return this.parentBySelector(bindTo);
    }
    return this.document.body;
  });

  private view?: EmbeddedViewRef<HTMLElement>;
  private panelRef?: HTMLElement;

  parentBySelector(selector: string) {
    const element = this.document.querySelector(selector);
    if (!element) {
      console.error(`cannot find HTMLElement with query selector: ${selector}`);
    }
    return element;
  }

  constructor(
    @Inject(DOCUMENT) protected readonly document: Document,
    protected readonly viewContainerRef: ViewContainerRef,
    protected readonly renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.bind();
  }

  ngOnChanges(): void {
    this.bind();
  }

  ngOnDestroy() {
    this.panelRef?.remove();
    this.view?.destroy();
  }

  bind() {
    if (this.isServer) {
      return;
    }

    const portalContent = this.portalContent();

    if (portalContent && this.parent()) {
      this.view = this.viewContainerRef.createEmbeddedView(portalContent);
      this.panelRef = this.view.rootNodes[0];
      if (this.panelRef) {
        this.renderer.appendChild(this.parent(), this.panelRef);
      } else {
        console.error(`cannot render component into ${this.parent}`);
      }
    }
  }
}
