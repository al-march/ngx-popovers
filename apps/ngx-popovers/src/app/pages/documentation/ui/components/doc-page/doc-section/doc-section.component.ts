import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocPageComponent } from '@demo/pages/documentation/ui/components';

@Component({
  selector: 'demo-doc-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doc-section.component.html',
  styleUrl: './doc-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocSectionComponent {
  readonly page = inject(DocPageComponent, { optional: true });

  name = input.required<string>();
  id = computed(() => `${this.name()}`);

  constructor() {
    this.page?.initSection(this);
  }
}
