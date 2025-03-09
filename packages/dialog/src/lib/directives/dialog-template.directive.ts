import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-dialog-template]',
  standalone: false
})
export class DialogTemplate {
  constructor(
    public templateRef: TemplateRef<unknown>
  ) {}
}
