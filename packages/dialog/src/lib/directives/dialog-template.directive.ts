import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[ngx-dialog-template]',
})
export class DialogTemplate {
  constructor(
    public templateRef: TemplateRef<unknown>
  ) {}
}
