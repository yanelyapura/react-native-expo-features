import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email:"",
    idToken:""
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state,actions) => state = actions.payload,
        clearUser: (state) => state = initialState
    }
})

export const {setUser,clearUser} = authSlice.actions

export default authSlice.reducer