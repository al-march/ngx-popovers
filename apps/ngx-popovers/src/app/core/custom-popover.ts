import { Provider } from '@angular/core';
import { NGX_POPOVER_CONFIG, NgxPopoverConfig } from '@ngx-popovers/popover';
import { flip, offset } from '@ngx-popovers/core';

export const PopoverProvider: Provider = {
  provide: NGX_POPOVER_CONFIG,
  useValue: new NgxPopoverConfig({
    middleware: [
      offset(12),
      flip()
    ]
  })
}
