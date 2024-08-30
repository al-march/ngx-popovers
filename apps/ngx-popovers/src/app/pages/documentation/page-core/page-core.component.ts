import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { ArrowIcon, ClickOutsideIcon, CoreIcon, FloatingIcon, PortalIcon } from '@demo/app-routes-icons';
import { RouterLink } from '@angular/router';
import { HighlightComponent } from '@demo/core/highlight';
import { ComponentsRoutes } from '@demo/app-routes';

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
