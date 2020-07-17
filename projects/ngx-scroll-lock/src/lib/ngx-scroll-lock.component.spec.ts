import { SimpleChange } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';

import { NgxScrollLockComponent } from './ngx-scroll-lock.component';

describe('NgxScrollLockComponent', () => {
  let component: NgxScrollLockComponent;
  let fixture: any;

  // describe('When the element exists in the DOM', () => {
  //   beforeEach(async(() => {
  //     document.body.style.overflow = 'scroll';
  //     fixture = TestBed.configureTestingModule({
  //       declarations: [NgxScrollLockComponent],
  //     }).createComponent(NgxScrollLockComponent);
  //     component = fixture.componentInstance;

  //     spyOn(component, 'disableLock').and.callThrough();
  //     spyOn(component, 'enableLock').and.callThrough();

  //     component.lock = true;
  //     fixture.detectChanges();
  //   }));

  //   it('should disable lock by default if `lock` attribute is true', () => {
  //     expect(component.disableLock).toHaveBeenCalledTimes(1);
  //   });

  //   it('should toggle lock if `lock` attribute changes', () => {
  //     expect(component.enableLock).toHaveBeenCalledTimes(0);

  //     component.ngOnChanges({
  //       lock: new SimpleChange(true, false, false),
  //     });
  //     fixture.detectChanges();

  //     expect(component.enableLock).toHaveBeenCalledTimes(1);
  //   });

  //   it('should remove the scroll lock feature if', () => {
  //     expect(component.enableLock).toHaveBeenCalledTimes(0);
  //     fixture.destroy();
  //     expect(component.enableLock).toHaveBeenCalledTimes(1);
  //   });
  // });

  describe('When the element does NOT exists in the DOM', () => {
    beforeEach(async(() => {
      spyOn(console, 'error');
      document.body.style.overflow = 'scroll';
      fixture = TestBed.configureTestingModule({
        declarations: [NgxScrollLockComponent],
      }).createComponent(NgxScrollLockComponent);
      component = fixture.componentInstance;

      spyOn(component, 'disableLock').and.callThrough();
      spyOn(component, 'enableLock').and.callThrough();
      component.target = '#this-element-does-not-exists';
      component.lock = true;
      fixture.detectChanges();
    }));

    it('should console errors if `target` is an invalid DOM element is running in development mode', () => {
      expect(console.error).toHaveBeenCalledTimes(1);
      expect(console.error).toHaveBeenCalledWith(
        // tslint:disable-next-line: max-line-length
        `\`NgxScrollLockComponent\` need to receive "target" as an element, but it received "#this-element-does-not-exists". Please check if the element is unique and it's available in your DOM.`
      );
    });
  });
});
