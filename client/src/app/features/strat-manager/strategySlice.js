import { createSlice } from "@reduxjs/toolkit";

const strategySlice = createSlice({
    name: 'strategies',
    initialState: [
        {
            id: 0, 
            name: "Strat 1",
            launched: false,
            currency: 'ethusdt',
            parameter:{}
        }
    ],
    reducers: {
        // add a new strategy, creating a new id by Date.
        // add it to the initial state
        addStrategy: (state, action) => {
            const strategy = {
                id: Date.now(),
                launched: false,
            }
            state.push({ ...strategy, ...action.payload });
        },
    }

});
export const { addStrategy } = strategySlice.actions;
export default strategySlice.reducer;