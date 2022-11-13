import { createAction, props } from '@ngrx/store';
import { IAlertRedux } from '../../../interfaces/comunes/alert.interface';

export const setAlert = createAction(
  '[alert] setAlert',
  props<{ value: IAlertRedux }>()
);

export const close = createAction('[alert] close');
