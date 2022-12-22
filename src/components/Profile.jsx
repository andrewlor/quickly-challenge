import React from 'react'
import { connect } from 'react-redux'
import { LOGOUT } from '../redux'

export const Profile = ({ logout, user }) => {
    return (
        <div className="bg-white shadow-md rounded p-8 mb-4 w-1/3">
            {user && (
                <div className="mb-4 text-gray-700 text-sm">
                    <p>ID: {user.id}</p>
                    <p>First Name: {user.first_name}</p>
                    <p>List Name: {user.last_name}</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={logout}
            >
                Log out
            </button>
        </div>
    )
}

export default connect(
    ({ user }) => ({ user }),
    (dispatch) => ({
        logout: () => dispatch(LOGOUT()),
    })
)(Profile)
