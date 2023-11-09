import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../tools/axiosInstance"
const initialState = {loggedin:false, user:null, jwt:null, loading:false}

//test
// const delai = (time) => {
//     return new Promise(resolve => setTimeout(resolve, time))
// }


export const login = createAsyncThunk('auth/login', 
  async({identifier, password}, thunkApi)=>{
    try{
      const response = await axios.post('api/auth/local', {identifier, password})
      return response
    }catch(error){
        console.log(error)
        return thunkApi.rejectWithValue(error)
    }
  }
)

export const userRegister = createAsyncThunk('auth/register', 
  async({username, email, password}, thunkApi)=>{
    try{
      const response = await axios.post('api/auth/local/register', {username, email, password})
      return response
    }catch(error){
        console.log(error)
        return thunkApi.rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        logout(state){
            state.loggedin = false
            state.user = null 
            state.jwt = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(userRegister.pending, (state, action)=>{
            state.loading = true
        })
        builder.addCase(userRegister.fulfilled, (state, action)=>{
            state.loading = false
            state.loggedin = true 
            console.log(state)
            state.user = action.payload.data.user 
            state.jwt = action.payload.data.jwt
        })
        builder.addCase(userRegister.rejected, (state, action)=>{
            state.loading = false
        })
        builder.addCase(login.pending, (state, action)=>{
            console.log('pending', action)
            state.loading = true
        })
        builder.addCase(login.fulfilled, (state, action)=>{
            console.log('fulfilled', action)
            state.loggedin = true
            state.user = action.payload.data.user 
            state.jwt = action.payload.data.jwt
            state.loading = false
        })
        builder.addCase(login.rejected, (state, action)=>{
            console.log('rejected', action)
            state.loading = false
        })
    }
})

export const authLogout = authSlice.actions.logout

export default authSlice.reducer