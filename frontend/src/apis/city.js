import axios from "axios";
import baseUrl from "../utils/getBaseURL";



const getKSPrice = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getKShousePrice`
    });
};

const getNTPrice = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getNThousePrice`
    });
};

const getTCPrice = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getTChousePrice`
    });
};

const getTNPrice = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getTNhousePrice`
    });
};

const getTPPrice = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getTPhousePrice`
    });
};

const getTYPrice = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getTYhousePrice`
    });
};



export { getKSPrice, getNTPrice, getTCPrice, getTNPrice, getTPPrice, getTYPrice };
