import { NgModule } from '@angular/core';
import { PopoverComponent } from './popover/popover.component';
import { PopoverTemplate } from './directives/popover-template.directive';
import { PopoverAnchor } from './directives/popover-anchor.directive';
import { PopoverClose } from './directives/popover-close.directive';

@NgModule({
  declarations: [],
  imports: [
    PopoverComponent,
    PopoverTemplate,
    PopoverAnchor,
    PopoverClose
  ],
  exports: [
    PopoverComponent,
    PopoverTemplate,
    PopoverAnchor,
    PopoverClose
  ]
})
export class PopoverModule {
}
