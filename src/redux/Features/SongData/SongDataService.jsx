import { createAsyncThunk } from "@reduxjs/toolkit";

export const getSongData = createAsyncThunk('get/songData', async () => {
    try {
        const res = await fetch("https://cms.samespace.com/items/songs")
        const jsonRes = await res.json()
        return jsonRes.data;
    } catch (error) {
        return error;
    }
})