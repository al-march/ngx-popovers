import { Component, EventEmitter, inject, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/theme.service';
import { ActivationStart, Router } from '@angular/router';

@Component({
  selector: 'dm-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);
  paths = signal<string[]>([]);

  @Output()
  toggleSidebar = new EventEmitter();

  constructor(
    public themeService: ThemeService
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

  navigateToPath($index: number) {
    const paths = this.paths().slice(0, $index);
    return this.router.navigate(['/', ...paths])
  }
}
