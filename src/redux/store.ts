import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import TodoSaga from "@/redux/todo/todoSaga.ts";

import { todoSlice } from "@/redux/todo/todoSlice.ts";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(TodoSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
