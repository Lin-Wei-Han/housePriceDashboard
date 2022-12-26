import React from 'react';
import Chart from 'react-apexcharts'
import * as predictResultAPIs from "../apis/predictResult";

const ApexChart = () => {

    const [bathroom, setBathroom] = React.useState([])
    const [bathroomAmount, setBathroomAmount] = React.useState([])

    const [room, setRoom] = React.useState([])
    const [roomAmount, setRoomAmount] = React.useState([])

    const [livingroom, setlivingroom] = React.useState([])
    const [livingroomAmount, setlivingroomAmount] = React.useState([])

    const [building, setBuilding] = React.useState([])
    const [buildingArea, setbuildingArea] = React.useState([])

    const counterAmount = (array) => {
        let a = []
        let b = []
        let prev

        for (let element of array) {
            if (element !== prev) {
                a.push(element);
                b.push(1);
            }
            else ++b[b.length - 1];
            prev = element;
        }
        setBathroom(a)
        setBathroomAmount(b)
    }

    const counterRoomAmount = (array) => {
        let a = []
        let b = []
        let prev

        for (let element of array) {
            if (element !== prev) {
                a.push(element);
                b.push(1);
            }
            else ++b[b.length - 1];
            prev = element;
        }
        setRoom(a)
        setRoomAmount(b)
    }

    const counterlivingroomAmount = (array) => {
        let a = []
        let b = []
        let prev

        for (let element of array) {
            if (element !== prev) {
                a.push(element);
                b.push(1);
            }
            else ++b[b.length - 1];
            prev = element;
        }
        setlivingroom(a)
        setlivingroomAmount(b)
    }

    const counterbuildingArea = (array) => {
        let a = []
        let b = []
        let prev

        for (let element of array) {
            if (element !== prev) {
                a.push(element);
                b.push(1);
            }
            else ++b[b.length - 1];
            prev = element;
        }
        setBuilding(a)
        setbuildingArea(b)
    }

    const chartData = {
        series: bathroomAmount,
        options: {
            chart: {
                height: 350,
                type: 'pie'
            },
            title: {
                text: '衛浴數'
            },
            labels: bathroom,
            responsive: [{
                breakpoint: 240,
                options: {
                    chart: {
                        width: 100
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };

    const roomChartData = {
        series: roomAmount,
        options: {
            chart: {
                height: 350,
                type: 'pie'
            },
            title: {
                text: '房間數'
            },
            labels: room,
            responsive: [{
                breakpoint: 240,
                options: {
                    chart: {
                        width: 100
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };

    const livingroomChartData = {
        series: livingroomAmount,
        options: {
            chart: {
                height: 350,
                type: 'pie'
            },
            title: {
                text: '廳數'
            },
            labels: livingroom,
            responsive: [{
                breakpoint: 240,
                options: {
                    chart: {
                        width: 100
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        },


    };


    const buildingAreaChartData = {
        series: [{
            data: buildingArea
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar'
            },
            title: {
                text: '坪數（含公設）'
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: building,
            }
        },


    };


    React.useEffect(() => {
        predictResultAPIs.getUsers().then((res) => {
            console.log(res);
            counterAmount(res["data"][1]["bathroomAmount"].sort())
            counterRoomAmount(res["data"][1]["roomAmount"].sort())
            counterlivingroomAmount(res["data"][1]["livingroomAmount"].sort())
            counterbuildingArea(res["data"][1]["buildingArea"].sort())
        })
        //counterAmount(res["data"][1]["bathroomAmount"])
    }, [])


    return (
        <>
            <div className='pie' id="chart">
                <Chart options={chartData.options} series={chartData.series} type="pie" height={300} width='120%' />
                <Chart options={roomChartData.options} series={roomChartData.series} type="pie" height={300} width='120%' />
                <Chart options={livingroomChartData.options} series={livingroomChartData.series} type="pie" height={300} width='120%' />
            </div>
            <div className='bar'>
                <Chart options={buildingAreaChartData.options} series={buildingAreaChartData.series} type="bar" height={300} width='95%' />
            </div>
        </>
    );
}

export default ApexChart;