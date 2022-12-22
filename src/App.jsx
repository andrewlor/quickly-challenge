import React from 'react'
import { connect } from 'react-redux'
import Login from './components/Login'
import Signup from './components/Signup'
import { APP_STATES } from './const'

const App = ({ appState }) => (
    <div className="bg-gray-900 h-screen w-screen flex items-center justify-center flex-col">
        {appState === APP_STATES.LOGIN && <Login />}
        {appState === APP_STATES.SIGNUP && <Signup />}
        {appState === APP_STATES.PROFILE && <Login />}
    </div>
)

export default connect(
    ({ appState }) => ({ appState }),
    () => ({})
)(App)
