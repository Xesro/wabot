import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';


/**
 * All information needed to load the strategy vue,
 * @param currencyInfo used for all supported currency
 * @param strategiesInfo used for all supported strategies
 */
const initialState = {
    /*Used for strategy creation*/
    currenciesInfo: [{name: "Ethereum", value: 'eth'}],
    strategiesInfo: [{name: "1 ere ", value: 'e'}],
    registered: [{currency: "ethereum", money: '1000', name: "1er strategy"}, {
        currency: "bitcoin",
        money: '1000',
        name: "2er strategy"
    }],
}

/**
 * All selector used inside the strategy manager
 */
const selectCurrenciesInfo = (state) => state.strategy.currenciesInfo;
const selectStrategiesInfo = (state) => state.strategy.strategiesInfo;
const selectRegisteredStrategies = (state) => state.strategy.registered;

export {selectCurrenciesInfo, selectStrategiesInfo, selectRegisteredStrategies};

export const strategySlice = createSlice({
    initialState,
    name: "strategy",
    reducers: {
        updateStrategy: (state, action) => {

        },


        findStrategyParameter: (state, action) => {

        }
    }
})

export const {updateStrategy, findStrategyParameter} = strategySlice.actions;


export default strategySlice.reducer;