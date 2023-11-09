import {createSlice} from '@reduxjs/toolkit'


const counterSlice = createSlice({
    name:"counter",
    initialState:{initialValue:5},
    reducers:{
        incrementByOne(state){
            state.initialValue++
        },
        increment(state, action){
            state.initialValue += action.payload
        }
    }
})


export const {increment, incrementByOne} = counterSlice.actions

export default counterSlice.reducer