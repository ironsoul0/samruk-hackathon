import { createSlice } from "@reduxjs/toolkit";

import mockOrders from "../../utils/data.json";

export const FETCH_LIMIT = 5;

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: null,
    currentOffset: 0,
    currentSize: 0,
    activeSearch: false,
    searchOrders: null,
  },
  reducers: {
    addOrder: (state, action) => {
      const { id, name, status, operator } = action.payload;
      state.orders = [{ id, name, status, operator }, ...state.orders];
      state.currentSize++;
      state.currentOffset = 0;
    },
    editOrder: (state, action) => {
      const { pickedId, data } = action.payload;
      const target = state.orders.find((order) => order.id === pickedId);
      target.id = data.id;
      target.name = data.name;
      target.status = data.status;
      target.operator = data.operator;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      if (state.orders) state.currentSize = state.orders.length;
    },
    setSearchOrders: (state, action) => {
      state.searchOrders = action.payload;
    },
    nextOrders: (state) => {
      if (state.currentOffset + FETCH_LIMIT < state.currentSize) {
        state.currentOffset += FETCH_LIMIT;
      }
    },
    prevOrders: (state) => {
      if (state.currentOffset - FETCH_LIMIT >= 0) {
        state.currentOffset -= FETCH_LIMIT;
      }
    },
    setActiveSearch: (state, action) => {
      state.activeSearch = action.payload;
      if (!action.payload) state.searchOrders = null;
    },
  },
});

export const {
  addOrder,
  editOrder,
  setOrders,
  nextOrders,
  prevOrders,
  setActiveSearch,
  setSearchOrders,
} = orderSlice.actions;

export const initFetch = () => (dispatch) => {
  setTimeout(() => {
    dispatch(setOrders(mockOrders));
  }, 500);
};

export const nextOrdersAsync = () => (dispatch, getState) => {
  dispatch(nextOrders());
  const { order } = getState();
  const oldOrders = [...order.orders];

  dispatch(setOrders(null));

  setTimeout(() => {
    dispatch(setOrders(oldOrders));
  }, 500);
};

export const prevOrdersAsync = () => (dispatch, getState) => {
  dispatch(prevOrders());
  const { order } = getState();
  const oldOrders = [...order.orders];

  dispatch(setOrders(null));

  setTimeout(() => {
    dispatch(setOrders(oldOrders));
  }, 500);
};

export const performSearchAsync = (query) => (dispatch, getState) => {
  const { order } = getState();
  const { orders } = order;

  dispatch(setActiveSearch(true));
  dispatch(setSearchOrders(null));

  const mockResult = orders.filter(
    (current) => current.name.includes(query) || current.id === query
  );

  setTimeout(() => {
    dispatch(setSearchOrders(mockResult));
  }, 500);
};

export default orderSlice.reducer;
