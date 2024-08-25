import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TitleComponent } from '@demo/pages/documentation/ui/components/title/title.component';
import { HighlightComponent } from '@demo/core/highlight';

const defaultUsage = `
<div #trigger>trigger</div>

<ngx-floating
  [trigger]="trigger"
  placement="bottom"
  bindTo=".body"
>
  <p>Floating content</p>
  
  <ngx-arrow padding="20" />
</ngx-floating>
`.trim();

const configExample = `
import { Component, Provider } from '@angular/core';
import { ArrowBase, NGX_ARROW_COMPONENT } from '@ngx-popovers/core';

@Component({
  standalone: true,
  template: \`
    <div
      style="
        width: 12px;
        height: 12px;
        transform: rotate(45deg);
      "
      class="bg-primary"
    ></div>
  \`
})
export class CustomArrow extends ArrowBase {
}

export const ArrowProvider: Provider = {
  provide: NGX_ARROW_COMPONENT,
  useValue: CustomArrow
};
`.trim();

@Component({
  selector: 'ngx-popovers-page-arrow',
  standalone: true,
  imports: [
    TitleComponent,
    HighlightComponent
  ],
  templateUrl: './page-arrow.component.html',
  styleUrl: './page-arrow.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageArrowComponent {
  defaultUsage = defaultUsage;
  configExample = configExample;
}
