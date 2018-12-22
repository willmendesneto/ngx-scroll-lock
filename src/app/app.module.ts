import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxScrollLockModule } from '../../projects/ngx-scroll-lock/src/lib/ngx-scroll-lock.module';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxScrollLockModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
