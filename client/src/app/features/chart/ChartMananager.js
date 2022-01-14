import Highcharts from 'highcharts';
import React from 'react';
import HighchartsReact from 'highcharts-react-official'
import Exporting from 'highcharts/modules/exporting';
import HighStock from 'highcharts/highstock';
import 'highcharts/indicators/indicators-all'
import './ChartManager.css';
import Dark from 'highcharts/themes/high-contrast-dark';
Exporting(HighStock);
Dark(HighStock);



const builderCandleStickChart = (currency, strategy) => {
    return {
        rangeSelector: {
            selected: 1
        },
        title: {
            text: `${currency} Chart`
        },
        subtitle: {
            text: `${strategy} choosen`
        },
        plotOptions: {
            series: {
                showInNaviguator: true,
            }
        },
        series: [],



    }
}
const options = {
    rangeSelector: {
        selected: 1
    },
    title: {
        text: 'CandleStick Chart'
    },
    subtitle: {
        text: 'eefe'
    },
    plotOptions: {
        series: {
            showInNaviguator: true,
        }
    },
    series: [
        {
            type: 'candlestick',
            name: 'AAPL Stock Price',
            data: [[1577716200000, 72.36, 73.17, 71.31, 72.88],
            [1577802600000, 72.48, 73.42, 72.38, 73.41],
            ],
            dataGrouping: {
                units: [
                    [
                        'week', // unit name
                        [1] // allowed multiples
                    ],
                    [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]
                ]
            }
        },
        {
            name: 'aap',
            data: [{ x: 1577716200000, y: 75 }, { y: 72, x: 1577802600000 },]
        }
    ]
}





// setup la chart candles bien  
// setup les series sur le chandle char 
// creer un enlever ajouter la visibilité 
// 




function ChartManager() {
    function changeVisibilitySerie(serie) {

    }

    return (<div className='chart'>
        <HighchartsReact
            highcharts={HighStock}
            constructorType={'stockChart'}
            options={options}
            containerProps={{ className: 'chart-rendering' }}
        />
    </div>)
}
export default ChartManager;