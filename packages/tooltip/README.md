# Tooltip

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/) for [Angular](https://angular.dev/) apps

> **Note**
> I strongly recommend not using this library until its stable version is released.

The Tooltip component shows tooltips next to the trigger element

## Usage

Add `ngxTooltip` to the html element to use this library.

```html

<button
  [ngxTooltip]="placement"
  [placement]="placement"
  [offset]="10"
  [arrow]="true"
>
  {{placement}}
</button>
```

## Settings

### Inputs

#### `@Input()` `placement` 

controls the position of the tooltip relative to the trigger ([docs](https://floating-ui.com/docs/tutorial#placements))

#### `@Input()` `flip` 

changes the placement of the floating element to keep it in view ([docs](https://floating-ui.com/docs/flip))

#### `@Input()` `shift` 

shifts the floating element to keep it in view ([docs](https://floating-ui.com/docs/shift))

#### `@Input()` `offset`

translates the floating element along the specified axes ([docs](https://floating-ui.com/docs/offset))

#### `@Input()` `debounce` 

time delay before the tooltip is displayed


#### `@Input()` `arrow`

Adds arrow to tooltip

#### `@Input()` `arrowPadding`

If your tooltip element has border-radius, this will prevent it from overflowing the corners. ([more](https://floating-ui.com/docs/arrow#padding))

#### `@Input()` `autoUpdate`

updates floating element automatically. Default `false`

#### `@Input()` `bindTo`

renders floating element as last child of bindTo. Default is body.


### Outputs

#### `@Output()` `showEnd`

Emits when tooltip show ends

#### `@Output()` `hideEnd`

Emits when tooltip hide ends

## Configuration

There is a configuration token `NGX_TOOLTIP_CONFIG`. 
Please, use the `NgxTooltipConfig` class to change the  default tooltip properties.

```typescript
export const TooltipConfigProvider: Provider = {
  provide: NGX_TOOLTIP_CONFIG,
  useValue: new NgxTooltipConfig({
    debounce: 50,
    placement: 'top-end'
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

## Sources
Another packages from this library:
* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [portal](https://www.npmjs.com/package/@ngx-popovers/portal)
* [floating](https://www.npmjs.com/package/@ngx-popovers/floating)
* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
