import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Clipboard } from '@angular/cdk/clipboard';
import { PortalComponent } from '@ngx-popovers/core';
import { CodeComponent } from './code/code.component';

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
  imports: [CommonModule, PortalComponent, CodeComponent],
  templateUrl: './highlight.component.html',
  styleUrl: './highlight.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { ngSkipHydration: 'true' }
})
export class HighlightComponent {
  code = input<string | null | {} | undefined>(undefined);
  lang = input('');
  clean = input(false, { transform: booleanAttribute });

  codeString = computed(() => String(this.code()));
  copying = signal(CopyStatus.WAIT);
  copyStatus = computed(() => this.computeStatus(this.copying()));

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

  private setCopyStatus(status: CopyStatus) {
    this.copying.set(status);

    setTimeout(() => {
      this.copying.set(CopyStatus.WAIT);
    }, 1500);
  }

  private computeStatus(status: CopyStatus) {
    switch (status) {
      case CopyStatus.SUCCESS:
        return { text: 'Copied', status };
      case CopyStatus.ERROR:
        return { text: 'Error', status };
      default:
        return { text: 'Copy', status };
    }
  }
}
