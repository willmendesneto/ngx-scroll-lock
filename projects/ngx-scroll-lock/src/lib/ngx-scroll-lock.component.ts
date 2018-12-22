import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

@Component({
  selector: 'ngx-scroll-lock',
  template: `
    <ng-content></ng-content>
  `,
})
export class NgxScrollLockComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  target = '';

  @Input()
  lock = false;

  private _targetElement: HTMLElement;

  ngOnInit() {
    this._targetElement =
      (this.target && document.querySelector(this.target)) || null;
    if (this.lock) {
      this.disableLock(this._targetElement);
    }
  }

  ngOnDestroy() {
    this.enableLock(this._targetElement);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.target &&
      !changes.target.firstChange &&
      changes.target.previousValue !== changes.target.currentValue
    ) {
      this.enableLock(this._targetElement);
      this._targetElement = this.target && document.querySelector(this.target);
      if (this.lock) {
        this.disableLock(this._targetElement);
      }
    }
    if (
      changes.lock &&
      !changes.lock.firstChange &&
      changes.lock.previousValue !== changes.lock.currentValue
    ) {
      changes.lock.currentValue
        ? this.disableLock(this._targetElement)
        : this.enableLock(this._targetElement);
    }
  }

  disableLock(target: HTMLElement) {
    disableBodyScroll(target);
  }

  enableLock(target: HTMLElement) {
    enableBodyScroll(target);
  }
}
