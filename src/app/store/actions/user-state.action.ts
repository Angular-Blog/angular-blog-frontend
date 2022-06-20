import { createAction, props } from "@ngrx/store";

export const loginUser = createAction('[User] Login', props<{ username: string, userId: string }>())
export const logoutUser = createAction('[User] Logout')