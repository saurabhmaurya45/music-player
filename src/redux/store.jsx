import { configureStore } from "@reduxjs/toolkit";
import SongDataSlice from "./Features/SongData/SongDataSlice";

const store = configureStore({
    reducer:{
        songs: SongDataSlice
    }
})

export default store