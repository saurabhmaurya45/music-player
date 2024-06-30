import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentActiveSong } from '../redux/Features/SongData/SongDataSlice'
import { formatDuration } from '../utils'

const SongListCard = ({song,showListOrPlayerHandler}) => {
  const dispatch = useDispatch()
  const currentActiveSong = useSelector(state=>state.songs.currentActiveSong)

  const currentActiveSongHandler = (song)=>{
    dispatch(setCurrentActiveSong(song))
    showListOrPlayerHandler()
  }

  return (
    <div className={'w-full h-20 px-4 rounded-lg flex items-center justify-between cursor-pointer '+(song.id === currentActiveSong?.id && 'bg-white/5')} onClick={()=>{currentActiveSongHandler(song)}}  >
        <div className='h-12 flex items-center gap-4'>
          <img src={"https://cms.samespace.com/assets/"+ song.cover} alt='' className='w-12 h-12 rounded-full' />
          <div className='flex flex-col'>
            <h3 className='text-lg font-normal text-white'>{song.name}</h3>
            <p className='text-white/50 text-sm font-normal'>{song.artist}</p>
          </div>
        </div>
        <p className='text-lg text-white/50'>{formatDuration(song.duration ?? 0 )}</p>
    </div>
  )
}

export default SongListCard
