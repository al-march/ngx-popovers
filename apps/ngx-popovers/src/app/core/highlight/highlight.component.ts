import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
  OnChanges,
  PLATFORM_ID,
  signal
} from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import hljs from 'highlight.js/lib/core';

enum CopyStatus {
  WAIT,
  SUCCESS,
  ERROR
}

type CopyButton = {
  text: string;
  status: CopyStatus;
}

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
  copying = signal<CopyStatus>(CopyStatus.WAIT);

  copyStatus = computed<CopyButton>(() => {
    const status = this.copying();
    switch (status) {
      case CopyStatus.SUCCESS:
        return { text: 'Copied', status };
      case CopyStatus.ERROR:
        return { text: 'Error', status };
      default:
        return { text: 'Copy', status };
    }
  });

  statuses = CopyStatus;

  constructor(
    private clipboard: Clipboard
  ) {}

  ngOnChanges() {
    if (!this.isServer) {
      const highlightedCode = hljs.highlight(
        this.code,
        { language: this.lang }
      ).value;

      this.markup.set(highlightedCode);
    }
  }

  copy() {
    const status = this.clipboard.copy(this.code);
    this.setCopyStatus(status);
  }

  setCopyStatus(success: boolean) {
    if (success) {
      this.copying.set(CopyStatus.SUCCESS);
      setTimeout(() => {
        this.copying.set(CopyStatus.WAIT);
      }, 1500);
    } else {
      this.copying.set(CopyStatus.ERROR);
      setTimeout(() => {
        this.copying.set(CopyStatus.WAIT);
      }, 1500);
    }
  }
}
