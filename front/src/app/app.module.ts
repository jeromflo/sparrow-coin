import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LayoutsModule } from './layouts/layouts.module';
import { ComponentsModule } from './core/components/components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ReduxModule } from './shared/redux/redux.module';
import { ComponentsModuleShared } from './shared/components/components.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    ComponentsModule,
    ReduxModule,
    ComponentsModuleShared,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
