import { createSlice } from "@reduxjs/toolkit"
const initialState = {
  allMessages: []
}
export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages(prevState, action) {
      return action.payload
    }
  }
})

export const { setMessages } = messagesSlice.actions
export default messagesSlice.reducer
export const messages = messagesSlice.name
export const extractMessagesSlice = (global) => {
  return global[messages]
}