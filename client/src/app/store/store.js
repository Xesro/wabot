import { configureStore } from '@reduxjs/toolkit';
import counterReducer, {counterSlice} from '../../features/counter/counterSlice';
import strategyReducer from './strategy-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    strategy : strategyReducer,
  },
});


