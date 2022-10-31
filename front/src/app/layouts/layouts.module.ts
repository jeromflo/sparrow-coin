import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { DirectivesModule } from '../shared/directives/directives.module';

@NgModule({
  declarations: [HeaderComponent, NavbarComponent],
  imports: [CommonModule, RouterModule, BrowserModule, DirectivesModule],
  exports: [HeaderComponent, NavbarComponent],
})
export class LayoutsModule {}
