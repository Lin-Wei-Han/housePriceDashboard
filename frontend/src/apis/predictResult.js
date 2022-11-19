import axios from "axios";
import baseUrl from "../utils/getBaseURL";



const getAPI = () => {
    return axios({
        method: "get",
        url: `${baseUrl}/getAPI`
    });
};

const predictResult = (_data) => {
    return axios({
        method: "post",
        url: `${baseUrl}/getHousePrice`,
        data: _data,
    });
};

export { predictResult, getAPI };
