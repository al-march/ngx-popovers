import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { ActivationStart, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'dm-header',
  standalone: true,
  imports: [CommonModule, NgxTooltip, RouterLink, RouterLinkActive, FaIconComponent, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  paths = signal<string[]>([]);

  smallScreen$ = this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe(map(data => data.matches));

  @Output()
  toggleSidebar = new EventEmitter();

  readonly faMoon = faMoon;
  readonly faSun = faSun;

  constructor(
    public core: CoreService,
    public router: Router,
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
