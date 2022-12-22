import {
    createAction,
    createReducer,
    configureStore,
    createListenerMiddleware,
} from '@reduxjs/toolkit'
import { APP_STATES } from './const'

export const LOGIN_REQUESTED = createAction('LOGIN_REQUESTED')
export const LOGIN_FAILED = createAction('LOGIN_FAILED')
export const LOGIN_SUCCEEDED = createAction('LOGIN_SUCCEEDED')
export const SIGNUP_REQUESTED = createAction('SIGNUP_REQUESTED')
export const SIGNUP_SUCCEEDED = createAction('SIGNUP_SUCCEEDED')
export const SIGNUP_FAILED = createAction('SIGNUP_FAILED')
export const LOGOUT = createAction('LOGOUT')
export const FETCH_USER_REQUESTED = createAction('FETCH_USER_REQUESTED')
export const FETCH_USER_SUCCEEDED = createAction('FETCH_USER_SUCCEEDED')
export const FETCH_USER_FAILED = createAction('FETCH_USER_FAILED')
export const SET_APP_STATE = createAction('SET_APP_STATE')

const initialState = {
    appState: APP_STATES.LOGIN,
    isLoading: false,
    user: null,
}

const startLoading = (state) => {
    state.isLoading = true
}

const stopLoading = (state) => {
    state.isLoading = false
    clearError(state)
}

const handleLoginSignup = (state, action) => {
    state.isLoading = false
    state.user = action.payload
}

const handleError = (state, action) => {
    state.isLoading = false
    state.message.text = action.payload
    state.message.type = 'error'
}

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(LOGIN_REQUESTED, startLoading)
        .addCase(SIGNUP_REQUESTED, startLoading)
        .addCase(FETCH_USER_REQUESTED, startLoading)
        .addCase(LOGIN_SUCCEEDED, handleLoginSignup)
        .addCase(SIGNUP_SUCCEEDED, handleLoginSignup)
        .addCase(LOGOUT, (state) => {
            state.user = null
        })
        .addCase(LOGIN_FAILED, handleError)
        .addCase(SIGNUP_FAILED, handleError)
        .addCase(FETCH_USER_SUCCEEDED, (state, action) => {
            stopLoading(state)
        })
        .addCase(SET_APP_STATE, (state, action) => {
            state.appState = action.payload
        })
})

const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    actionCreator: LOGIN_REQUESTED,
    effect: async (action, listenerApi) => {},
})

listenerMiddleware.startListening({
    actionCreator: SIGNUP_REQUESTED,
    effect: async (action, listenerApi) => {},
})

listenerMiddleware.startListening({
    actionCreator: FETCH_USER_REQUESTED,
    effect: async (_, listenerApi) => {},
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
