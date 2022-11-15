import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TableModule } from 'primeng/table';
import { AlertsComponent } from './alerts/alerts.component';
import { DateSwapComponent } from './date-swap/date-swap.component';
import { DatePipe } from '../pipes/date/date.pipe';

@NgModule({
  declarations: [
    EmptyComponentComponent,
    DropdownComponent,
    AlertsComponent,
    DateSwapComponent,
    DatePipe,
  ],
  imports: [CommonModule, TableModule],
  exports: [
    EmptyComponentComponent,
    DropdownComponent,
    TableModule,
    AlertsComponent,
    DateSwapComponent,
    DatePipe,
  ],
})
export class ComponentsModuleShared {}
