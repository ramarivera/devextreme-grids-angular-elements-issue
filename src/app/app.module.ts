import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, Injector, DoBootstrap } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AppComponent } from './app.component';
import { GridsModule } from './grids/grids.module';
import { GenericGridComponent } from './grids/generic-grid/generic-grid.component';

@NgModule({
  declarations: [AppComponent],
  imports: [GridsModule, BrowserModule],
  providers: [],
  entryComponents: [GenericGridComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(GenericGridComponent, { injector: this.injector });
    customElements.define('mpm-data-grid', el);
    console.log(el);
  }
}
