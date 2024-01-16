import { ChangeDetectionStrategy, Component, computed, Input, OnChanges, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    const highlightedCode = hljs.highlight(
      this.code,
      { language: this.lang }
    ).value;

    this.markup.set(highlightedCode);
  }

  copy() {
    const success = this.clipboard.copy(this.code);
    if (success) {
      this.setCopyStatus(CopyStatus.SUCCESS);
    } else {
      this.setCopyStatus(CopyStatus.ERROR);
    }
  }

  setCopyStatus(status: CopyStatus) {
    this.copying.set(status);

    setTimeout(() => {
      this.copying.set(CopyStatus.WAIT);
    }, 1500);
  }
}
