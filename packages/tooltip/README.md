# Tooltip

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/)

> **Note**
> I strongly recommend not using this library until its stable version is released.

## Usage

Add `ngxTooltip` to the html element to use this library.

In the controller:

```typescript
import { NgxTooltip } from '@ngx-popovers/tooltip';
```

In the template:

```html

<div ngxTooltip="tooltip text">
    <p>Trigger content</p>
</div>
```

## Settings

### Inputs

#### **placement** `@Input`

controls the position of the tooltip relative to the trigger ([docs](https://floating-ui.com/docs/tutorial#placements))

#### **flip** `@Input`

changes the placement of the floating element to keep it in view ([docs](https://floating-ui.com/docs/flip))

#### **shift** `@Input`

shifts the floating element to keep it in view ([docs](https://floating-ui.com/docs/shift))

#### **offset**`@Input`

translates the floating element along the specified axes ([docs](https://floating-ui.com/docs/offset))

#### **debounce** `@Input`

time delay before the tooltip is displayed

#### **showEnd** `@Output`

Emits when tooltip show animation ends

#### **hideEnd** `@Output`

Emits when tooltip hide animation ends

### Custom view

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
