import { createSlice } from "@reduxjs/toolkit";

 const uiSlice = createSlice({
    name: "ui",
    initialState:{
        cartIsVisible: false, 
        notification : null
    }, 
    reducers:{
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible
        }, 
        showNotification(state, action){
            state.notification = {
                title: action.payload.title,
                message: action.payload.message,
                status: action.payload.status
            }
        },
    }
})

export const UiSliceActions = uiSlice.actions

export default uiSlice 
