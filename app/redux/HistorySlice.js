import { createSlice } from "@reduxjs/toolkit";

const HistorySlice = createSlice({
    name: 'History',
    initialState: [],
    reducers: {
        addPhoneNum(state, action) {
            // state.push(action.payload)
            state.splice(0, 0, action.payload);
        },
        deletePhoneNum(state, action) {
            return (state = state.filter(item => item.id !== action.payload.id))
        },
        deleteAllPhoneNums(state, action) {
            return state = []
        },
        sortByOld(state, action) {
            return state = (state.sort((a, b) => a.createdAt - b.createdAt))
        },
        sortByRecent(state, action) {
            return state = (state.sort((a, b) => b.createdAt - a.createdAt))
        },
    }
})

export const { addPhoneNum, deletePhoneNum, deleteAllPhoneNums, sortByOld, sortByRecent } = HistorySlice.actions;
export default HistorySlice.reducer;