import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { ActivationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';

@Component({
  selector: 'dm-header',
  standalone: true,
  imports: [CommonModule, NgxTooltip, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  core = inject(CoreService);
  router = inject(Router);

  paths = signal<string[]>([]);

  smallScreen$ = this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe(map(data => data.matches));

  @Output()
  toggleSidebar = new EventEmitter();

  constructor(
    public themeService: ThemeService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.parsePaths();
  }

  parsePaths() {
    this.router.events
      .subscribe(event => {
        if (event instanceof ActivationStart) {
          const paths: string[] = [];
          event.snapshot.pathFromRoot.map(path => {
            const p = path.routeConfig?.path;
            if (p) {
              paths.push(p);
            }
          });
          this.paths.set(paths);
        }
      });
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
