import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../components/title/title.component';
import { ArrowIcon, ClickOutsideIcon, CoreIcon, FloatingIcon, PortalIcon } from '../../routes-icons';
import { RouterLink } from '@angular/router';
import { HighlightComponent } from '../../core/highlight/highlight.component';
import { ComponentsRoutes } from '../../app.routes';

@Component({
  selector: 'ngx-popovers-page-core',
  standalone: true,
  imports: [CommonModule, TitleComponent, CoreIcon, RouterLink, HighlightComponent, PortalIcon, FloatingIcon, ClickOutsideIcon, ArrowIcon],
  templateUrl: './page-core.component.html',
  styleUrl: './page-core.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'ngSkipHydration': 'true' }
})
export class PageCoreComponent {
  subcomponents = this.getComponents();

  getComponents() {
    const core = ComponentsRoutes.find(route => route.path === 'core');
    if (core) {
      return core.children?.filter(item => !!item.path) ?? [];
    }
    return [];
  }
}
