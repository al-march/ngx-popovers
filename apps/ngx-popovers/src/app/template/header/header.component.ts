import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { ActivationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CoreService } from '../../core/core.service';
import { NgxTooltip } from '@ngx-popovers/tooltip';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'dm-header',
  imports: [CommonModule, NgxTooltip, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  paths = signal<string[]>([]);

  smallScreen$ = this.breakpointObserver
    .observe([Breakpoints.XSmall])
    .pipe(map(data => data.matches));

  @Output()
  toggleSidebar = new EventEmitter();

  constructor(
    public core: CoreService,
    public router: Router,
    public location: Location,
    public themeService: ThemeService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.resolvePaths();
    this.onPathsChange();
  }

  onPathsChange() {
    this.router.events
      .pipe(takeUntilDestroyed())
      .subscribe((event) => {
        if (event instanceof ActivationEnd) {
          this.resolvePaths();
        }
      });
  }

  resolvePaths() {
    const paths = this.location.path().split('/').filter(Boolean);
    this.paths.set(['/', ...paths]);
  }

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }

  toggleTheme() {
    this.themeService.toggle();
  }
}
