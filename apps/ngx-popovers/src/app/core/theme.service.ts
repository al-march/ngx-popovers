import { effect, Inject, Injectable, Renderer2, RendererFactory2, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

const APP_THEME = 'APP_THEME';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  renderer: Renderer2;

  theme = signal<'dark' | 'light'>('dark');

  get localStorage() {
    return this.doc.defaultView?.localStorage;
  }

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    rendererFactory: RendererFactory2
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    const theme = this.getTheme();
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
    this.saveTheme();
  }

  dark() {
    this.renderer.setAttribute(this.doc.documentElement, 'data-theme', 'dark');
    this.saveTheme();
  }

  saveTheme() {
    this.localStorage?.setItem(APP_THEME, this.theme());
  }

  getTheme(): 'dark' | 'light' {
    try {
      const theme = this.localStorage?.getItem(APP_THEME);
      if (theme && this.isValidTheme(theme)) {
        return theme;
      } else {
        return this.getSystemTheme();
      }
    } catch {
      return this.getSystemTheme();
    }
  }

  getSystemTheme() {
    if (!this.doc.defaultView?.matchMedia) {
      return 'dark';
    }

    const isLight = this.doc.defaultView
      ?.matchMedia?.('(prefers-color-scheme: light)')
      .matches;

    if (isLight) {
      return 'dark';
    } else {
      return 'light';
    }
  }

  isValidTheme(str: unknown): str is 'dark' | 'light' {
    return str === 'dark' || str === 'light';
  }
}
