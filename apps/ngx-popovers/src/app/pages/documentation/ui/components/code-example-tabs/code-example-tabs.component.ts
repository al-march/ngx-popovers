import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { HighlightComponent } from '@demo/core/highlight';
import { TabsComponent } from '@demo/shared/tabs';
import { TabComponent } from '@demo/shared/tabs/tab';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { LucideAngularModule } from 'lucide-angular';

const TRANSITION = '{{duration}}ms ease-in-out';
const DURATION = { params: { duration: 200 } };

export const HeightCollapse = trigger('HeightCollapse', [
  transition(
    ':enter',
    [style({ height: 0 }), animate(TRANSITION, style({ height: '*' }))],
    DURATION,
  ),
  transition(
    ':leave',
    [style({ height: '*' }), animate(TRANSITION, style({ height: 0 }))],
    DURATION,
  ),
]);

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
  imports: [
    CommonModule,
    NgxTooltip,
    TabsComponent,
    TabComponent,
    HighlightComponent,
    LucideAngularModule
  ],
  templateUrl: './code-example-tabs.component.html',
  styleUrl: './code-example-tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [HeightCollapse]
})
export class CodeExampleTabsComponent {
  showCode = signal(false);
  activeTab = signal(0);

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
