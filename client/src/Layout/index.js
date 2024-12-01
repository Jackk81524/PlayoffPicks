import React from 'react';
import { Outlet } from 'react-router-dom';
import './index.css'

const Layout = () => {
  return (
    <div className="App">
        <div className='page'>
            <h1>Testing</h1>
            <Outlet />
        </div>
    </div>
  )
}

export default Layout