import { ChangeDetectionStrategy, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '@demo/shared/tabs';
import { TabComponent } from '@demo/shared/tabs/tab';
import { HighlightComponent } from '@demo/core/highlight';

enum TabType {
  HTML,
  TS,
  SCSS
}

const tabTypeToLabel: Record<TabType, string> = {
  [TabType.HTML]: 'HTML',
  [TabType.TS]: 'Typescript',
  [TabType.SCSS]: 'SCSS'
};

@Component({
  selector: 'demo-code-example-tabs',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabComponent, HighlightComponent],
  templateUrl: './code-example-tabs.component.html',
  styleUrl: './code-example-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CodeExampleTabsComponent {
  activeTab = signal(-1);

  html = input<string | null | {}>('');
  ts = input<string | null | {}>('');
  scss = input<string | null | {}>('');

  tabs = computed(() => {
    const output: TabType[] = [];

    if (this.html()) output.push(TabType.HTML);
    if (this.ts()) output.push(TabType.TS);
    if (this.scss()) output.push(TabType.SCSS);
    return output;
  });

  tabType = TabType;
  tabTypeToLabel = tabTypeToLabel;

  highlight = viewChild<ElementRef<HTMLElement>>('highlight');
  codeHeight = computed(() => {
    const content = this.highlight();
    if (content) {
      return content.nativeElement.scrollHeight;
    }
    return 0;
  });
}
