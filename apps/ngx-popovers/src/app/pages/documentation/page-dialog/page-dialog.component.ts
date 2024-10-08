import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { ExampleComponent } from '@demo/template/example';
import { HighlightComponent } from '@demo/core/highlight';
import { NgxDialog } from '@ngx-popovers/dialog';

const defaultExample = `
<ngx-dialog>
  <button 
    class="btn btn-accent" 
    ngx-dialog-trigger
  >
    Toggle
  </button>

  <ng-template ngx-dialog-template>
    <div class="modal-box">
      <p class="text-2xl">Hello! I am Dialog</p>
      <div class="divider"></div>
      <p>
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit.
      </p>

      <div class="py-4"></div>

      <button
        class="btn btn-sm btn-error ml-auto"
        ngx-dialog-close
      >
        Close
      </button>
    </div>
  </ng-template>
</ngx-dialog>
`.trim();

@Component({
  selector: 'ngx-popovers-page-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ExampleComponent,
    HighlightComponent,
    NgxDialog
  ],
  templateUrl: './page-dialog.component.html',
  styleUrl: './page-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageDialogComponent {
  defaultExample = defaultExample;

  open = false;
}
