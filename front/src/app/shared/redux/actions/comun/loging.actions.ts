import { createAction, props } from '@ngrx/store';

export const setKeys = createAction(
  '[login] setKeys',
  props<{ data: string[] }>()
);
export const reset = createAction('[login] reset');
