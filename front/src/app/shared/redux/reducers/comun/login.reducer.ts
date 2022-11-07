import { Action, createReducer, on } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import * as actions from '../../actions/loging.actions';

export const initialState = environment.keysLogin;
const featureReducer = createReducer(
  initialState,
  on(actions.setKeys, (state, props) => [...props.data]),
  on(actions.reset, (state) => [])
);
export function loginReducer(state: string[], action: Action) {
  return featureReducer(state, action);
}
