import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalComponent } from "@ngx-popovers/core";

@Component({
  standalone: true,
  imports: [CommonModule, PortalComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {
}
