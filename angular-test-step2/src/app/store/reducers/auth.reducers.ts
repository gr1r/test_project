import {
      Action,
      ActionReducer,
      ActionReducerMap,
      createFeatureSelector,
      createReducer,
      createSelector,
      MetaReducer,
      on,  
    } from '@ngrx/store';
import { State } from '@ngxs/store';
    import { environment } from '../../../environments/environment';
    import { AuthStateModel } from '../../state-models';
    import * as fromAction from '../actions'

export interface AuthState {
    state: AuthStateModel
}

const initalState: AuthState = {
  state:  {loggedIn: false, username: null }
}

const authReducer = createReducer(
  initalState,
  on(fromAction.Authorization, (state)=>({ ...state})),
  on(fromAction.AuthorizationSuccess, (state) => ({...state,  loggedIn : true}))
)


export function reducer(state: AuthState | undefined, action : Action) : AuthState {
  return authReducer(state, action)
}

// export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];

