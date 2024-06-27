import React from 'react'
import logo from '../assets/spotifylogo.png'
const Loader = () => {
  return (
    <div className='fixed bg-black w-[100%] h-[100vh] flex justify-center items-center z-10'>
        <img src={logo} alt='loader' className='w-40 h-40'/>
    </div>
  )
}

export default Loader