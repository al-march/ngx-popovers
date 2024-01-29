import { NgModule } from '@angular/core';
import { NgClass } from '@angular/common';
import { PortalComponent } from '@ngx-popovers/core';
import { DialogComponent, DialogContentComponent } from './dialog';
import { DialogCloseDirective, DialogTemplate, DialogTriggerDirective } from './directives';

@NgModule({
  declarations: [
    DialogComponent,
    DialogCloseDirective,
    DialogTriggerDirective,
    DialogTemplate
  ],
  imports: [
    PortalComponent,
    NgClass,
    DialogContentComponent
  ],
  exports: [
    DialogComponent,
    DialogCloseDirective,
    DialogTriggerDirective,
    DialogTemplate
  ]
})
export class NgxDialog {
}
