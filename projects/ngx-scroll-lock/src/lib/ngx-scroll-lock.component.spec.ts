import { Component, NO_ERRORS_SCHEMA, SimpleChange } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxScrollLockComponent } from './ngx-scroll-lock.component';

describe('NgxScrollLockComponent', () => {
  let component: NgxScrollLockComponent;
  let fixture: any;

  beforeEach(async(() => {
    document.body.style.overflow = 'scroll';
    fixture = TestBed.configureTestingModule({
      declarations: [NgxScrollLockComponent],
    }).createComponent(NgxScrollLockComponent);
    component = fixture.componentInstance;

    spyOn(component, 'disableLock').and.callThrough();
    spyOn(component, 'enableLock').and.callThrough();

    component.lock = true;
    fixture.detectChanges();
  }));

  it('should disable lock by default if `lock` attribute is true', () => {
    expect(component.disableLock).toHaveBeenCalledTimes(1);
  });

  it('should toggle lock if `lock` attribute changes', () => {
    expect(component.enableLock).toHaveBeenCalledTimes(0);

    component.ngOnChanges({
      lock: new SimpleChange(true, false, false),
    });
    fixture.detectChanges();

    expect(component.enableLock).toHaveBeenCalledTimes(1);
  });

  it('should remove the scroll lock feature if', () => {
    expect(component.enableLock).toHaveBeenCalledTimes(0);
    fixture.destroy();
    expect(component.enableLock).toHaveBeenCalledTimes(1);
  });
});
