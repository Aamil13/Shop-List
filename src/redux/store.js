import {configureStore} from "@reduxjs/toolkit"
import ShopReducer from "./shopSlice"


export const store = configureStore({
    reducer:{
        Shop: ShopReducer
    }
})