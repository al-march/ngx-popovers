import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
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
export class HighlightComponent {
  code = input<string | null | {} | undefined>(undefined);
  codeString = computed(() => String(this.code()));
  lang = input('');

  clean = input(false, { transform: booleanAttribute });

  markup = computed(() => {
    return hljs.highlight(
      this.codeString(),
      { language: this.lang() }
    ).value;
  });
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

  copy() {
    const success = this.clipboard.copy(this.codeString());
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
