import { ChangeDetectionStrategy, Component, contentChildren, model } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabComponent } from '@demo/shared/tabs/tab';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { shareReplay } from 'rxjs';

@Component({
  selector: 'demo-tabs',
  standalone: true,
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

  active = model<T>();

  constructor() {
    this.tabsChange$.subscribe((tabs) => {
      tabs.forEach((tab, i) => tab.setIndex(i));
    });
  }

  selectTab(index: T) {
    console.log('selected tab', index);
    this.active.set(index);
  }
}
