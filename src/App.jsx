import React, { useEffect, useState } from 'react';
import { hex2rgb } from './utils';
import Sidebar from './components/Sidebar';
import SongListContainer from './components/SongListContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getSongData } from './redux/Features/SongData/SongDataService';
import PlayerContainer from './components/PlayerContainer';
import { FaAngleDown } from "react-icons/fa6";
import Loader from './components/Loader';

const App = () => {
  const dispatch = useDispatch()
  const { currentActiveSong, isLoading } = useSelector((state) => state.songs);
  const bgColor = currentActiveSong ? hex2rgb(currentActiveSong?.accent || '#fff') : ""
  const [showListOrPlayer, setShowListOrPlayer] = useState(true)

  const showListOrPlayerHandler = () => {
    setShowListOrPlayer(!showListOrPlayer)
  }

  useEffect(() => {
    dispatch(getSongData());
  }, [])

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && <div className='app pt-2 lg:px-8 lg:pt-8  text-white grid grid-cols-1 lg:grid-cols-2 h-auto' style={{ background: `linear-gradient(90deg, ${bgColor} -50%, rgb(0, 0, 0) 100%)` }}>
        <div className={'grid-col-1 lg:flex flex-col lg:flex-row  ' + (showListOrPlayer ? "flex" : "hidden ")}>
          <div className='sidebar sticky mb-2 p-2 top-2 w-full h-14 flex justify-between lg:p-0 lg:w-[20%] lg:h-[90vh] lg:flex-col lg:top-10 '>
            <Sidebar />
          </div>
          <div className='song-list w-full lg:w-[80%] flex justify-center'>
            <SongListContainer showListOrPlayerHandler={showListOrPlayerHandler} />
          </div>
        </div>
        <div className={(showListOrPlayer ? "hidden" : "block") + ' grid-col-1 lg:flex justify-center items-center'}>
          <button className=' h-16 w-full px-4 flex items-center text-3xl lg:hidden' onClick={showListOrPlayerHandler}><FaAngleDown /></button>
          <PlayerContainer />
        </div>
      </div>}
    </>
  );
};

export default App;
