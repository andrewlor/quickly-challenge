import {
    createAction,
    createReducer,
    configureStore,
    createListenerMiddleware,
} from '@reduxjs/toolkit'
import { APP_STATES } from './const'

const API_BASE_URL =
    'https://rdeevqhn22.execute-api.us-east-1.amazonaws.com/dev'

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
    appState: APP_STATES.UNMOUNTED,
    authToken: localStorage.getItem('authToken'),
    isLoading: false,
    user: null,
    error: null,
}

const clearError = (state) => {
    state.error = null
}

const startLoading = (state) => {
    state.isLoading = true
}

const stopLoading = (state) => {
    state.isLoading = false
    clearError(state)
}

const handleLoginSignup = (state, { payload: { user, token } }) => {
    localStorage.setItem('authToken', token)
    state.user = user
    state.appState = APP_STATES.PROFILE
    stopLoading(state)
}

const handleError = (state, action) => {
    state.isLoading = false
    state.error = action.payload
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
            localStorage.clear()
            state.appState = APP_STATES.LOGIN
        })
        .addCase(LOGIN_FAILED, handleError)
        .addCase(SIGNUP_FAILED, handleError)
        .addCase(FETCH_USER_SUCCEEDED, (state, action) => {
            state.user = action.payload
            state.appState = APP_STATES.PROFILE
            stopLoading(state)
        })
        .addCase(SET_APP_STATE, (state, action) => {
            state.appState = action.payload
        })
})

const listenerMiddleware = createListenerMiddleware()

// When app mounts, we check if user token is present, if so we fetch the user
listenerMiddleware.startListening({
    actionCreator: SET_APP_STATE,
    effect: async (action, listenerApi) => {
        if (action.payload === APP_STATES.MOUNTED) {
            if (listenerApi.getState().authToken) {
                listenerApi.dispatch(FETCH_USER_REQUESTED())
            } else {
                listenerApi.dispatch(SET_APP_STATE(APP_STATES.LOGIN))
            }
        }
    },
})

// Fetch user when login succeeds
listenerMiddleware.startListening({
    actionCreator: LOGIN_SUCCEEDED,
    effect: async (action, listenerApi) => {
        listenerApi.dispatch(FETCH_USER_REQUESTED())
    },
})

listenerMiddleware.startListening({
    actionCreator: LOGIN_REQUESTED,
    effect: async (action, listenerApi) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'post',
            body: JSON.stringify(action.payload),
            headers: {
                'content-type': 'application/json',
            },
        })

        if (response.status !== 200) {
            response.json().then(({ message }) => {
                listenerApi.dispatch(LOGIN_FAILED(message))
            })
            return
        }

        response.json().then(({ token }) => {
            listenerApi.dispatch(LOGIN_SUCCEEDED({ token }))
        })
    },
})

listenerMiddleware.startListening({
    actionCreator: SIGNUP_REQUESTED,
    effect: async (action, listenerApi) => {
        const response = await fetch(`${API_BASE_URL}/auth/signup`, {
            method: 'post',
            body: JSON.stringify(action.payload),
            headers: {
                'content-type': 'application/json',
            },
        })

        if (response.status !== 201) {
            response.json().then(({ message }) => {
                listenerApi.dispatch(SIGNUP_FAILED(message))
            })
            return
        }

        response.json().then(({ user, token }) => {
            listenerApi.dispatch(SIGNUP_SUCCEEDED({ user, token }))
        })
    },
})

listenerMiddleware.startListening({
    actionCreator: FETCH_USER_REQUESTED,
    effect: async (action, listenerApi) => {
        const authToken = listenerApi.getState().authToken
        const response = await fetch(`${API_BASE_URL}/auth/user`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })

        if (response.status !== 200) {
            response.json().then(({ message }) => {
                listenerApi.dispatch(FETCH_USER_FAILED(message))
            })
            return
        }

        response.json().then(({ user }) => {
            listenerApi.dispatch(FETCH_USER_SUCCEEDED(user))
        })
    },
})

export const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
