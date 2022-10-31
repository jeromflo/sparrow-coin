import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTransaccionsComponent } from './create-transaccions.component';

const routes: Routes = [{ path: '', component: CreateTransaccionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateTransaccionsRoutingModule { }
