import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../components/title/title.component';
import { HighlightComponent } from '../../../core/highlight/highlight.component';
import { ExampleComponent } from '../../../template/example/example.component';
import { ClickOutsideDirective, flip, FloatingArrowComponent, FloatingComponent, offset } from '@ngx-popovers/core';
import { PopoverComponent } from '@ngx-popovers/popover';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

class LogItem {
  name = '';
  date = new Date();

  constructor(
    public inside: boolean,
    public element: HTMLElement
  ) {
    const tag = element.tagName;
    const className = element.className;

    if (className) {
      this.name = `${tag}.${className}`;
    } else {
      this.name = `${tag}`;
    }
  }
}

const defaultUsage = `
@Component({
  selector: 'ngx-click-outside-example',
  standalone: true,
  imports: [ClickOutsideDirective],
  template: \`
    <div
      ngxClickOutside
      (inside)="onInsideClicked($event)"
      (outside)="onOutsideClicked($event)"
    ></div>
  \`,
})
export class ClickOutsideExample {
  onInsideClicked(el: EventTarget) {
    console.log('Inside click!', el);
  }

  onOutsideClicked(el: EventTarget) {
    console.log('Outside click!', el);
  }
}
`.trim();

@Component({
  selector: 'ngx-popovers-page-click-outside',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    HighlightComponent,
    ExampleComponent,
    ClickOutsideDirective,
    PopoverComponent,
    FloatingComponent,
    FloatingArrowComponent
  ],
  templateUrl: './page-click-outside.component.html',
  styleUrl: './page-click-outside.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(140, style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate(100, style({ opacity: 0 }))
      ])
    ]),
  ]
})
export class PageClickOutsideComponent {

  @ViewChild('logList')
  logListRef?: ElementRef<HTMLElement>;

  defaultUsage = defaultUsage;

  clickLogs = signal<LogItem[]>([]);
  showLogs = signal(true);

  middlewares = [
    offset(10),
    flip()
  ];

  onClickInside(target: EventTarget) {
    if (target instanceof HTMLElement) {
      this.onClick(target, true);
    }
  }

  onClickOutside(target: EventTarget) {
    if (target instanceof HTMLElement) {
      this.onClick(target, false);
    }
  }

  onClick(element: HTMLElement, inside: boolean) {
    const log = this.addLog(element, inside);
    this.clickLogs.update(logs => [...logs, log]);
    this.showLogs.set(true);

    setTimeout(() => {
      const list = this.logListRef?.nativeElement;
      if (list) {
        list.scrollTop = list.scrollHeight;
      }
    })
  }

  addLog(element: HTMLElement, inside: boolean) {
    return new LogItem(inside, element);
  }
}
