import { NgModule } from '@angular/core';
import { DialogComponent } from './dialog';
import { DialogCloseDirective, DialogTriggerDirective } from './directives';
import { PortalComponent } from '@ngx-popovers/core';

@NgModule({
  declarations: [
    DialogComponent,
    DialogCloseDirective,
    DialogTriggerDirective
  ],
  imports: [
    PortalComponent
  ],
  exports: [
    DialogComponent,
    DialogCloseDirective,
    DialogTriggerDirective
  ]
})
export class NgxDialog {
}
