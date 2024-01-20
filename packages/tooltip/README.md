# Tooltip

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) apps

> **Note**
> 
> I strongly recommend not using this library until its stable version is released.

The Tooltip component shows tooltips next to the trigger element

> See [Demo](https://ngx-popovers.vercel.app/tooltip)

## Usage

Add `ngxTooltip` to the html element to use this library.

```html

<button
  [ngxTooltip]="placement"
  [placement]="placement"
  arrow
>
  {{placement}}
</button>
```

## Settings

### Inputs

#### `@Input()` `ngxValue`
open/close tooltip 

#### `@Input()` `placement`
controls the position of the tooltip relative to the trigger ([docs](https://floating-ui.com/docs/tutorial#placements))

#### `@Input()` `middleware`
list of `middleware` from floating-ui

#### `@Input()` `debounce`
time delay before the tooltip is displayed

#### `@Input()` `arrow`
adds arrow to tooltip

#### `@Input()` `arrowPadding`
if your tooltip element has border-radius, this will prevent it from overflowing the
corners. ([more](https://floating-ui.com/docs/arrow#padding))

#### `@Input()` `autoUpdate`
updates floating element automatically. Default `false`

#### `@Input()` `bindTo`
renders floating element as last child of bindTo. Default is body.

### Outputs

#### `@Output()` `showEnd`
Emits when tooltip show ends

#### `@Output()` `hideEnd`
Emits when tooltip hide ends

#### `@Output()` `computePosition($event: ComputePosition)`

emits every time when the floating component calls `computePosition`.

`$event` - floating-ui `computePosition` event


## Configuration

There is a configuration token `NGX_TOOLTIP_CONFIG`.
Please, use the `NgxTooltipConfig` class to change the default tooltip properties.

```typescript
import { Provider } from '@angular/core';
import { NGX_TOOLTIP_CONFIG, NgxTooltipConfig } from '@ngx-popovers/tooltip';
/**
 * You have to install @ngx-popovers/core to import middleware.
 * Version of @ngx-popovers/core is the same as @ngx-popovers/tooltip
 */
import { flip, offset, shift } from '@ngx-popovers/core';

export const TooltipConfigProvider: Provider = {
  provide: NGX_TOOLTIP_CONFIG,
  useValue: new NgxTooltipConfig({
    debounce: 50,
    placement: 'top-end',
    /* Middleware list from floating-ui */
    middleware: [
      flip(),
      shift(),
      offset(8)
    ]
  })
};
```

## Custom view

You can use your own component to visualize tooltips.

There is an injection token `NGX_TOOLTIP_COMPONENT` that replaces the default component

example:

```typescript
@Component({
  standalone: true,
  styles: `
    .my-tooltip {
      padding: 5px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      background: #fff;
      border: 1px solid #dedede;
    }
  `,
  template: `
    <div class="my-tooltip">
      <span>I Custom Tooltip!</span>
      <span>text: {{ text }}</span>
    </div>
  `
})
export class CustomTooltip extends TooltipBase {
}

export const TooltipProvider: Provider = {
  provide: NGX_TOOLTIP_COMPONENT,
  useValue: CustomTooltip
};
```

## Arrow component

See the [core](https://www.npmjs.com/package/@ngx-popovers/core) package

## Sources

Another packages from this library:

* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
