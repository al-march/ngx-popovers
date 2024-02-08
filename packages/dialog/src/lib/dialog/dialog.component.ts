import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  inject,
  Input,
  Output,
  signal,
  ViewEncapsulation
} from '@angular/core';
import { animate, AnimationEvent, style, transition, trigger } from '@angular/animations';
import { DialogTemplate } from '../directives';
import { NGX_DIALOG_CONFIG } from '../core';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('contentAnimation', [
      transition(':enter', [
        style({ transform: 'translateY(10px) scale(0.98)', opacity: 0 }),
        animate(120, style({
          transform: 'translateY(0) scale(1)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate(80, style({
          transform: 'translateY(4px) scale(0.99)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class DialogComponent implements AfterViewInit {
  private readonly config = inject(NGX_DIALOG_CONFIG);
  private readonly ref = inject(ChangeDetectorRef);

  @ContentChild(DialogTemplate)
  templateRef?: DialogTemplate;

  @Input()
  value = false;

  @Input()
  animationDisabled = this.config.animationDisabled;

  @Input()
  contentClass = this.config.contentClass;

  @Input()
  backdropClass = this.config.backdropClass;

  @Input()
  closeOnBackdropClick = this.config.closeOnBackdropClick;

  @Output()
  valueChange = new EventEmitter<boolean>();

  @Output()
  show = new EventEmitter();

  @Output()
  hide = new EventEmitter();

  @Output()
  animationStart = new EventEmitter<AnimationEvent>();

  @Output()
  animationDone = new EventEmitter<AnimationEvent>();

  isAnimating = signal(false);

  ngAfterViewInit() {
    if (!this.templateRef) {
      throw new Error([
        'There is no a template for the <ngx-dialog />.',
        'Please, add <ng-template ngx-dialog-template /> inside',
        'the <ngx-dialog /> component.',
        '\n\n See docs: https://ngx-popovers.vercel.app/dialog for more information \n'
      ].join(' '));
    }
  }

  open() {
    this.onValueChanged(true);
  }

  close() {
    this.onValueChanged(false);
  }

  onValueChanged(value: boolean) {
    this.isAnimating.set(true);
    this.value = value;
    this.valueChange.emit(value);

    if (value) {
      this.show.emit();
    } else {
      this.hide.emit();
    }

    this.ref.markForCheck();
  }

  onAnimationStart(event: AnimationEvent) {
    this.isAnimating.set(true);
    this.animationStart.emit(event);
  }

  onAnimationDone(event: AnimationEvent) {
    this.isAnimating.set(false);
    this.animationDone.emit(event);
  }
}
