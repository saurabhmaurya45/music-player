import React from 'react'

const SongListTabs = ({ songTabs, songTabChangeHandler }) => {
    return (
        <div className='flex gap-10 pt-2 '>
            {
                songTabs.map((item) => {
                    return <>
                        <button className={'text-2xl font-bold ' + (item.status ? "text-white" : "text-white/50")} key={item.id + item.name} onClick={() => { songTabChangeHandler(item.id) }}>{item.name}</button>
                    </>
                })
            }
        </div>
    )
}

export default SongListTabs