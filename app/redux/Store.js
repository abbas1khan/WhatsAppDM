import { configureStore, combineReducers } from "@reduxjs/toolkit";
import HistorySlice from "./HistorySlice";
import persistReducer from "redux-persist/es/persistReducer";
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

let rootReducer = combineReducers({
    historyData: HistorySlice,
})

let persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }),
})