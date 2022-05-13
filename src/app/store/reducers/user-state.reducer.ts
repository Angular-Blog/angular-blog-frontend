import { User } from "../models/user.model";
import { loginUser, logoutUser } from "../actions/user-state.action";
import { createReducer, on } from "@ngrx/store";

const initialState: User = {
    loggedIn: false,
    username: ""
}

const mockLogin: User = {
    loggedIn: true,
    username: "tester"
}

export const userReducer = createReducer(
    initialState,
    on(loginUser, (state, {username}) => loginFunction(username)),
    on(logoutUser, (state) => logoutFunction())
)

function loginFunction(username: string) {
    const newState: User = {username: username, loggedIn: true}
    return newState;
}

function logoutFunction() {
    localStorage.setItem('currentUser', '')
    return initialState
}