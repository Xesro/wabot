import { configureStore } from '@reduxjs/toolkit';
import counterReducer, {counterSlice} from '../../features/counter/counterSlice';
import strategyReducer from './strategy-slice';
import logReducer from './log-slice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    strategy : strategyReducer,
    log:logReducer,
  },
});


