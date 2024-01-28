import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'ngx-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent implements AfterViewInit {
  _isDialogRendered = false;

  @Input()
  value = false;

  @Output()
  valueChange = new EventEmitter<boolean>();

  ngAfterViewInit() {
    this._isDialogRendered = true;
  }

  open() {
    this.onValueChanged(true);
  }

  close() {
    this.onValueChanged(false);
  }

  onValueChanged(value: boolean) {
    this.value = value;
    this.valueChange.emit(value);
  }
}
