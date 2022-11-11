import React from 'react';
import CardContent from '@mui/material/CardContent';
import { css } from "@emotion/css/macro";
import { TiArrowUpThick, TiArrowDownThick } from "react-icons/ti";

const Citycard = () => {

    const getAbs = (num) => {
        let result = Math.abs(num)
        return `${result}%`
    }


    const cardData = React.useMemo(
        () => [
            {
                amount: "22,500,000",
                title: "台北市｜當期房屋交易均價",
                growth: 11,
            },
            {
                amount: "17,500,000",
                title: "新北市｜當期房屋交易均價",
                growth: 21,
            },
            {
                amount: "13,280,000",
                title: "桃園市｜當期房屋交易均價",
                growth: -5,
            },
            {
                amount: "16,800,000",
                title: "台中市｜當期房屋交易均價",
                growth: 8,
            },
            {
                amount: "12,950,000",
                title: "台南市｜當期房屋交易均價",
                growth: 3,
            },
            {
                amount: "23,350,000",
                title: "高雄市｜當期房屋交易均價",
                growth: -10,
            },
        ],
        []
    );

    return (
        <section className={stylecitycard} id="stylecitycard">
            {cardData.map((item) => (
                <div sx={{ minWidth: 200 }} className="card">
                    <CardContent>
                        <h1 className='amount'>
                            {item.amount}
                            <span className={item.growth > 0 ? "up" : "down"}>
                                {item.growth > 0 ? <TiArrowUpThick /> : <TiArrowDownThick />}
                                {getAbs(item.growth)}
                            </span>
                        </h1>
                        <h3 className="title">
                            {item.title}
                        </h3>
                        <p className="title-secondary">
                            與前季比較
                        </p>
                    </CardContent>
                </div>
            ))}
        </section>
    )
}

export default Citycard

export const stylecitycard = css`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    
    .card{
        background-color: white;
        box-shadow:2px 2px 4px 0.3px #9f9f9f;
        border-radius:16px;
        width:90%;
        height:90%;
        margin:0.5rem auto;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;

        .MuiCardContent-root{
            padding: 8px 16px;

            .amount{
                font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                font-weight:300;
                font-size: 1.8rem;
                letter-spacing: 2px;
                margin:15px 0 10px 0;
                white-space: nowrap;
                span{
                    margin-left: 8px;
                    font-size: 16px;
                    letter-spacing: 0px;
                    &.up{
                        color:#3DCE76;
                    }
                    &.down{
                        color:#DD4B39;
                    }
                }
            }
            .title{
                white-space: nowrap;
                margin:0px;
                font-size: 1rem;
            }
            .title-secondary{
                white-space: nowrap;
                margin:5px 0;
                color:#BCBDBD;
            }
        }
    }
`;