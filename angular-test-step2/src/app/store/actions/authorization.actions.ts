import { createAction, props } from "@ngrx/store";
import { AuthStateModel } from "../../state-models";

export const Authorization = createAction(
    '[Auth page] Authorization'
);

export const AuthorizationSuccess = createAction(
    '[Auth page] Authorization Success',
    props<{ state: AuthStateModel }>()
);