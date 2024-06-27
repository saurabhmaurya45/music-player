import React from 'react'
import logo from '../assets/Logo.png'
import profile from '../assets/Profile.png'

const Sidebar = () => {
    return (
        <>
            <img className='logo w-32 h-10' src={logo} alt='logo' />
            <img className='profile w-10 h-10 rounded-full ' src={profile} alt='profile' />
        </>
    )
}

export default Sidebar