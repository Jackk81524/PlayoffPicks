import React from 'react'
import './index.scss'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="nav-bar">
        <nav>
            <NavLink exact="true" activeClassName="active" to="/" className="side-text">
                Home
            </NavLink>
        </nav>
        <h1>
            Playoff Picks
        </h1>
        <nav>
            <NavLink exact="true" activeClassName="active" to="/standings" className="side-text">
                    Standings
            </NavLink>
        </nav>
    </div>
  )
}

export default Navbar