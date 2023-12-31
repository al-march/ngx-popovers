# core

This library was generated with [Nx](https://nx.dev) and [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) apps.

> **Note**
>
> I strongly recommend not using this library until its stable version is released.

[Demo](https://ngx-popovers.vercel.app)

## Usage

### FloatingService

Before using you should add this service to providers list

```typescript
import { FloatingService } from '@ngx-popovers/core';

@Component({
  standalone: true,
  providers: [FloatingService],
  template: '',
  styles: ''
})
export class AppComponent {
}
```

#### (method) computePosition

The `computePosition` method is a proxy for `computePosition`
from [floating-ui](https://floating-ui.com/docs/computePosition)

#### (method) autoUpdate

The `autoUpdate` method is a proxy for `autoUpdate` from [floating-ui](https://floating-ui.com/docs/computePosition)

```typescript
floatingService = inject(FloatingService);

this.floatingService.computePosition(trigger, floating);
```

You also can import all types and methods of floating-ui from this package

```typescript
import { 
  Derivable, 
  FlipOptions, 
  OffsetOptions, 
  Placement, 
  ShiftOptions 
} from '@ngx-popovers/core';
```

# portal

This library was generated with [Nx](https://nx.dev) for [Angular](https://angular.dev/) apps.

### Portal

The `<ngx-portal/>` component displays the content on the body.

```html
<ngx-portal>
    <p>It will be displayed as the last child of the body</p>
</ngx-portal>
```

This component is required to display tooltips correctly without overlapping with other elements on the page.

# floating

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) apps


> **Note**
> I strongly recommend not using this library until its stable version is released.

The Floating component implements the floating-ui library for Angular

## Usage

See more information about the properties in the official
documentation [floating-ui](https://floating-ui.com/docs/middleware)

```html

<div #trigger>
    <p>Trigger content</p>
</div>

<ngx-floating
  [trigger]="trigger"
  [placement]="'bottom'"
  [middleware]="middleware"
>
  <div class="floating">
    <p>Floating content</p>
  </div>
</ngx-floating>
```

### Inputs

#### `@Input()` `placement`

controls the position of the floating relative to the trigger ([docs](https://floating-ui.com/docs/tutorial#placements))

#### `@Input()` `middleware`
list of `middleware` from floating-ui

#### `@Input()` `arrow`
Adds arrow to floating

#### `@Input()` `arrowPadding`
If your floating element has border-radius, this will prevent it from overflowing the
corners. ([more](https://floating-ui.com/docs/arrow#padding))

#### `@Input()` `autoUpdate`
updates floating element automatically. Default `true`

#### `@Input()` `bindTo`
renders floating element as last child of bindTo. Default is body.

## Configuration

There is a configuration token `NGX_FLOATING_CONFIG`.
Please, use the `NgxFloatingConfig` class to change the default floating properties.

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

## Sources

This package is a major dependency for other packages:

* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
