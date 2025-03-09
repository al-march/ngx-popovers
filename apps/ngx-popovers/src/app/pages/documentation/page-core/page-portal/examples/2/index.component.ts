import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from '@ngx-popovers/core';

@Component({
  selector: 'demo-index',
  imports: [CommonModule, PortalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IndexComponent {
  sections = [
    'sect1',
    'sect2',
    'sect3',
    'sect4'
  ];

  section = signal(this.sections[0]);
  selector = computed(() => this.section() ? `#${this.section()} .section-portal` : '');
}
