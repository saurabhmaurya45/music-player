import { createSlice } from "@reduxjs/toolkit";
import { getSongData } from "./SongDataService";

const songDataSlice = createSlice({
    name: "songs",
    initialState: {
        songData: [],
        currentActiveSong: null,
        isLoading: false,
        error: null
    },
    reducers: {
        setCurrentActiveSong: (state, action) => {
            state.currentActiveSong = action.payload
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getSongData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getSongData.fulfilled, (state, action) => {
                state.songData = action.payload
                state.currentActiveSong = action.payload[0]
                state.isLoading = false
                state.error = null
            })
            .addCase(getSongData.rejected, (state) => {
                state.isLoading = false
                state.error = "Failed to fetch data, try again"
            })
    }


})

export const { setCurrentActiveSong } = songDataSlice.actions

export default songDataSlice.reducer