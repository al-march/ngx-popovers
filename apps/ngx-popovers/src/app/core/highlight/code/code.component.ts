import { ChangeDetectionStrategy, Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightService, Lang, Theme } from '../highlight.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'demo-code',
  imports: [CommonModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CodeComponent {
  sanitizer = inject(DomSanitizer).bypassSecurityTrustHtml;
  highlight = inject(HighlightService);

  code = input<string | null | {} | undefined>(undefined);
  lang = input<Lang>('');
  theme = input<Theme>('one-dark-pro');

  codeString = computed(() => String(this.code()).trim());
  markupLines = computed(() => this.codeString().trim().split('\n').map((_, i) => i + 1));
  html = computed(() => this.getHtml(this.codeString(), this.lang(), this.theme()));

  private getHtml(code = '', lang: Lang = '', theme: Theme = '') {
    const html = this.highlight.toHtml(code, lang, theme);
    return this.sanitizer(html.replace(
      /background-color:\s*#[0-9A-Fa-f]{3,6}/,
      'background-color: inherit'
    ));
  }
}
