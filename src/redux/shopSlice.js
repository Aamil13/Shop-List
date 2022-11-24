import {createSlice} from "@reduxjs/toolkit"




const shopSlice = createSlice({
    name: "Shop",
    initialState:[],
    reducers:{

        add(state, action) {
             state.push(action.payload)
        },
        remove(state,action){
            return state.filter((item)=> item.id !== action.payload);
        },
        edit(state, action){
            let idx = state.findIndex((x)=>x.id === action.payload.id)
            state[idx] = action.payload
        },
    },
})


export const {add,remove,edit} = shopSlice.actions
export default shopSlice.reducer