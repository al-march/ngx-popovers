# floating

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/) 


> **Note**
> I strongly recommend not using this library until its stable version is released.

## Usage

See more information about the properties in the official documentation [floating-ui](https://floating-ui.com/docs/middleware)

```html
<div #trigger>
    <p>Trigger content</p>
</div>

<ngx-floating
  [trigger]="trigger"
  [placement]="'bottom'"
  [offset]="10"
  [flip]="{mainAxis: false}"
  [shift]="{mainAxis: true}"
>
  <div class="floating">
    <p>Floating content</p>
  </div>
</ngx-floating>
```

### Inputs

#### `@Input()` `placement`

controls the position of the tooltip relative to the trigger ([docs](https://floating-ui.com/docs/tutorial#placements))

#### `@Input()` `flip`

changes the placement of the floating element to keep it in view ([docs](https://floating-ui.com/docs/flip))

#### `@Input()` `shift`

shifts the floating element to keep it in view ([docs](https://floating-ui.com/docs/shift))

#### `@Input()` `offset`

translates the floating element along the specified axes ([docs](https://floating-ui.com/docs/offset))

#### `@Input()` `arrow`

Adds arrow to tooltip according floating state

#### `@Input()` `arrowPadding`

If your floating element has border-radius, this will prevent it from overflowing the corners. ([more](https://floating-ui.com/docs/arrow#padding))


## Configuration

There is a configuration token `NGX_TOOLTIP_CONFIG`.
Please, use the `NgxTooltipConfig` class to change the  default tooltip properties.

```typescript
export const FloatingConfigProvider: Provider = {
  provide: NGX_FLOATING_CONFIG,
  useValue: new NgxFloatingConfig({
    placement: 'top-end',
    arrow: true
  })
};
```

## Arrow custom component

You can provide your own component for arrow visualization

A custom arrow component:

```typescript
@Component({
  standalone: true,
  template: `
    <div
      style="
        width: 5px;
        height: 5px;
        transform: rotate(45deg);
        background: indianred;
      "
    ></div>
  `
})
export class CustomArrow extends FloatingArrowBase {
}

export const ArrowProvider: Provider = {
  provide: NGX_FLOATING_ARROW_COMPONENT,
  useValue: CustomArrow
};
```

Any module:

```typescript
@Component({
  standalone: true,
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ArrowProvider]
})
```
