import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import hljs from 'highlight.js/lib/core';

@Component({
  selector: 'demo-code',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code.component.html',
  styleUrl: './code.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeComponent {
  code = input<string | null | {} | undefined>(undefined);
  lang = input('');

  codeString = computed(() => String(this.code()));

  markup = computed(() => this.parse(this.codeString(), this.lang()));
  markupLines = computed(() => this.codeString().trim().split('\n').map((_, i) => i + 1));

  private parse(code = '', language = '') {
    return hljs.highlight(code, { language }).value;
  }
}
