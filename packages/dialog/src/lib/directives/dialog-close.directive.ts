import { Directive, HostListener, inject } from '@angular/core';
import { DialogComponent } from '../dialog';

@Directive({
  selector: '[ngx-dialog-close]',
})
export class DialogCloseDirective {
  dialog = inject(DialogComponent);

  @HostListener('click')
  onClose() {
    this.dialog.close();
  }
}
