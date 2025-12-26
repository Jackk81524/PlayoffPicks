import React, { useContext } from 'react'
import './index.scss'
import { NavLink, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTrophy, faAdd, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../Context/UserContext'


const Navbar = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <div className="nav-bar">
            <div className="left-nav">
                <nav>
                    <button className="side-text back" onClick={() => navigate('/login')} aria-label="Login">
                        <FontAwesomeIcon icon={faArrowLeft} color='white' />
                    </button>
                </nav>
                <nav>
                    <NavLink exact={true} activeClassName="active" to="/" className="side-text">
                        <FontAwesomeIcon icon = {faHome} color='white' />
                    </NavLink>
                </nav>
            </div>

            <h1>
                Playoff Picks
            </h1>

            <div className="right-nav">
                <nav>
                    <NavLink exact={true} activeClassName="active" to="/standings" className="side-text">
                        <FontAwesomeIcon icon = {faTrophy} color='white' />
                    </NavLink>
                </nav>
                {user == "Jack" && (
                    <nav>
                        <NavLink exact={true} activeClassName="active" to="/settings" className="side-text add-right">
                            <FontAwesomeIcon icon = {faAdd} color='white' />
                        </NavLink>
                    </nav>
                )}
            </div>
        </div>
    )
}

export default Navbar