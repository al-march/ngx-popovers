import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgxTooltip } from '@ngx-popovers/tooltip';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, NgxTooltip],
  selector: 'ngx-popovers-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
