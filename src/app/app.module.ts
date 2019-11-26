import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GridsModule } from './grids/grids.module';

@NgModule({
  declarations: [AppComponent],
  imports: [GridsModule, BrowserModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
