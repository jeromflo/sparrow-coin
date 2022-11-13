import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MineriaComponent } from './mineria.component';

const routes: Routes = [{ path: '', component: MineriaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MineriaRoutingModule { }
