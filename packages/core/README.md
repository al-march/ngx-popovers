# core

This library was generated with [Nx](https://nx.dev) and [floating-ui](https://floating-ui.com/) for Angular apps.

> **Note**
>
> I strongly recommend not using this library until its stable version is released.

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
The `computePosition` method is a proxy for `computePosition` from [floating-ui](https://floating-ui.com/docs/computePosition)

#### (method) autoUpdate
The `autoUpdate` method is a proxy for `autoUpdate` from [floating-ui](https://floating-ui.com/docs/computePosition)


```typescript
floatingService = inject(FloatingService);

this.floatingService.computePosition(trigger, floating);
```

You also can import all types and  methods of floating-ui from this package

```typescript
import { 
  Derivable, 
  FlipOptions, 
  OffsetOptions, 
  Placement, 
  ShiftOptions 
} from '@ngx-popovers/core';
```
## Sources
This package is a major dependency for other packages:
* [floating](https://www.npmjs.com/package/@ngx-popovers/floating)
* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
