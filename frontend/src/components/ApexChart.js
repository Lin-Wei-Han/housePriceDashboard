import React from 'react';
import Chart from 'react-apexcharts'
import * as housepriceAPIs from "../apis/city";

const ApexChart = () => {

    const [time, setTime] = React.useState([])
    const [ksPrice, setKsPrice] = React.useState([])
    const [ntPrice, setNTPrice] = React.useState([])
    const [tcPrice, setTcPrice] = React.useState([])
    const [tnPrice, setTnPrice] = React.useState([])
    const [tpPrice, setTpPrice] = React.useState([])
    const [tyPrice, setTyPrice] = React.useState([])

    const chartData = {
        series: [{
            name: '高雄市',
            data: ksPrice
        }, {
            name: '新北市',
            data: ntPrice
        }, {
            name: '台中市',
            data: tcPrice
        }, {
            name: '台南市',
            data: tnPrice
        }, {
            name: '台北市',
            data: tpPrice
        }, {
            name: '桃園市',
            data: tyPrice
        }],
        options: {
            chart: {
                height: 350,
                type: 'area'
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'smooth'
            },
            xaxis: {
                type: 'datetime',
                categories: time
            },
            tooltip: {
                x: {
                    format: 'yyyy/MM/dd'
                },
            },
        },
    };

    React.useEffect(() => {
        housepriceAPIs.getKSPrice().then((res) => {
            setTime(res["data"]["time"])
            setKsPrice(res["data"]["price"])
        })
        housepriceAPIs.getNTPrice().then((res) => {
            setNTPrice(res["data"]["price"])
        })
        housepriceAPIs.getTCPrice().then((res) => {
            setTcPrice(res["data"]["price"])
        })
        housepriceAPIs.getTNPrice().then((res) => {
            setTnPrice(res["data"]["price"])
        })
        housepriceAPIs.getTPPrice().then((res) => {
            setTpPrice(res["data"]["price"])
        })
        housepriceAPIs.getTYPrice().then((res) => {
            setTyPrice(res["data"]["price"])
        })

    }, [])


    return (
        <div id="chart">
            <Chart options={chartData.options} series={chartData.series} type="area" height={350} width='95%' />
        </div>
    );
}

export default ApexChart;



