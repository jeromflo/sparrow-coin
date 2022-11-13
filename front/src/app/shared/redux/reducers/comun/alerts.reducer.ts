import { Action, createReducer, on } from '@ngrx/store';
import { IAlertRedux } from 'src/app/shared/interfaces/comunes/alert.interface';
import * as actions from '../../actions/comun/alerts.actions';

export const initialState: IAlertRedux[] = [];
const featureReducer = createReducer(
  initialState,
  on(actions.setAlert, (state, { value }) => [...state, value]),
  on(actions.close, (state) => {
    let returned = [...state];
    returned.shift();
    return returned;
  })
);

export function alertReducer(state: IAlertRedux[], action: Action) {
  return featureReducer(state, action);
}
