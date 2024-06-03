# core

This library was generated with [Nx](https://nx.dev) and [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) applications.

> To see a demo, click on the [link](https://ngx-popovers.vercel.app) provided.

### FloatingService

Before use, ensure this service is added to the providers list.

You can import the FloatingService from '@ngx-popovers/core'.

Example usage:

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

| Method            | Description                                                                   | Type                    |
|-------------------|-------------------------------------------------------------------------------|-------------------------|
| `computePosition` | The `computePosition` method is a proxy for `computePosition`from floating-ui | `ComputePositionReturn` |
| `autoUpdate`      | The `autoUpdate` method is a proxy for `autoUpdate` from floating-ui          | `cleanup function`      |

```typescript
floatingService = inject(FloatingService);

this.floatingService.computePosition(trigger, floating);
```

You can also import all types and methods from floating-ui from this package:

```typescript
import {
  Derivable,
  FlipOptions,
  OffsetOptions,
  Placement,
  ShiftOptions
} from '@ngx-popovers/core';
```

---

# portal

>  To see a demo, click on the [link](https://ngx-popovers.vercel.app/docs/core/portal) provided.

## Usage

The `<ngx-portal/>` component displays content on the body.

You can also display portal content within an element of your choice:

```html

<div #portalWillBeInsideMe>
  <p>Portal content will be rendered after this tag</p>
  <!-- Here -->
</div>

<ngx-portal [bindTo]="portalWillBeInsideMe">
    <p>It will be displayed as the last child of the div</p>
</ngx-portal>
```

This component is essential for displaying tooltips correctly without overlapping with other elements on the page.

# ClickOutside directive

The click outside directive manages clicks inside and outside HTMLElements. This directive is used by the ngx-floating component.

> To see a demo, click on the [link](https://ngx-popovers.vercel.app/docs/core/click-outside) provided.

## Usage

```typescript
import { ClickOutsideDirective } from '@ngx-popovers/core';

@Component({
  selector: 'ngx-click-outside-example',
  standalone: true,
  imports: [ClickOutsideDirective],
  template: `
    <div
      ngxClickOutside
      (inside)="onInsideClicked($event)"
      (outside)="onOutsideClicked($event)"
    ></div>
  `
})
export class ClickOutsideExample {
  onInsideClicked(el: EventTarget) {
    console.log('Inside click!', el);
  }

  onOutsideClicked(el: EventTarget) {
    console.log('Outside click!', el);
  }
}
```

---

# floating

The Floating component implements the floating-ui library for Angular

> To see a demo, click on the [link](https://ngx-popovers.vercel.app/docs/core/floating) provided.

## Usage


For more information about the properties, refer to the official
documentation for [floating-ui](https://floating-ui.com/docs/middleware).

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

### API

Inputs

| Method       | Description                                                   | Type                      | Default             |
|--------------|---------------------------------------------------------------|---------------------------|---------------------|
| `placement`  | controls the position of the floating relative to the trigger | `Placement`               | `bottom`            |
| `middleware` | list of `middleware` from floating-ui                         | `MiddlewareList`          | `offset(4), flip()` |
| `autoUpdate` | updates floating element automatically                        | `boolean`                 | `true`              |
| `bindTo`     | urenders floating element as last child of bindTo             | `string` \| `HTMLElement` | `.body`             |

Outputs

| Method                  | Description                                                          | Type                    |
|-------------------------|----------------------------------------------------------------------|-------------------------|
| `clickedOutside`        | emits when user clicks outside the floating element                  | `Element`               |
| `clickedInside`         | emits when user clicks inside the floating element                   | `Element`               |
| `computePositionReturn` | emits every time when the floating component calls `computePosition` | `ComputePositionReturn` |


## Configuration

There is a configuration token `NGX_FLOATING_CONFIG`.
Please use the `NgxFloatingConfig` class to change the default floating properties.

```typescript
export const FloatingConfigProvider: Provider = {
  provide: NGX_FLOATING_CONFIG,
  useValue: new NgxFloatingConfig({
    placement: 'top-end',
    arrow: true
  })
};
```

---

## Arrow

The arrow component adds an arrow to the floating component.

```html

<div #trigger>Trigger</div>

<ngx-floating
  [trigger]="trigger"
>
  <p>Floating content</p>
  
  <ngx-arrow padding="10" />
</ngx-floating>
```

> To see a demo, click on the [link](https://ngx-popovers.vercel.app/docs/core/arrow) provided.

You can provide your own component for arrow visualization:

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
  provide: NGX_ARROW_COMPONENT,
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

This package is a major dependency for other npm packages:

* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
* [dialog](https://www.npmjs.com/package/@ngx-popovers/dialog)
