import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [EmptyComponentComponent, DropdownComponent],
  imports: [CommonModule, TableModule],
  exports: [EmptyComponentComponent, DropdownComponent, TableModule],
})
export class ComponentsModule {}
