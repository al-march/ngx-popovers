# popover

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) apps

Popover component displays content next to the trigger element on mouse click

> **Note**
> I strongly recommend not using this library until its stable version is released.

## Usage

See more information about the properties in the official
documentation [floating-ui](https://floating-ui.com/docs/middleware)

```html

<button
  #popover
  [ngxPopover]="popoverContent"
  [offset]="10"
  [ngxValue]="true"
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

#### `@Input()` `flip`

changes the placement of the floating element to keep it in view ([docs](https://floating-ui.com/docs/flip))

#### `@Input()` `shift`

shifts the floating element to keep it in view ([docs](https://floating-ui.com/docs/shift))

#### `@Input()` `offset`

translates the floating element along the specified axes ([docs](https://floating-ui.com/docs/offset))

#### `@Input()` `arrow`

adds arrow to floating

#### `@Input()` `arrowPadding`

if your floating element has border-radius, this will prevent it from overflowing the
corners. ([more](https://floating-ui.com/docs/arrow#padding))

#### `@Input()` `autoUpdate`

updates floating element automatically. Default `true`

#### `@Input()` `bindTo`

renders floating element as last child of bindTo. Default is body.

#### `@Input()` `ngxValue`

Show or hide state of popover

#### `@Output()` `ngxValueChange`

the ngxValue changes emitter

#### `@Output()` `show`

emits when popover shows

#### `@Output()` `hide`

emits when popover hides

## Configuration

There is a configuration token `NGX_POPOVER_CONFIG`.
Please, use the `NgxPopoverConfig` class to change the default floating properties.

```typescript
export const PopoverConfigProvider: Provider = {
  provide: NGX_FLOATING_CONFIG,
  useValue: new NgxPopoverConfig({
    placement: 'top-end',
    arrow: true
  })
};
```

## Sources

Another packages from this library:

* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
