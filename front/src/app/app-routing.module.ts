import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './shared/guards/login/login.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'transacciones',
    loadChildren: () =>
      import('./modules/transacciones/transacciones.module').then(
        (m) => m.TransaccionesModule
      ),
  },
  {
    path: 'create-transaccion',
    loadChildren: () =>
      import('./modules/create-transaccions/create-transaccions.module').then(
        (m) => m.CreateTransaccionsModule
      ),
    canLoad: [LoginGuard],
  },

  {
    path: 'principal',
    loadChildren: () =>
      import('./modules/principal/principal.module').then(
        (m) => m.PrincipalModule
      ),
  },
  { path: '', pathMatch: 'full', redirectTo: 'principal' },
  {
    path: 'mineria',
    loadChildren: () =>
      import('./modules/mineria/mineria.module').then((m) => m.MineriaModule),
    canLoad: [LoginGuard],
  },
  {
    path: '**',
    loadChildren: () =>
      import('./modules/unknow-page/unknow-page.module').then(
        (m) => m.UnknowPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
