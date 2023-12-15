import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: '',
  name: '',
  lastname: '',
  email: "",
  img_url: ""

}
export const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    setReceiver(state, action) {
      const { id, name, email, img_url } = action.payload
      return {
        id,
        name,
        email,
        img_url
      }
    },
    clearReceiver(state, action) {
      return {
        id: ''
      }
    },
  },
})

export const { setReceiver, clearReceiver } = receiverSlice.actions
export const receiver = receiverSlice.name
export default receiverSlice.reducer
export const extractReceiverSlice = (global) => {
  return global[receiver]
}
