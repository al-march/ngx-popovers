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

### Arrow

#### `@Input()` withArrow

Adds arrow to tooltip according floating state

#### `@Input()` arrowPadding

If your floating element has border-radius, this will prevent it from overflowing the corners. ([more](https://floating-ui.com/docs/arrow#padding))

### Arrow custom component

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
