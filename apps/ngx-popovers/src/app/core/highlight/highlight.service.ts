import { Injectable } from '@angular/core';
import {
  BundledLanguage,
  BundledTheme,
  createHighlighter,
  HighlighterGeneric,
  LanguageInput,
  SpecialLanguage,
  ThemeInput
} from 'shiki';
import { StringLiteralUnion } from '@shikijs/types';

const initializeExample = `
{
  provide: APP_INITIALIZER,
  useFactory: (service: HighlightService) => {
    return () => service.init()
  },
  deps: [HighlightService],
  multi: true,
}
`;

export type Lang = LanguageInput | SpecialLanguage | StringLiteralUnion<BundledLanguage, string>;
export type Theme = ThemeInput | 'none' | StringLiteralUnion<BundledTheme, string>

export interface Init {
  langs: Lang[],
  themes: Theme[]
}

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  private _highlighter?: HighlighterGeneric<BundledLanguage, BundledTheme>;

  async init({ langs, themes }: Init) {
    this._highlighter = await createHighlighter({
      langs,
      themes
    });
  }

  toHtml(code: string, lang: Lang = '', theme: Theme = 'none') {
    return this.highlighter.codeToHtml(code, {
      lang: lang as string,
      theme: theme as string
    });
  }

  get highlighter() {
    if (this._highlighter) {
      return this._highlighter;
    } else {
      throw new Error([
        `Highlight service should be initialized`,
        `Please, initialize service in APP_INITIALIZER`,
        initializeExample
      ].join('\n'));
    }
  }
}
