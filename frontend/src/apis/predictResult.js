import axios from "axios";
import baseUrl from "../utils/getBaseURL";



const getAPI = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getAPI`
    });
};

const getUsers = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getUsers`
    });
};

const predictResult = (_data) => {
    return axios({
        method: "post",
        url: `${baseUrl}/getHousePrice`,
        data: _data,
    });
};

const usersPredict = (_data) => {
    return axios({
        method: "post",
        url: `${baseUrl}/usersPredict`,
        data: _data,
    });
};


export { predictResult, getAPI, usersPredict, getUsers };
