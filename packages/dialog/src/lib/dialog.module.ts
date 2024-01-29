import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog';
import { DialogCloseDirective, DialogTriggerDirective } from './directives';
import { PortalComponent } from '@ngx-popovers/core';
import { NgClass } from '@angular/common';

@NgModule({
  declarations: [
    DialogComponent,
    DialogCloseDirective,
    DialogTriggerDirective
  ],
  imports: [
    PortalComponent,
    NgClass
  ],
  exports: [
    DialogComponent,
    DialogCloseDirective,
    DialogTriggerDirective
  ]
})
export class NgxDialog {
}
