import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  HostListener,
  inject,
  input,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from '@demo/shared/tabs';

@Component({
  selector: 'button[demoTab]',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'tab',
    'class': 'tab',
    '[class.tab-active]': 'isActive()'
  }
})
export class TabComponent<T = any> {
  tabs = inject(TabsComponent, {
    skipSelf: true
  });

  value = input<T | number>(-1);

  private index = signal(-1);
  isActive = computed(() => this.index() === this.tabs.active());

  setIndex(index: number) {
    this.index.set(index);
  }

  constructor() {
    effect(() => {
      console.log('value!', this.value());
    });
  }

  @HostListener('click')
  onClick() {

    this.tabs.selectTab(this.value() || this.index());
  }
}
