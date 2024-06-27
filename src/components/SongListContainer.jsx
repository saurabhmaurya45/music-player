import React, { useState } from 'react'
import SongListTabs from './SongListTabs'
import { BiSearch } from 'react-icons/bi'
import SongListCard from './SongListCard'
import { useSelector } from 'react-redux'

const songListTabs = [
    {
        id: 1,
        name: "For You",
        status: true
    },
    {
        id: 2,
        name: "Top Tracks",
        status: false
    }
]

const SongListContainer = ({ showListOrPlayerHandler }) => {
    const { songData, isLoading, error } = useSelector(state => state.songs)
    const [songTabs, setSongTabs] = useState(songListTabs)
    const [searchQuery, setSearchQuery] = useState('')

    const songTabChangeHandler = (id) => {
        setSearchQuery('')
        const updatedTabs = songListTabs.map((item) => {
            if (item.id === id) {
                return { ...item, status: true }
            }
            return { ...item, status: false }
        })
        setSongTabs(updatedTabs)
    }
    const searchQueryHandler = (e) => {
        setSearchQuery(e.target.value)
    }
    let filteredData = [];

    const currentActiveTab = songTabs?.find(item => item.status == true)?.id
    filteredData = currentActiveTab === 2 ? songData.filter(item => item.top_track) : songData

    if (searchQuery) {
        filteredData = filteredData?.filter(item => (item.name.toLowerCase()).includes(searchQuery.toLowerCase()) || (item.artist.toLowerCase()).includes(searchQuery))
    }


    return (
        <>
            {isLoading && <h1>Loading</h1>}
            {!isLoading && <div className='song-list-container relative w-full lg:w-[432px] px-4'>
                <div className='header sticky top-4 lg:top-10 '>
                    <SongListTabs songTabs={songTabs} songTabChangeHandler={songTabChangeHandler} />
                    <div className='search-bar relative flex items-center my-8'>
                        <input type='search' className='w-full p-2 pl-4 rounded-lg text-lg text-white/50 bg-white/5 outline-none' placeholder='Search Song, Artist' value={searchQuery} onChange={searchQueryHandler} />
                        <span className='absolute right-4 z-10 text-white/50 text-2xl'><BiSearch /></span>
                    </div>
                </div>
                <div className='song-list sticky top-48 h-[75vh] overflow-scroll no-scrollbar pb-4'>
                    {
                        filteredData?.map(song => <SongListCard key={song.id} song={song} showListOrPlayerHandler={showListOrPlayerHandler} />)
                    }
                </div>
            </div>}
        </>
    )
}

export default SongListContainer