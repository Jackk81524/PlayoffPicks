import React, { useContext } from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTrophy, faAdd } from '@fortawesome/free-solid-svg-icons'
import { UserContext } from '../../Context/UserContext'


const Navbar = () => {
    const { user } = useContext(UserContext);   

    return (
        <div className="nav-bar">
            <div className="left-nav">
                <nav>
                    <NavLink exact="true" activeClassName="active" to="/" className="side-text">
                        <FontAwesomeIcon icon = {faHome} color='white' />
                    </NavLink>
                </nav>
                {user == "Jack" && <nav>
                    <NavLink exact="true" activeClassName="active" to="/addGame" className="side-text add">
                        <FontAwesomeIcon icon = {faAdd} color='white' />
                    </NavLink>
                </nav>}
            </div>
            <h1>
                Playoff Picks
            </h1>
            <nav>
                <NavLink exact="true" activeClassName="active" to="/standings" className="side-text">
                    <FontAwesomeIcon icon = {faTrophy} color='white' />
                </NavLink>
            </nav>
        </div>
    )
}

export default Navbar