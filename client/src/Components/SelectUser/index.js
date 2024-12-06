import React, { useContext, useState } from 'react'
import { UserContext } from '../../Context/UserContext'
import { useNavigate } from 'react-router-dom';
import './index.scss'

const SelectUser = () => {
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const loginUser = (selectedUser) => {
        login(selectedUser);
        navigate('/')
    }

  return (
    <div className='selectUser'>
        <button onClick={() => loginUser("Jack")}>Jack</button>
        <button onClick={() => loginUser("Matt")}>Matt</button>
        <button onClick={() => loginUser("Nick")}>Nick</button>
        <button onClick={() => loginUser("Rich")}>Rich</button>
        <button onClick={() => loginUser("Kyle")}>Kyle</button>
        <button onClick={() => loginUser("Logan")}>Logan</button>
        <button onClick={() => loginUser("Mogo")}>Mogo</button>
    </div>
  )
}

export default SelectUser