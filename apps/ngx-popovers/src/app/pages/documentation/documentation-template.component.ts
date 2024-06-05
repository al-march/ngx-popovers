import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '@demo/template/footer';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '@demo/template/header';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DocNavigationComponent } from '@demo/pages/documentation/components/doc-navigation';

@Component({
  selector: 'ngx-popovers-documentation-template',
  standalone: true,
  imports: [CommonModule, FooterComponent, FormsModule, HeaderComponent, RouterLinkActive, RouterOutlet, RouterLink, DocNavigationComponent],
  templateUrl: './documentation-template.component.html',
  styleUrl: './documentation-template.component.scss'
})
export class DocumentationTemplateComponent {
  private readonly router = inject(Router);

  sidebar = signal(false);

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      tap(() => this.sidebar.set(false)),
      takeUntilDestroyed()
    ).subscribe();
  }
}
