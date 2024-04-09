# Tooltip

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/) for [Angular](https://angular.dev/) apps.

The Tooltip component displays tooltips next to the trigger element.

> Check out the [Demo](https://ngx-popovers.vercel.app/tooltip)

## Usage

To use this library, add `ngxTooltip` to the HTML element.

```html
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

Input Parameters

| Input          | Description                                                              | Type                    | Default             |
|----------------|--------------------------------------------------------------------------|-------------------------|---------------------|
| `placement`    | Position of the component according to the anchor                        | `Placement`             | `'bottom'`          |
| `template`     | Custom template for the tooltip                                          | `TemplateRef<any>`      | `undefined`         |
| `middleware`   | List of floating-ui middlewares without `arrow`                          | `MiddlewareList`        | `offset(4), flip()` |
| `debounce`     | Time delay before the component is displayed                             | `number`                | `100`               |
| `arrow`        | Adds an arrow to the tooltip                                             | `boolean`               | `false`             |
| `arrowPadding` | Prevents overflow of the tooltip element corners if it has border-radius | `number`                | `2`                 |
| `bindTo`       | Render the component into an element                                     | `string \| HTMLElement` | `'.body'`           |
| `autoUpdate`   | Automatically updates the position                                       | `boolean`               | `false`             |
| `ngxValue`     | State of the tooltip (open/close)                                        | `boolean`               | `false`             |

Output Parameters

| Output            | Description                                 | Type                            |
|-------------------|---------------------------------------------|---------------------------------|
| `ngxValueChange`  | Emitter for changes in `ngxValue`           | `EventEmitter<boolean>`         |
| `showEnd`         | Emitter for when the component is shown     | `EventEmitter`                  |
| `hideEnd`         | Emitter for when the component is hidden    | `EventEmitter`                  |
| `computePosition` | Emitter for every call of `computePosition` | `EventEmitter<ComputePosition>` |

## Configuration

Use the `NGX_TOOLTIP_CONFIG` token to change default properties with the `NgxTooltipConfig` class.

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

## Custom View

You can use your own component to visualize tooltips.

There is an injection token `NGX_TOOLTIP_COMPONENT` that replaces the default component.

Example:

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

## Arrow Component

Refer to the [core](https://www.npmjs.com/package/@ngx-popovers/core) package.

## Sources

Other npm packages from this library:

* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
* [dialog](https://www.npmjs.com/package/@ngx-popovers/dialog)
