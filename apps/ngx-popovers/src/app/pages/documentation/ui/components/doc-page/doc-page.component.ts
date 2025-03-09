import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocSectionComponent } from '@demo/pages/documentation/ui/components';
import { Router } from '@angular/router';

@Component({
  selector: 'demo-doc-page',
  imports: [CommonModule],
  templateUrl: './doc-page.component.html',
  styleUrl: './doc-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocPageComponent {
  sections = signal<DocSectionComponent[]>([]);
  hasSections = computed(() => this.sections().length > 0);

  location = inject(Router).url.split('#')[0];

  initSection(section: DocSectionComponent) {
    this.sections.update(sections => [...sections, section]);
  }
}
