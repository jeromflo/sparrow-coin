import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyComponentComponent } from './empty-component/empty-component.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { TableModule } from 'primeng/table';
import { AlertsComponent } from './alerts/alerts.component';
import { DateSwapComponent } from './date-swap/date-swap.component';
import { DatePipe } from '../pipes/date/date.pipe';
import { LoginKeyComponent } from './login-key/login-key.component';
import { EmptyTableComponent } from './empty-table/empty-table.component';

@NgModule({
  declarations: [
    EmptyComponentComponent,
    DropdownComponent,
    AlertsComponent,
    DateSwapComponent,
    DatePipe,
    LoginKeyComponent,
    EmptyTableComponent,
  ],
  imports: [CommonModule, TableModule],
  exports: [
    EmptyComponentComponent,
    DropdownComponent,
    TableModule,
    AlertsComponent,
    DateSwapComponent,
    DatePipe,
    LoginKeyComponent,
    EmptyTableComponent,
  ],
})
export class ComponentsModuleShared {}
