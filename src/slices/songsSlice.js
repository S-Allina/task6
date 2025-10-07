import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  songs: [],
  isLoading: false,
  error: null,
  selectedSongs: [],
};

export const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedSongs: (state, action) => {
      state.selectedSongs = action.payload;
    },
    toggleSongSelection: (state, action) => {
      const songId = action.payload;
      const selectedIndex = state.selectedSongs.indexOf(songId);

      if (selectedIndex === -1) {
        state.selectedSongs.push(songId);
      } else {
        state.selectedSongs.splice(selectedIndex, 1);
      }
    },
  },
});

export const {
  setSongs,
  setLoading,
  setError,
  setSelectedSongs,
  toggleSongSelection,
  selectAllSongs,
} = songsSlice.actions;

export default songsSlice.reducer;
