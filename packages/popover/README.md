# popover

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) apps

<img src="https://raw.githubusercontent.com/al-march/ngx-popovers/main/packages/popover/assets/preview.png" alt="md3tail theme">

Popover component displays content next to the trigger element on mouse click

> **Note**
> 
> I strongly recommend not using this library until its stable version is released.

> See [Demo](https://ngx-popovers.vercel.app/popover)

## Usage

See more information about the properties in the official
documentation [floating-ui](https://floating-ui.com/docs/middleware)

```html

<button
  #popover
  [ngxPopover]="popoverContent"
  [ngxValue]="true"
  [disabled]="false"
  [animationDisabled]="false"
  [closeOnClickedOutside]="false"
  bindTo=".body"
  arrow
>
  Popover
</button>

<ng-template #popoverContent>
  <div class="popover">
    <p>I am popover!</p>
    <button
      (click)="popover.close()"
    >
      Close
    </button>
  </div>
</ng-template>
```

### API

#### `@Input()` `placement`
controls the position of the floating relative to the trigger ([docs](https://floating-ui.com/docs/tutorial#placements))

#### `@Input()` `middleware`
list of `middleware` from floating-ui

#### `@Input()` `arrow`
adds arrow to floating

#### `@Input()` `arrowPadding`
if your floating element has border-radius, this will prevent it from overflowing the
corners. ([more](https://floating-ui.com/docs/arrow#padding))

#### `@Input()` `autoUpdate`

updates floating element automatically. Default `true`

#### `@Input()` `bindTo`

renders floating element as last child of bindTo. Default is body.

#### `@Input()` `disabled`

disables open/close on the trigger clicks

#### `@Input()` `animationDisabled`

disables show/hide animations

#### `@Input()` `ngxValue`

Show or hide state of popover

#### `@Output()` `ngxValueChange`

the ngxValue changes emitter

#### `@Output()` `show`

emits when the popover shows

#### `@Output()` `hide`

emits when the popover hides

#### `@Output()` `clickedOutside($event: Element)`

emits when user clicks outside the floating element. 
`$event` - element which was clicked

#### `@Output()` `clickedInside($event: Element)`

emits when user clicks inside the floating element. 
`$event` - element which was clicked

#### `@Output()` `animationStart`

emits when animation starts


#### `@Output()` `animationDone`

emits when animation ends

## Configuration

There is a configuration token `NGX_POPOVER_CONFIG`.
Please, use the `NgxPopoverConfig` class to change the default floating properties.

```typescript
import { Provider } from '@angular/core';
import { NGX_POPOVER_CONFIG, NgxPopoverConfig } from '@ngx-popovers/popover';
/**
 * You have to install @ngx-popovers/core to import middleware.
 * Version of @ngx-popovers/core is the same as @ngx-popovers/popover
 */
import { flip, offset, shift } from '@ngx-popovers/core';

export const PopoverConfigProvider: Provider = {
  provide: NGX_POPOVER_CONFIG,
  useValue: new NgxPopoverConfig({
    placement: 'top-end',
    arrow: true,
    closeOnClickedOutside: true,
    /* Middleware list from floating-ui */
    middleware: [
      flip(),
      shift(),
      offset(8)
    ]
  })
};
```

## Arrow component

See the [core](https://www.npmjs.com/package/@ngx-popovers/core) package

## Sources

Another packages from this library:

* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
