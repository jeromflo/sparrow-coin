import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnknowPageComponent } from './unknow-page.component';

const routes: Routes = [{ path: '', component: UnknowPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnknowPageRoutingModule { }
