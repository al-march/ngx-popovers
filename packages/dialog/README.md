# dialog

This library was generated with [Nx](https://nx.dev)
using [floating-ui](https://floating-ui.com/) for [Angular](https://angular.dev/) apps

> See [Demo](https://ngx-popovers.vercel.app/dialog)

> **Note**
>
> I strongly recommend not using this library until its stable version is released.
>

Use the command below

```bash
npm i @ngx-popovers/dialog
```

## Usage

The dialog is a very simple component with ready-made elements.

```html angular2html

<ngx-dialog>
  <button ngx-dialog-trigger>
    Toggle
  </button>

  <ng-template ngx-dialog-template>
    <div class="modal-box">
      <p class="text-2xl">Hello! I am Dialog</p>
      <p>
        Lorem ipsum dolor sit amet,
        consectetur adipisicing elit.
      </p>

      <button ngx-dialog-close>
        Close
      </button>
    </div>
  </ng-template>
</ngx-dialog>
```

### ngx-dialog-trigger

You can have a several components inside the `<ngx-dialog />`.

The `ngxDialogTrigger` directive can be useful
if you want to set the trigger inside `<ngx-dialog />` as default.

```html angular2html

<ngx-dialog>
  <!-- 
    the dialog opens when 
    the button[ngx-dialog-trigger] is clicked 
  -->
  <button ngx-dialog-trigger>
    Toggle
  </button>

  <ng-template ngx-dialog-template>
    <div class="dialog-box">
      <p>Dialog content</p>
    </div>
  </ng-template>
</ngx-dialog>
```

### ngx-dialog-template

The `NgxDialogTemplate` directive helps to find a template for the dialog.

```html angular2html

<ngx-dialog [value]="true">
  <!-- 
    Angular doesn't destroy elements in <ng-content />, so
    the DialogTemplate directive uses for conditional content projection.
    
    https://angular.io/guide/content-projection#conditional-content-projection
  -->
  <ng-template ngx-dialog-template>
    <div class="dialog-box">
      <p>Dialog content</p>
    </div>
  </ng-template>
</ngx-dialog>
```

### ngx-dialog-close

The `NgxDialogClose` directive closes dialog
when handles a click to an element.

```html angular2html

<ngx-dialog [value]="true">
  <ng-template ngx-dialog-template>
    <div class="dialog-box">
      <p>Dialog content</p>

      <!-- 
        the dialog will close when 
        button[ngx-dialog-close] clicked 
      -->
      <button ngx-dialog-close>close</button>
    </div>
  </ng-template>
</ngx-dialog>
```

### API

Input parameters

| Input                  | Description                            | Type      | Default |
|------------------------|----------------------------------------|-----------|---------|
| `closeOnBackdropClick` | close when clicking on backdrop        | `boolean` | `true`  |
| `backdropClass`        | the class for a backdrop element       | `string`  | `''`    |
| `contentClass`         | the class for a dialog wrapper element | `string`  | `''`    |
| `animationDisabled`    | disables show/hide animations          | `boolean` | `false` |
| `value`                | show or hide dialog                    | `boolean` | `false` |

Output parameters

| Output           | Description                  | Type                           |
|------------------|------------------------------|--------------------------------|
| `valueChange`    | the `value` changes emitter  | `EventEmitter<boolean>`        |
| `show`           | emits when the popover shows | `EventEmitter`                 |
| `hide`           | emits when the popover hides | `EventEmitter`                 |
| `animationStart` | emits when animation starts  | `EventEmitter<AnimationEvent>` |
| `animationDone`  | emits when animation ends    | `EventEmitter<AnimationEvent>` |

### Configuration

There is a configuration token `NGX_DIALOG_CONFIG`.
Please, use the `NgxDialogConfig` class to change the default floating properties.

```typescript
import { Provider } from '@angular/core';
import { NGX_DIALOG_CONFIG, NgxDialogConfig } from '@ngx-popovers/dialog';

export const DialogConfigProvider: Provider = {
  provide: NGX_DIALOG_CONFIG,
  useValue: new NgxDialogConfig({
    backdropClass: 'backdrop',
    contentClass: 'content',
    closeOnBackdropClick: false,
    animationDisabled: false
  })
};
```

## Sources

Another packages from this library:

* [core](https://www.npmjs.com/package/@ngx-popovers/core)
* [tooltip](https://www.npmjs.com/package/@ngx-popovers/tooltip)
* [popover](https://www.npmjs.com/package/@ngx-popovers/popover)
