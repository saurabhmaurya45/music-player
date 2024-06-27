import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentActiveSong } from '../redux/Features/SongData/SongDataSlice';
import { BsThreeDots } from "react-icons/bs";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled, TbPlayerPlayFilled } from "react-icons/tb";
import { HiMiniSpeakerWave } from "react-icons/hi2";
import { FaPause } from "react-icons/fa6";
import { IoVolumeMute } from "react-icons/io5";


const PlayerContainer = () => {
    const audioRef = useRef(null);
    const [progress, setProgress] = useState(0);
    const dispatch = useDispatch()
    const { songData, currentActiveSong } = useSelector(state => state.songs)
    const [isPlaying, setIsPlaying] = useState(true)
    const [isMute, setIsMute] = useState(false);
    const currentIndex = songData.findIndex((item) => currentActiveSong.id === item.id)

    const prevHandler = () => {
        const previousIndex = (currentIndex - 1 + songData.length) % songData.length;
        dispatch(setCurrentActiveSong(songData[previousIndex]))
    }
    const nextHandler = () => {
        const nextIndex = (currentIndex + 1) % songData.length;
        dispatch(setCurrentActiveSong(songData[nextIndex]))
    }

    const handleTimeUpdate = () => {
        const currentTime = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        setProgress((currentTime / duration) * 100);
    };

    const handleSeek = (e) => {
        const seekTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = seekTime;
    };

    const playHandler = () => {
        if (isPlaying) {
            audioRef.current.pause()
        }
        else {
            audioRef.current.play()
        }
        setIsPlaying(!isPlaying)
    }


    const muteHandler = () => {
        if (isMute) {
            audioRef.current.volume = 1;
        }
        else {
            audioRef.current.volume = 0;
        }
        setIsMute(!isMute)
    }

    useEffect(() => {
        if (audioRef?.current) {
            setIsPlaying(!audioRef.current.paused)
        }
    }, [audioRef?.current?.paused])

    return (
        <div className='w-full p-2 lg:w-[480px] h-auto flex flex-col gap-14 lg:gap-6 py-4 lg:py-16 overflow-scroll player-wrapper'>
            <div className='song-info'>
                <h1 className='text-[32px] font-bold'>{currentActiveSong?.name}</h1>
                <p className='text-base font-normal text-white/50'>{currentActiveSong?.artist}</p>
            </div>
            <div className='cover-image flex flex-col gap-6'>
                <img className='w-full h-[300px] object-cover lg:w-[480px] lg:h-[480px] rounded-lg' src={"https://cms.samespace.com/assets/" + currentActiveSong?.cover} alt={currentActiveSong?.id ?? ""} />
                <div className='seek'>
                    <audio
                        autoPlay
                        ref={audioRef}
                        src={currentActiveSong?.url}
                        onTimeUpdate={handleTimeUpdate}
                    ></audio>
                    <input
                        type="range"
                        className="range-input w-full h-2 rounded-lg appearance-none cursor-pointer"
                        value={progress}
                        onChange={handleSeek}
                        max="100"
                        style={{backgroundImage:`linear-gradient(to right, white ${progress}%, rgba(255,255,255,0.1) ${progress}%)`}}
                    />
                </div>
            </div>
            <div className='controls w-full h-12 flex items-center justify-between'>
                <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-3xl'><BsThreeDots /></div>
                <div className='player flex items-center gap-8'>
                    <div className='w-8 h-8 rounded-full flex items-center justify-center text-3xl text-white/60' onClick={prevHandler}><TbPlayerTrackPrevFilled /></div>
                    {!isPlaying ? <div className='w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-3xl' onClick={playHandler}><TbPlayerPlayFilled /></div>
                        : <div className='w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-3xl' onClick={playHandler}><FaPause /></div>}
                    <div className='w-8 h-8 rounded-full flex items-center justify-center text-3xl text-white/60' onClick={nextHandler}><TbPlayerTrackNextFilled /></div>
                </div>
                {!isMute ? <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-3xl' onClick={muteHandler}><HiMiniSpeakerWave /></div>
                    : <div className='w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-3xl' onClick={muteHandler}><IoVolumeMute /></div>}
            </div>
        </div>
    )
}

export default PlayerContainer