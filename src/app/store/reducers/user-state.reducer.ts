import { User } from "../models/user.model";
import { loginUser, logoutUser } from "../actions/user-state.action";
import { createReducer, on } from "@ngrx/store";

const initialState: User = {
    loggedIn: false,
    username: "",
    userId: ""
}

const mockLogin: User = {
    loggedIn: true,
    username: "tester",
    userId: "123" 
}

export const userReducer = createReducer(
    initialState,
    on(loginUser, (state) => mockLogin),
    on(logoutUser, (state) => initialState)
)