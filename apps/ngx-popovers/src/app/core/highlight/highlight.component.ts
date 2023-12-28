import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import hljs from 'highlight.js/lib/core';

@Component({
  selector: 'highlight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' }
})
export class HighlightComponent implements OnChanges {
  platformId = inject(PLATFORM_ID);
  // Do not run floating-ui inside Window.
  // We need to render dynamic content only when the Window is allowed
  isServer = isPlatformServer(this.platformId);

  @Input()
  code = '';

  @Input()
  lang = '';

  markup = signal('');

  ngOnChanges() {
    if (!this.isServer) {
      const highlightedCode = hljs.highlight(
        this.code,
        { language: this.lang }
      ).value;

      this.markup.set(highlightedCode);
    }
  }
}
