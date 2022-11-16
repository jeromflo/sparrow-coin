import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivesModule } from '../shared/directives/directives.module';
import { ComponentsModuleShared } from '../shared/components/components.module';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent],
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    DirectivesModule,
    ComponentsModuleShared,
  ],
  exports: [HeaderComponent, NavbarComponent],
})
export class LayoutsModule {}
