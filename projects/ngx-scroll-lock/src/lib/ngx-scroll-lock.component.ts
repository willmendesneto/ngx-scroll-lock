import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  isDevMode,
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

  private targetElement: HTMLElement;

  private listenerOptions = {
    capture: false,
    passive: false,
  };

  ngOnInit() {
    this.targetElement = this.target
      ? document.querySelector(this.target)
      : document.body;

    // Shows error message only in Development
    if (!this.targetElement && isDevMode()) {
      console.error(
        // tslint:disable-next-line: max-line-length
        `\`NgxScrollLockComponent\` need to receive "target" as an element, but it received "${
          this.target || 'body'
        }". Please check if the element is unique and it's available in your DOM.`
      );
    }

    if (this.lock && this.targetElement) {
      this.disableLock(this.targetElement);
    }
  }

  ngOnDestroy() {
    if (this.targetElement) {
      this.enableLock(this.targetElement);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.target &&
      !changes.target.firstChange &&
      changes.target.previousValue !== changes.target.currentValue
    ) {
      this.enableLock(this.targetElement);
      this.targetElement = this.target
        ? document.querySelector(this.target)
        : document.body;
      if (this.lock && this.targetElement) {
        this.disableLock(this.targetElement);
      }
    }
    if (
      changes.lock &&
      !changes.lock.firstChange &&
      changes.lock.previousValue !== changes.lock.currentValue &&
      this.targetElement
    ) {
      changes.lock.currentValue
        ? this.disableLock(this.targetElement)
        : this.enableLock(this.targetElement);
    }
  }

  disableLock(target: HTMLElement) {
    this.targetElement.classList.add('ngx-scroll-lock');

    // Mobile Safari ignores { overflow: hidden } declaration on the body.
    if (this.isTouchDevice()) {
      this.targetElement.addEventListener(
        'touchmove',
        this.preventTouchMove,
        this.listenerOptions
      );
    }
  }

  enableLock(target: HTMLElement) {
    this.targetElement.classList.remove('ngx-scroll-lock');

    if (this.isTouchDevice()) {
      this.targetElement.removeEventListener(
        'touchmove',
        this.preventTouchMove,
        this.listenerOptions
      );
    }
  }

  isTouchDevice() {
    return !!window && ('ontouchstart' in window || navigator.maxTouchPoints);
  }

  preventTouchMove(rawEvent: TouchEvent): boolean {
    const e = rawEvent || { ...(window as any).event, touches: [] };
    // // Do not prevent if the event has more than one touch
    // (usually meaning this is a single or multi touch gesture like pinch to zoom)
    if (e.touches && e.touches.length >= 1) {
      return true;
    }

    if (e.preventDefault) {
      e.preventDefault();
    }

    return false;
  }
}
