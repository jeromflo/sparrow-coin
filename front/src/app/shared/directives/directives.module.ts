import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutDirective } from './clickOut/click-out.directive';

@NgModule({
  declarations: [ClickOutDirective],
  imports: [CommonModule],
  exports: [ClickOutDirective],
})
export class DirectivesModule {}
