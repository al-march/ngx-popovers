import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { DocSectionComponent } from '@demo/pages/documentation/ui/components';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'demo-doc-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './doc-page.component.html',
  styleUrl: './doc-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocPageComponent {
  sections = signal<DocSectionComponent[]>([]);
  hasSections = computed(() => this.sections().length > 0);

  location = inject(Router).url.split('#')[0]

  initSection(section: DocSectionComponent) {
    this.sections.update(sections => [...sections, section]);
  }
}
