
import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
    name: 'search',
    initialState: {
      criteria: ''
    },
    reducers: {
      add_search: (state, action) => {
        return {
          criteria: action.payload
        }
      }    
    }
    
});

export const { add_search } = searchSlice.actions;

export const searchData = (state) => state.search;

export default searchSlice.reducer;