import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ngx-example',
  imports: [CommonModule],
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'border-2 border-dashed border-primary rounded m-auto flex flex-col relative overflow-hidden'
  }
})
export class ExampleComponent {
}
