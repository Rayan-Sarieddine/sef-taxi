import { configureStore } from "@reduxjs/toolkit"
import userSlice, { user } from "./user/userSlice"
import messagesSlice, { messages } from "./messages/messagesSlice"
import receiverSlice, { receiver } from "./receiver/receiverSlice"
export const store = configureStore({
    reducer: {
        [user]: userSlice,
        [messages]: messagesSlice,
        [receiver]: receiverSlice
    },
})
