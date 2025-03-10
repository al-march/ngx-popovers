import { Directive, HostListener, inject } from '@angular/core';
import { DialogComponent } from '../dialog';

@Directive({
  selector: '[ngx-dialog-trigger]',
  standalone: false
})
export class DialogTriggerDirective {
  dialog = inject(DialogComponent);

  @HostListener('click')
  onClose() {
    this.dialog.open();
  }
}
