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
    userId: ""
}

export const userReducer = createReducer(
    initialState,
    on(loginUser, (state, {username, userId}) => loginFunction(username, userId)),
    on(logoutUser, (state) => logoutFunction())
)

function loginFunction(username: string, userId: string) {
    const newState: User = {username: username, loggedIn: true, userId: userId}
    return newState;
}

function logoutFunction() {
    localStorage.setItem('currentUser', '')
    return initialState
}