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
