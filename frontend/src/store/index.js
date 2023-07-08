import {configureStore, createSlice} from "@reduxjs/toolkit";
 
const userSlice =createSlice({
    name:"user",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state) {
            state.isLoggedIn =true;
        },
        logout(state){
            localStorage.removeItem("userId")
            localStorage.removeItem("token")
            localStorage.removeItem("name")
            state.isLoggedIn =false;
        },
    }

}
)
const adminSlice =createSlice({
    name:"admin",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state) {
            state.isLoggedIn =true;
        },
        logout(state){
            localStorage.removeItem("adminId")
            localStorage.removeItem("admintoken")
            localStorage.removeItem("adminname")
            localStorage.removeItem("adminimage")
            state.isLoggedIn =false;
        },
    }

}
)
const ownerSlice =createSlice({
    name:"owner",
    initialState:{isLoggedIn:false},
    reducers:{
        login(state) {
            state.isLoggedIn =true;
        },
        logout(state){
            localStorage.removeItem("ownerId")
            localStorage.removeItem("ownertoken")
            localStorage.removeItem("ownername")
            localStorage.removeItem("ownerimage")
            state.isLoggedIn =false;
        },
    }

}
)
export const userActions = userSlice.actions;
export const adminActions = adminSlice.actions;
export const ownerActions = ownerSlice.actions;

export const store = configureStore({
    reducer:{
        user:userSlice.reducer,
        admin: adminSlice.reducer,
        owner: ownerSlice.reducer
    }
})