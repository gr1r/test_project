import { State } from '@ngrx/store';
import * as fromReducer from '../reducers';

export function selectIsLoggedIn(authState: fromReducer.AuthState){
    console.log('selectIsLoggedIn Selector= ', authState);
    return authState.state.loggedIn;
}

export function selectUserName(authState: fromReducer.AuthState){
    return authState.state.username;
}