# core

This library was generated with [Nx](https://nx.dev) and [floating-ui](https://floating-ui.com/) for Angular apps.

> **Note**
>
> I strongly recommend not using this library until its stable version is released.

This package is a major dependency for other packages:
* [floating](https://www.npmjs.com/package/@ngx-popovers/floating)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)

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
The computePosition method is a proxy for computePosition from [floating-ui](https://floating-ui.com/docs/computePosition)

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

### Portal

The `<ngx-portal/>` component displays the content on the body.

```html
<ngx-portal>
    <p>It will be displayed as the last child of the body</p>
</ngx-portal>
```

This component is required to display tooltips correctly without overlapping with other elements on the page.

It uses here:
* [floating](https://www.npmjs.com/package/@ngx-popovers/floating)

