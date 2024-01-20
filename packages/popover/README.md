# popover

This library was generated with [Nx](https://nx.dev) using [floating-ui](https://floating-ui.com/)
for [Angular](https://angular.dev/) apps

<img src="https://raw.githubusercontent.com/al-march/ngx-popovers/main/packages/popover/assets/preview.png" alt="md3tail theme">

> See [Demo](https://ngx-popovers.vercel.app/popover)

> **Note**
>
> I strongly recommend not using this library until its stable version is released.

The popover is a very easy to use component, and it has a simple API.
Just install and use.

> You have to install the [core](https://www.npmjs.com/package/@ngx-popovers/core) package for the all abilities.
>
> The core and the popover packages have the same versions.

Use the command below

```bash
npm i @ngx-popovers/core
```

Popover component displays content next to the trigger element on mouse click

## Usage

See more information about the properties in the official
documentation [floating-ui](https://floating-ui.com/docs/middleware)

```angular2html

<button #anchor (click)="popover.toggle()">
  Toggle Popover
</button>

<ngx-popover
  #popover
  [anchor]="anchor"
>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  </p>
  <button ngx-popover-close>
    Close
  </button>
</ngx-popover>
```

### With arrow

You should install the [core package](https://www.npmjs.com/package/@ngx-popovers/core) to import the Arrow component.

```typescript
import { Arrow, Placement } from '@ngx-popovers/core';
```

Example usage:

```angular2html

<button #anchor (click)="popover.toggle()">
  Toggle Popover
</button>

<ngx-popover
  #popover
  [anchor]="anchor"
>
  <div class="example-class">
    <p>Popover content</p>
  </div>

  <ngx-arrow padding="12" />
</ngx-popover>
```

### ngx-popover-close

The `NgxPopoverClose` directive closes popover
when handles a click to an element.

```typescript
import { PopoverCloseDirective } from '@ngx-popovers/popover';
```

### API

Input parameters

| Input               | Description                                     | Type                    | Default             |
|---------------------|-------------------------------------------------|-------------------------|---------------------|
| `placement`         | the popover position                            | `Placement`             | `'bottom'`          |
| `middleware`        | list of floating-ui middlewares without `arrow` | `MiddlewareList`        | `offset(4), flip()` |
| `bindTo`            | render popover into element                     | `string \| HTMLElement` | `'.body'`           |
| `autoUpdate`        | auto update the position of the Popover         | `boolean`               | `true`              |
| `disabled`          | disables open/close on the trigger clicks       | `boolean`               | `false`             |
| `animationDisabled` | disables show/hide animations                   | `boolean`               | `false`             |
| `value`             | show or hide state of popover                   | `boolean`               | `false`             |

Output parameters

| Output            | Description                                                           | Type                            |
|-------------------|-----------------------------------------------------------------------|---------------------------------|
| `valueChange`     | the `value` changes emitter                                           | `EventEmitter<boolean>`         |
| `show`            | emits when the popover shows                                          | `EventEmitter`                  |
| `hide`            | emits when the popover hides                                          | `EventEmitter`                  |
| `clickedOutside`  | emits when user clicks outside the floating element                   | `EventEmitter<Element>`         |
| `clickedInside`   | emits when user clicks inside the floating element.                   | `EventEmitter<Element>`         |
| `animationStart`  | emits when animation starts                                           | `EventEmitter<AnimationEvent>`  |
| `animationDone`   | emits when animation ends                                             | `EventEmitter<AnimationEvent>`  |
| `computePosition` | emits every time when the floating component calls `computePosition`. | `EventEmitter<ComputePosition>` |


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

And then just add your new provider to any module:

```typescript
@Component({
  selector: 'example-app-module',
  standalone: true,
  imports: [],
  providers: [
    PopoverConfigProvider
  ],
  template: ``,
})
```

## Arrow component

See the [core](https://www.npmjs.com/package/@ngx-popovers/core) package

## Sources

Another packages from this library:

* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
