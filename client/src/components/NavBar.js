import React from "react";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
function NavBar({ user, setUser }) {
    const history = useHistory()
    function handleLogout() {
        fetch('/logout', { method: "Delete" })
            .then((r) => {
                if (r.ok) {
                    setUser(null)
                }
            })
            .then(() => history.push('/'))
    }

    return (
        <nav className="navbar">
            <div>
                <NavLink
                    to='/'
                    exact
                    className='navlink'
                >
                    Home
                </NavLink>
                <NavLink
                    to='/parks'
                    exact
                    className='navlink'
                >
                    Parks
                </NavLink>
                <NavLink
                    to='/newpark'
                    exact
                    className='navlink'
                >
                    New Park
                </NavLink>
                <NavLink
                    to='/newreview'
                    exact
                    className='navlink'
                >
                    New Review
                </NavLink>
            </div>
            <div>
                <NavLink
                    to={`/${user.username}`}
                    exact
                    className='navlink'
                >
                    {user.username}
                </NavLink>
                <button onClick={handleLogout} id="logout">
                    Logout
                </button>
            </div>
        </nav>
    )
}

export default NavBar;