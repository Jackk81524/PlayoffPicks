import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faTrophy } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <div className="nav-bar">
        <nav>
            <NavLink exact="true" activeClassName="active" to="/" className="side-text">
                <FontAwesomeIcon icon = {faHome} color='white' />
            </NavLink>
        </nav>
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