import {createSlice} from '@reduxjs/toolkit';

const loadersSlice=createSlice({
    name:'loaders',
    initialState:{
        loading:false,
    },
    reducers:{
        setLoading(state,action){
            state.loading=action.payload;
        }
    }
})

export const {setLoading}=loadersSlice.actions;

export default loadersSlice.reducer