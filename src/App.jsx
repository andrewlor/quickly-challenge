import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Login from './components/Login'
import Signup from './components/Signup'
import Loader from './components/Loader'
import Profile from './components/Profile'
import { APP_STATES } from './const'
import { SET_APP_STATE } from './redux'

const App = ({ appState, isLoading, error, setMounted }) => {
    useEffect(() => {
        setMounted()
    }, [])
    return (
        <div className="bg-gray-900 h-screen w-screen flex items-center justify-center flex-col">
            <Loader isLoading={isLoading} />
            {appState === APP_STATES.LOGIN && <Login />}
            {appState === APP_STATES.SIGNUP && <Signup />}
            {appState === APP_STATES.PROFILE && <Profile />}
            {error && <p className="text-red-200">{error}</p>}
        </div>
    )
}

export default connect(
    ({ appState, isLoading, error }) => ({ appState, isLoading, error }),
    (dispatch) => ({
        setMounted: () => dispatch(SET_APP_STATE(APP_STATES.MOUNTED)),
    })
)(App)
