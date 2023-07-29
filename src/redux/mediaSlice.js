import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  bannerMedia: [],
}

export const mediaSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
      storeBannerMedia: (state, action) => {
          state.bannerMedia = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { storeBannerMedia } = mediaSlice.actions

export default mediaSlice.reducer