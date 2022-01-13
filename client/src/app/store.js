import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import strategyReducer from './features/strat-manager/strategySlice'
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    strategies:strategyReducer,
  },
});
