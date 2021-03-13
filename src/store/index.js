import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./reducers/modalSlice";
import orderReducer from "./reducers/orderSlice";

export default configureStore({
  reducer: {
    modal: modalReducer,
    order: orderReducer,
  },
});
