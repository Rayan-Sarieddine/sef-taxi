import { configureStore } from "@reduxjs/toolkit"
import userSlice, { user } from "./user/userSlice"
import messagesSlice, { messages } from "./messages/messagesSlice"
export const store = configureStore({
  reducer: {
    [user]: userSlice,
    [messages]: messagesSlice
  },
})
