# floating

This library was generated with [Nx](https://nx.dev) using [floating.ui](https://floating-ui.com/) 


> **Note**
> I strongly recommend not using this library until its stable version is released.

## Usage

```html
<div #trigger>
    <p>Trigger content</p>
</div>

<ngx-floating
  [trigger]="trigger"
  [placement]="'bottom'"
  [offset]="10"
>
  <div class="floating">
    <p>Floating content</p>
  </div>
</ngx-floating>
```
