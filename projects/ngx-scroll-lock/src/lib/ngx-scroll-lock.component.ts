import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'ngx-scroll-lock',
  template: `
    <style>
      .ngx-scroll-lock {
        box-sizing: border-box !important;
        overflow: hidden !important;
        position: inherit !important;
      }
    </style>
    <ng-content></ng-content>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class NgxScrollLockComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  target = '';

  @Input()
  lock = false;

  private _targetElement: HTMLElement;

  private _listenerOptions = {
    capture: false,
    passive: false,
  };

  ngOnInit() {
    this._targetElement = this.target
      ? document.querySelector(this.target)
      : document.body;

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
      this._targetElement = this.target
        ? document.querySelector(this.target)
        : document.body;
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
    this._targetElement.classList.add('ngx-scroll-lock');

    // Mobile Safari ignores { overflow: hidden } declaration on the body.
    this._targetElement.addEventListener(
      'touchmove',
      this.preventTouchMove,
      this._listenerOptions
    );
  }

  enableLock(target: HTMLElement) {
    this._targetElement.classList.remove('ngx-scroll-lock');

    this._targetElement.removeEventListener(
      'touchmove',
      this.preventTouchMove,
      this._listenerOptions
    );
  }

  isTouchDevice() {
    if (typeof window === 'undefined' || !window) return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  preventTouchMove(rawEvent: TouchEvent): boolean {
    const e = rawEvent || { ...window.event, touches: [] };

    // // Do not prevent if the event has more than one touch (usually meaning this is a multi touch gesture like pinch to zoom)
    if (e.touches && e.touches.length > 1) return true;

    if (e.preventDefault) e.preventDefault();

    return false;
  }
}
