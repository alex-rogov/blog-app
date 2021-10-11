import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import blog from "../features/blog/blogSlice";

const createEnhancedStore = () => {
  const saga = createSagaMiddleware();

  const middlewares = [saga];
  const reducers = { blog };

  return {
    ...configureStore({
      middleware: middlewares,
      reducer: { ...reducers },
    }),
    runSaga: saga.run,
  };
};

const store = createEnhancedStore();

export default store;
export type RootState = ReturnType<typeof store.getState>;
