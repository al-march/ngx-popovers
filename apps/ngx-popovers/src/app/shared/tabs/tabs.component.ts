import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, contentChildren, model } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { TabComponent } from '@demo/shared/tabs/tab';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'demo-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent<T> {
  tabs = contentChildren(TabComponent);
  tabs$ = toObservable(this.tabs);

  tabsChange$ = this.tabs$.pipe(
    shareReplay(),
    takeUntilDestroyed()
  );

  active = model<T | null>();

  constructor() {
    this.tabsChange$.subscribe((tabs) => {
      tabs.forEach((tab, i) => tab.setIndex(i));
    });
  }

  selectTab(index: T) {
    this.active.set(index);
  }
}
