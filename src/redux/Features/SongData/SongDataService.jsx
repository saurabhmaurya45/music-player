import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSongData = createAsyncThunk('get/songData', async () => {
    try {
        const res = await fetch("https://cms.samespace.com/items/songs")
        const jsonRes = await res.json()
        console.log(jsonRes.data)
        const processedData = await Promise.all(jsonRes.data.map(async (item) => {
            const audio = new Audio(item.url);

            return new Promise((resolve) => {
                audio.addEventListener('loadedmetadata', () => {
                    const duration = audio.duration;
                    resolve({
                        ...item,
                        duration,
                    });
                });
            });
        }));
        // console.log(processedData)
        return processedData;
    } catch (error) {
        return error;
    }
})