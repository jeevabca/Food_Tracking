import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  currentOrder: null,
  status: 'idle', // idle | placed | preparing | on_the_way | delivered
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      state.currentOrder = action.payload;
      state.status = 'placed';
    },
    updateOrderStatus: (state, action) => {
      state.status = action.payload;
    },
    clearOrder: state => {
      state.currentOrder = null;
      state.status = 'idle';
    },
  },
});

export const {placeOrder, updateOrderStatus, clearOrder} = orderSlice.actions;
export default orderSlice.reducer;
