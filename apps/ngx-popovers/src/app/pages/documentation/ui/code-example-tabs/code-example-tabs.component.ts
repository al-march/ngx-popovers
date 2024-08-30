import { Component, computed, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '@demo/shared/tabs';
import { TabComponent } from '@demo/shared/tabs/tab';
import { HighlightComponent } from '@demo/core/highlight';

export enum SourceCode {
  TS,
  HTML,
  SCSS,
}

enum TabType {
  EXAMPLE,
  HTML,
  TS,
  SCSS
}

const tabTypeToLabel: Record<TabType, string> = {
  [TabType.EXAMPLE]: 'Example',
  [TabType.HTML]: 'HTML',
  [TabType.TS]: 'Typescript',
  [TabType.SCSS]: 'scss'
};

@Component({
  selector: 'demo-code-example-tabs',
  standalone: true,
  imports: [CommonModule, TabsComponent, TabComponent, HighlightComponent],
  templateUrl: './code-example-tabs.component.html',
  styleUrl: './code-example-tabs.component.scss'
})
export class CodeExampleTabsComponent {
  activeTab = signal(0);

  html = input<string | null | {}>('');
  ts = input<string | null | {}>('');
  scss = input<string | null | {}>('');

  tabs = computed(() => {
    const output: TabType[] = [TabType.EXAMPLE];

    if (this.html()) output.push(TabType.HTML);
    if (this.ts()) output.push(TabType.TS);
    if (this.scss()) output.push(TabType.SCSS);
    return output;
  });

  tabType = TabType;
  tabTypeToLabel = tabTypeToLabel;
}
