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

```html angular2html

<button
  ngxTooltip="Tooltip message"
  placement="top-end"
>
  Hover me!
</button>
```

### Arrow

You can show the tooltip with an arrow:

```html angular2html

<button
  ngxTooltip="Tooltip message"
  placement="top-end"
  arrow
  arrowPadding="8"
>
  Hover me!
</button>
```

### API

Input parameters

| Input          | Description                                                                                   | Type                    | Default             |
|----------------|-----------------------------------------------------------------------------------------------|-------------------------|---------------------|
| `placement`    | the component position according anchor                                                       | `Placement`             | `'bottom'`          |
| `template`     | the custom template of a tooltip                                                              | `TemplateRef<any>`      | `undefined`         |
| `middleware`   | list of floating-ui middlewares without `arrow`                                               | `MiddlewareList`        | `offset(4), flip()` |
| `debounce`     | time delay before the component is displayed                                                  | `number`                | `100`               |
| `arrow`        | adds arrow to tooltip                                                                         | `boolean`               | `false`             |
| `arrowPadding` | if your tooltip element has border-radius, this will prevent it from overflowing the corners. | `number`                | `2`                 |
| `bindTo`       | render the component into element                                                             | `string \| HTMLElement` | `'.body'`           |
| `autoUpdate`   | auto update the position                                                                      | `boolean`               | `false`             |
| `ngxValue`     | open/close tooltip                                                                            | `boolean`               | `false`             |

Output parameters

| Output            | Description                                                           | Type                            |
|-------------------|-----------------------------------------------------------------------|---------------------------------|
| `ngxValueChange`  | the `ngxValue` changes emitter                                        | `EventEmitter<boolean>`         |
| `showEnd`         | emits when the component shows                                        | `EventEmitter`                  |
| `hideEnd`         | emits when the component hides                                        | `EventEmitter`                  |
| `computePosition` | emits every time when the floating component calls `computePosition`. | `EventEmitter<ComputePosition>` |

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
* [dialog](https://www.npmjs.com/package/@ngx-popovers/dialog)
