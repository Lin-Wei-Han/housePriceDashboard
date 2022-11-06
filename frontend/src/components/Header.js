import React from 'react';
import "../dist/css/header.scss";

const Header = () => {

    const [year, setYear] = React.useState("")
    const [date, setDate] = React.useState("")
    const [month, setMonth] = React.useState("")

    React.useEffect(() => {

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const getDate = () => {
            const getYear = new Date().getFullYear();
            const getDate = new Date().getDate();
            const getMonth = new Date().getMonth();
            setYear(getYear)
            setDate(getDate)
            setMonth(monthNames[getMonth])
        }
        getDate()
    }, [])

    return (
        <section className='header'>
            <h1>六都房價預測｜趨勢分析</h1>
            <p>{date} {month} {year}</p>
        </section>
    )
}

export default Header
