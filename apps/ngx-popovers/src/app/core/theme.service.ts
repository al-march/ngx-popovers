import { effect, Inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2;

  theme = signal<'dark' | 'light'>('dark');

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const theme = this.doc.documentElement.dataset?.['theme'];
    if (theme) {
      if (theme === 'dark' || theme === 'light') {
        this.theme.set(theme);
      }
    }

    effect(() => {
      const theme = this.theme();
      switch (theme) {
        case 'dark':
          this.dark();
          break;
        case 'light':
          this.light();
          break;
      }
    });
  }

  toggle() {
    this.theme() === 'dark'
      ? this.theme.set('light')
      : this.theme.set('dark');
  }

  light() {
    this.renderer.setAttribute(this.doc.documentElement, 'data-theme', 'light');
  }

  dark() {
    this.renderer.setAttribute(this.doc.documentElement, 'data-theme', 'dark');
  }
}
