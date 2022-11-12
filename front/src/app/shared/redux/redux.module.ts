import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { ComunModule } from './reducers/comun/comun.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),

    StoreModule.forRoot({}),
    ComunModule,
  ],
})
export class ReduxModule {}
